import { fetch } from 'whatwg-fetch';
import generateUserId from './generateUserId';

export default async function generateDirectLineToken({ domainURL, secret }) {
  const userId = generateUserId(true);

  const res = await fetch(new URL('directline/tokens/generate', domainURL).href, {
    body: JSON.stringify({ User: { Id: userId } }),
    headers: {
      authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (!res.ok) {
    throw new Error(`Direct Line returned ${res.status} while generating token`);
  }

  const json = await res.json();

  if ('error' in json) {
    throw new Error(`Direct Line responded ${JSON.stringify(json.error)} while generating new token`);
  }

  return { ...json, userId };
}
