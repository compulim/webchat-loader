import { combineReducers } from 'redux';

import directLineCredentials from './reducer/directLineCredentials';
import protocol from './reducer/protocol';
import speechCredentials from './reducer/speechCredentials';
import version from './reducer/version';

export default combineReducers({
  directLineCredentials,
  protocol,
  speechCredentials,
  version
});
