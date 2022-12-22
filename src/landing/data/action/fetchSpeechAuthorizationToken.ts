import type { Action } from 'redux';

const FETCH_SPEECH_AUTHORIZATION_TOKEN = 'FETCH_SPEECH_AUTHORIZATION_TOKEN';

export default function fetchSpeechAuthorizationToken(): Action<typeof FETCH_SPEECH_AUTHORIZATION_TOKEN> {
  return { type: FETCH_SPEECH_AUTHORIZATION_TOKEN };
}

export { FETCH_SPEECH_AUTHORIZATION_TOKEN };
