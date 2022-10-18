import updateIn from 'simple-update-in';

export default function parseChatHistoryFromHARFile(text) {
  try {
    const { log } = JSON.parse(text) || {};

    const entry = log?.entries?.findLast(entry => {
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

    const token = entry.request.queryString.find(param => param?.name === 't')?.value;
    const { bot: botId, user: userId } = tryDecodeJWT(token) || {};

    const activities = entry._webSocketMessages?.reduce((activities, { data }) => {
      try {
        activities.push(...JSON.parse(data)?.activities?.filter?.(Boolean));
      } catch (error) {}

      return activities;
    }, []);

    return updateIn(activities, [() => true, 'from'], from => {
      const id = from?.id;
      const isBot = id === botId;
      const isUser = id === userId;

      if (isBot) {
        return { ...from, role: 'bot' };
      } else if (isUser) {
        return { ...from, role: 'user' };
      }

      return from;
    });
  } catch (error) {}
}
