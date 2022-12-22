import { fetch } from 'whatwg-fetch';

export default async function fetchMockBotDirectLineToken(): Promise<string> {
  const req = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });

  if (!req.ok) {
    throw new Error(`Server returned ${req.status} while fetching Direct Line token`);
  }

  const { token } = await req.json();

  return token;
}
