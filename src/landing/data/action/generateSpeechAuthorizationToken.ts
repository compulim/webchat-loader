import type { Action } from 'redux';

const GENERATE_SPEECH_AUTHORIZATION_TOKEN = 'GENERATE_SPEECH_AUTHORIZATION_TOKEN';

export default function generateSpeechAuthorizationToken(): Action<typeof GENERATE_SPEECH_AUTHORIZATION_TOKEN> {
  return { type: GENERATE_SPEECH_AUTHORIZATION_TOKEN };
}

export { GENERATE_SPEECH_AUTHORIZATION_TOKEN };
