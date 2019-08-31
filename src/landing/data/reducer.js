import { combineReducers } from 'redux';

import directLineCredentials from './reducer/directLineCredentials';
import speechCredentials from './reducer/speechCredentials';
import streamingExtensionEnabled from './reducer/streamingExtensionEnabled';
import version from './reducer/version';
import webSocketEnabled from './reducer/webSocketEnabled';

export default combineReducers({
  directLineCredentials,
  speechCredentials,
  streamingExtensionEnabled,
  version,
  webSocketEnabled
})
