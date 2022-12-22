import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_SPEECH_AUTHORIZATION_TOKEN = 'SET_SPEECH_AUTHORIZATION_TOKEN';

export default function setSpeechAuthorizationToken(
  authorizationToken: string
): ActionWithPayload<typeof SET_SPEECH_AUTHORIZATION_TOKEN, { authorizationToken: string }> {
  return {
    payload: { authorizationToken },
    type: SET_SPEECH_AUTHORIZATION_TOKEN
  };
}

export { SET_SPEECH_AUTHORIZATION_TOKEN };
