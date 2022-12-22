import { put as reduxSagaPut } from 'redux-saga/effects';

import type { Action } from '../../reducer';
import type { PutEffect } from 'redux-saga/effects';

export default function put(action: Action): PutEffect<Action> {
  return reduxSagaPut<Action>(action);
}
