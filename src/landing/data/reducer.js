import { combineReducers } from 'redux';

import directLineCredentials from './reducer/directLineCredentials';
import speechCredentials from './reducer/speechCredentials';
import streamingExtensionsEnabled from './reducer/streamingExtensionsEnabled';
import version from './reducer/version';
import webSocketEnabled from './reducer/webSocketEnabled';

export default combineReducers({
  directLineCredentials,
  speechCredentials,
  streamingExtensionsEnabled,
  version,
  webSocketEnabled
});
