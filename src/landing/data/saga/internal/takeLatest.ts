import { takeLatest as reduxSagaTakeLatest } from 'redux-saga/effects';

import type { Action } from '../../createStore';
import type { Action as ReduxAction } from 'redux';
import type { ActionPattern, ForkEffect } from 'redux-saga/effects';

export default function takeLatest<T extends ReduxAction = Action>(
  pattern: ActionPattern<T>,
  worker: (action: T) => void
): ForkEffect<never> {
  return reduxSagaTakeLatest<ActionPattern<T>>(pattern, worker as any) as ForkEffect<never>;
}
