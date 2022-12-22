import { call, cancel, fork } from 'redux-saga/effects';

import setDirectLineToken, { SET_DIRECT_LINE_TOKEN } from '../action/setDirectLineToken';
import put from './internal/put';
import refreshDirectLineToken from '../action/refreshDirectLineToken';
import select from './internal/select';
import take from './internal/take';
import tryDecodeJWT from '../../util/tryDecodeJWT';

import type { Task } from 'redux-saga';

type SetDirectLineTokenAction = ReturnType<typeof setDirectLineToken>;

const REFRESH_TOKEN_IF_EXPIRING_IN = 60000 * 20;
const WAKE_INTERVAL = 30000;

function sleep(durationInMS: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, durationInMS));
}

export default function* autoRefreshDirectLineTokenSaga() {
  let task: Task | undefined = undefined;

  for (;;) {
    let token: string = yield select(({ directLineCredentials: { token } }) => token);

    if (task) {
      yield cancel(task);
    }

    task =
      token &&
      (yield fork(function* (token) {
        for (;;) {
          const expiringIn = ((tryDecodeJWT<{ exp: number }>(token) || {}).exp || 0) * 1000 - Date.now();

          expiringIn > 0 && expiringIn < REFRESH_TOKEN_IF_EXPIRING_IN && (yield put(refreshDirectLineToken()));

          yield call(sleep, WAKE_INTERVAL);
        }
      }, token));

    ({
      payload: { token }
    } = (yield take(SET_DIRECT_LINE_TOKEN)) as SetDirectLineTokenAction);
  }
}
