import { combineReducers } from 'redux';

import directLineAppServiceExtensionStatus from './reducer/directLineAppServiceExtensionStatus';
import directLineCredentials from './reducer/directLineCredentials';
import protocol from './reducer/protocol';
import speechCredentials from './reducer/speechCredentials';
import transcript from './reducer/transcript';
import version from './reducer/version';

export default combineReducers({
  directLineAppServiceExtensionStatus,
  directLineCredentials,
  protocol,
  speechCredentials,
  transcript,
  version
});
