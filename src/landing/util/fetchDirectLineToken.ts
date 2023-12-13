import { fetch } from 'whatwg-fetch';

export default async function fetchDirectLineToken(url: string): Promise<{ token: string }> {
  const res = await fetch(url, { method: 'POST' });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} while fetching Direct Line token.`);
  }

  const contentType = res.headers.get('content-type');

  if (/^application\/json(,|$)/u.test(contentType || '')) {
    return await res.json();
  } else {
    return { token: await res.text() };
  }
}
