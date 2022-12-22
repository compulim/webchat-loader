import { fetch } from 'whatwg-fetch';

export default async function generateDirectLineToken({
  region,
  subscriptionKey
}: {
  region: string,
  subscriptionKey: string
}): Promise<{ authorizationToken: string }> {
  const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
    headers: {
      // authorization: `Bearer ${secret}`,
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Ocp-Apim-Subscription-Key': subscriptionKey
    },
    method: 'POST'
  });

  if (!res.ok) {
    throw new Error(`Cognitive Services returned ${res.status} while generating token`);
  }

  const text = await res.text();

  return { authorizationToken: text };
}
