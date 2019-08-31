import { fork } from 'redux-saga/effects';

import generateDirectLineToken from './saga/generateDirectLineToken';
import generateUserIdOnCredentialChange from './saga/generateUserIdOnCredentialChange';
import loadBotPreset from './saga/loadBotPreset';

export default function* () {
  yield fork(generateDirectLineToken);
  yield fork(generateUserIdOnCredentialChange);
  yield fork(loadBotPreset);
}
