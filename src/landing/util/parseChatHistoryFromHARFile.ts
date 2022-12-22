import updateIn from 'simple-update-in';

import tryDecodeJWT from './tryDecodeJWT';

type Activity = {
  from?: { id?: string; role?: string };
};

type Entry = {
  _webSocketMessages?: readonly { data: string }[];
  request?: {
    queryString: readonly { name: string; value: string }[];
    url: string;
  };
};

export default function parseChatHistoryFromHARFile(text: string): readonly Activity[] | undefined {
  try {
    const { log }: Readonly<{ log?: { entries?: readonly Entry[] } }> = Object.freeze(JSON.parse(text) || {});

    const entry: Entry | undefined = log?.entries?.findLast(entry => {
      const urlString = entry.request?.url;

      if (!urlString) {
        return;
      }

      try {
        const url = new URL(urlString);

        return url.protocol === 'wss:' && url.pathname.endsWith('/stream');
      } catch (error) {
        return;
      }
    });

    if (!entry?._webSocketMessages?.length) {
      return;
    }

    const token = entry.request?.queryString.find((param: { name: string }) => param?.name === 't')?.value;
    const { bot: botId, user: userId } = tryDecodeJWT<{ bot: string; user: string }>(token || '') || {};

    const activities: Activity[] = entry._webSocketMessages?.reduce((activities, { data }) => {
      try {
        activities.push(...JSON.parse(data)?.activities?.filter?.(Boolean));
      } catch (error) {}

      return activities;
    }, [] as Activity[]);

    return Object.freeze(
      updateIn<Activity[], Activity['from']>(activities, [() => true, 'from'], from => {
        const id = from?.id;
        const isBot = id === botId;
        const isUser = id === userId;

        if (isBot) {
          return { ...from, role: 'bot' };
        } else if (isUser) {
          return { ...from, role: 'user' };
        }

        return from;
      })
    );
  } catch (error) {}
}
