import { combineReducers } from 'redux';

import directLineCredentials from './reducer/directLineCredentials';
import protocol from './reducer/protocol';
import speechCredentials from './reducer/speechCredentials';
import transcript from './reducer/transcript';
import version from './reducer/version';

export default combineReducers({
  directLineCredentials,
  protocol,
  speechCredentials,
  transcript,
  version
});
