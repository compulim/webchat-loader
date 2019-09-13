import { fetch } from 'whatwg-fetch';

export default async function fetchMockBotDirectLineToken(host) {
  const req = await fetch(`https://${ host }/directline/token`, { method: 'POST' });

  if (!req.ok) {
    throw new Error(`Server returned ${ req.status } while fetching Direct Line token`);
  }

  const {
    conversationID: conversationId,
    userID: userId,
    ...others
  } = await req.json();

  return {
    conversationId,
    userId,
    ...others
  };
}
