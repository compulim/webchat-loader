import { combineReducers } from 'redux';

import appServiceExtensionEnabled from './reducer/appServiceExtensionEnabled';
import directLineCredentials from './reducer/directLineCredentials';
import speechCredentials from './reducer/speechCredentials';
import version from './reducer/version';
import webSocketEnabled from './reducer/webSocketEnabled';

export default combineReducers({
  appServiceExtensionEnabled,
  directLineCredentials,
  speechCredentials,
  version,
  webSocketEnabled
});
