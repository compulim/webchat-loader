import { combineReducers } from 'redux';

import directLineAppServiceExtensionStatus from './reducer/directLineAppServiceExtensionStatus';
import directLineCredentials from './reducer/directLineCredentials';
import fetchArtifactBundleURLStatus from './reducer/fetchArtifactBundleURLStatus';
import protocol from './reducer/protocol';
import speechCredentials from './reducer/speechCredentials';
import transcript from './reducer/transcript';
import version from './reducer/version';

const reducer = combineReducers({
  directLineAppServiceExtensionStatus,
  directLineCredentials,
  fetchArtifactBundleURLStatus,
  protocol,
  speechCredentials,
  transcript,
  version
});

export default reducer;
