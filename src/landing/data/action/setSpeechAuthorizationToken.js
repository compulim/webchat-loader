const SET_SPEECH_AUTHORIZATION_TOKEN = 'SET_SPEECH_AUTHORIZATION_TOKEN';

export default function setSpeechAuthorizationToken(authorizationToken) {
  return {
    payload: { authorizationToken },
    type: SET_SPEECH_AUTHORIZATION_TOKEN
  };
}

export { SET_SPEECH_AUTHORIZATION_TOKEN }
