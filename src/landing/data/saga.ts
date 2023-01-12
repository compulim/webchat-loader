import { fork } from 'redux-saga/effects';

import autoRefreshDirectLineTokenSaga from './saga/autoRefreshDirectLineToken';
import fetchArtifactBundleURL from './saga/fetchArtifactBundleURL';
import fetchDirectLineToken from './saga/fetchDirectLineToken';
import fetchSpeechAuthorizationToken from './saga/fetchSpeechAuthorizationToken';
import generateDirectLineToken from './saga/generateDirectLineToken';
import generateSpeechAuthorizationToken from './saga/generateSpeechAuthorizationToken';
import loadBotPreset from './saga/loadBotPreset';
import pingDirectLineAppServiceExtension from './saga/pingDirectLineAppServiceExtension';
import pingDirectLineAppServiceExtensionOnChange from './saga/pingDirectLineAppServiceExtensionOnChange';
import refreshDirectLineToken from './saga/refreshDirectLineToken';

export default function* () {
  yield fork(autoRefreshDirectLineTokenSaga);
  yield fork(fetchArtifactBundleURL);
  yield fork(fetchDirectLineToken);
  yield fork(fetchSpeechAuthorizationToken);
  yield fork(generateDirectLineToken);
  yield fork(generateSpeechAuthorizationToken);
  yield fork(loadBotPreset);
  yield fork(pingDirectLineAppServiceExtension);
  yield fork(pingDirectLineAppServiceExtensionOnChange);
  yield fork(refreshDirectLineToken);
}
