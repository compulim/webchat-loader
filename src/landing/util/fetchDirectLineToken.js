export default async function fetchDirectLineToken(url) {
  const res = await fetch(url, { method: 'POST' });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status} while fetching Direct Line token.`);
  }

  const contentType = res.headers.get('content-type');

  if (contentType === 'application/json') {
    return await res.json();
  } else {
    return { token: await res.text() };
  }
}
