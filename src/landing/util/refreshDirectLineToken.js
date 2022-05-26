export default async function refreshDirectLineToken({ domain, token }) {
  const res = await fetch(`${domain}/tokens/refresh`, {
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  if (!res.ok) {
    throw new Error(`Direct Line returned ${res.status} while refreshing token`);
  }

  const json = await res.json();

  if ('error' in json) {
    throw new Error(`Direct Line responded ${JSON.stringify(json.error)} while refreshing new token`);
  }

  return json;
}
