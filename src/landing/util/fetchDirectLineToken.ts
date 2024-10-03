import { object, optional, parse, string, type InferOutput } from 'valibot';
import { fetch } from 'whatwg-fetch';

const responseSchema = object({
  domain: optional(string()),
  token: string()
});

export default async function fetchDirectLineToken(url: string): Promise<InferOutput<typeof responseSchema>> {
  const res = await fetch(url, { method: 'POST' });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} while fetching Direct Line token.`);
  }

  const contentType = res.headers.get('content-type');

  if (/^application\/json(;|$)/u.test(contentType || '')) {
    return parse(responseSchema, await res.json());
  } else {
    return { token: await res.text() };
  }
}
