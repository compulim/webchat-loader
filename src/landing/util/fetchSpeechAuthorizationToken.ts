import { fetch } from 'whatwg-fetch';

export default async function fetchSpeechAuthorizationToken(url: string): Promise<{ token: string }> {
  const res = await fetch(url, { method: 'POST' });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} while fetching Speech authorization token.`);
  }

  const contentType = res.headers.get('content-type');

  if (contentType === 'application/json') {
    return await res.json();
  } else {
    return { token: await res.text() };
  }
}
