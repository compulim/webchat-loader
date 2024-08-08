import { createParser } from 'eventsource-parser';
import { Observable, observableValues } from 'iter-fest';
import onErrorResumeNext from 'on-error-resume-next';
import { array, looseObject, object, optional, parse, string, type InferOutput } from 'valibot';
import tryDecodeJWT from './tryDecodeJWT';

type Activity = InferOutput<typeof activitySchema>;

const activitySchema = looseObject({
  from: optional(object({ id: optional(string()), role: optional(string()) }))
});

const entrySchema = object({
  _webSocketMessages: optional(array(object({ data: string() }))),
  request: optional(
    object({
      headers: array(object({ name: string(), value: string() })),
      method: string(),
      postData: optional(object({ text: string() })),
      queryString: array(object({ name: string(), value: string() })),
      url: string()
    })
  ),
  response: optional(
    object({
      content: optional(object({ mimeType: string(), text: optional(string()) })),
      headers: array(object({ name: string(), value: string() }))
    })
  )
});

const harSchema = object({
  log: object({ entries: array(entrySchema) })
});

function parseActivityEventStream(eventStream: string): AsyncIterableIterator<Activity> {
  return observableValues(
    new Observable(observer => {
      const parser = createParser(event => {
        if (event.type === 'event') {
          switch (event.event) {
            case 'activity':
              observer.next(parse(activitySchema, JSON.parse(event.data)));
              break;

            case 'end':
              observer.complete();
              break;

            default:
              break;
          }
        }
      });

      parser.feed(eventStream);
    })
  );
}

async function* parseDirectToEngineHARFile(text: string): AsyncIterableIterator<Activity> {
  try {
    const {
      log: { entries }
    } = parse(harSchema, JSON.parse(text));

    for (const entry of entries || []) {
      if (
        entry.request?.method === 'POST' &&
        (/^\/environments\/[0-9a-f\-]+\/bots\/[0-9a-f\-]+\/test\/conversations/iu.test(
          new URL(entry.request.url).pathname
        ) ||
          entry.request.headers.find(({ name }) => name === 'x-ms-chat-adapter'))
      ) {
        const requestPostDataText = entry.request?.postData?.text;

        if (requestPostDataText) {
          const activity = parse(
            object({ activity: optional(activitySchema) }),
            JSON.parse(requestPostDataText)
          ).activity;

          activity && (yield activity);
        }

        if (entry.response?.content?.text) {
          const responseContentText = entry.response.content.text;

          if (entry.response.content.mimeType === 'application/json') {
            yield* parse(object({ activities: array(activitySchema) }), JSON.parse(responseContentText)).activities;
          } else if (entry.response.content.mimeType === 'text/event-stream') {
            yield* parseActivityEventStream(responseContentText);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function* parseChatHistoryFromHARFile(text: string): AsyncIterableIterator<Activity> {
  try {
    yield* parseDirectToEngineHARFile(text);

    const {
      log: { entries }
    } = parse(harSchema, JSON.parse(text));

    for (const entry of entries || []) {
      const url = onErrorResumeNext(() => new URL(entry.request?.url || ''));

      if (url.protocol === 'wss:' && url.pathname.endsWith('/stream')) {
        const token = entry.request?.queryString.find((param: { name: string }) => param?.name === 't')?.value;
        const { bot: botId, user: userId } = tryDecodeJWT<{ bot: string; user: string }>(token || '') || {};

        for (const { data } of entry._webSocketMessages || []) {
          for (const activity of parse(object({ activities: array(activitySchema) }), JSON.parse(data)).activities) {
            yield {
              ...activity,
              from: {
                ...activity.from,
                role: activity.from?.id === botId ? 'bot' : activity.from?.id === userId ? 'user' : activity.from?.role
              }
            };
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
