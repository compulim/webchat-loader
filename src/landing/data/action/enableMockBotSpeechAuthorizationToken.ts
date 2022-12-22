import type { Action } from 'redux';

const ENABLE_MOCK_BOT_SPEECH_AUTHORIZATION_TOKEN = 'ENABLE_MOCK_BOT_SPEECH_AUTHORIZATION_TOKEN';

export default function enableMockBotSpeechAuthorizationToken(): Action<
  typeof ENABLE_MOCK_BOT_SPEECH_AUTHORIZATION_TOKEN
> {
  return { type: ENABLE_MOCK_BOT_SPEECH_AUTHORIZATION_TOKEN };
}

export { ENABLE_MOCK_BOT_SPEECH_AUTHORIZATION_TOKEN };
