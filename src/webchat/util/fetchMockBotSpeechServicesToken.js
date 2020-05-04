let lastResult;
const TOKEN_VALIDITY = 5000;

async function fetchMockBotSpeechServicesToken() {
  const req = await fetch('https://webchat-mockbot.azurewebsites.net/speechservices/token', { method: 'POST' });

  if (!req.ok) {
    throw new Error(`Server returned ${req.status} while fetching Cognitive Services Speech Services token`);
  }

  const { region, token } = await req.json();

  return { region, token };
}

export default async function fetchMemoizedMockBotSpeechServicesToken() {
  if (lastResult && lastResult.expireAt > Date.now()) {
    const { region, token } = lastResult;

    return { region, token };
  } else {
    const { region, token } = await fetchMockBotSpeechServicesToken();

    lastResult = {
      expireAt: Date.now() + TOKEN_VALIDITY,
      region,
      token
    };

    return { region, token };
  }
}
