import { combineReducers } from 'redux';

import directLineAppServiceExtensionStatus from './reducer/directLineAppServiceExtensionStatus';
import directLineCredentials from './reducer/directLineCredentials';
import protocol from './reducer/protocol';
import speechCredentials from './reducer/speechCredentials';
import transcript from './reducer/transcript';
import version from './reducer/version';

import type { ActionOfReducer } from '../types/ActionOfReducer';
import type fetchDirectLineToken from './action/fetchDirectLineToken';
import type fetchSpeechAuthorizationToken from './action/fetchSpeechAuthorizationToken';
import type generateDirectLineToken from './action/generateDirectLineToken';
import type generateSpeechAuthorizationToken from './action/generateSpeechAuthorizationToken';
import type pingDirectLineAppServiceExtension from './action/pingDirectLineAppServiceExtension';
import type refreshDirectLineToken from './action/refreshDirectLineToken';

const reducer = combineReducers({
  directLineAppServiceExtensionStatus,
  directLineCredentials,
  protocol,
  speechCredentials,
  transcript,
  version
});

export default reducer;

export type Action =
  | ActionOfReducer<typeof reducer>
  | ReturnType<typeof fetchDirectLineToken>
  | ReturnType<typeof fetchSpeechAuthorizationToken>
  | ReturnType<typeof generateDirectLineToken>
  | ReturnType<typeof generateSpeechAuthorizationToken>
  | ReturnType<typeof pingDirectLineAppServiceExtension>
  | ReturnType<typeof refreshDirectLineToken>;
