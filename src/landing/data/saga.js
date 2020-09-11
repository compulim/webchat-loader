import { fork } from 'redux-saga/effects';

import fetchDirectLineToken from './saga/fetchDirectLineToken';
import fetchSpeechAuthorizationToken from './saga/fetchSpeechAuthorizationToken';
import generateDirectLineToken from './saga/generateDirectLineToken';
import generateSpeechAuthorizationToken from './saga/generateSpeechAuthorizationToken';
import generateUserIdOnCredentialChange from './saga/generateUserIdOnCredentialChange';
import loadBotPreset from './saga/loadBotPreset';
import refreshDirectLineToken from './saga/refreshDirectLineToken';

export default function* () {
  yield fork(fetchDirectLineToken);
  yield fork(fetchSpeechAuthorizationToken);
  yield fork(generateDirectLineToken);
  yield fork(generateSpeechAuthorizationToken);
  yield fork(generateUserIdOnCredentialChange);
  yield fork(loadBotPreset);
  yield fork(refreshDirectLineToken);
}
