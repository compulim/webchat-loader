import { takeEvery as reduxSagaTakeEvery } from 'redux-saga/effects';

import type { Action } from '../../reducer';
import type { ActionPattern, ForkEffect } from 'redux-saga/effects';
import type { Action as ReduxAction } from 'redux';

export default function takeEvery<T extends ReduxAction = Action>(
  pattern: ActionPattern<T>,
  worker: (action: T) => void
): ForkEffect<never> {
  return reduxSagaTakeEvery<ActionPattern<T>>(pattern, worker as any) as ForkEffect<never>;
}
