import { fork } from 'redux-saga/effects';

import fetchDirectLineToken from './saga/fetchDirectLineToken';
import generateDirectLineToken from './saga/generateDirectLineToken';
import generateUserIdOnCredentialChange from './saga/generateUserIdOnCredentialChange';
import loadBotPreset from './saga/loadBotPreset';

export default function* () {
  yield fork(fetchDirectLineToken);
  yield fork(generateDirectLineToken);
  yield fork(generateUserIdOnCredentialChange);
  yield fork(loadBotPreset);
}
