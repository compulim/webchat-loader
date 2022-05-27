import { call, cancel, fork, put, select, take } from 'redux-saga/effects';
import decode from 'jwt-decode';

import { SET_DIRECT_LINE_TOKEN } from '../action/setDirectLineToken';
import refreshDirectLineToken from '../action/refreshDirectLineToken';

const REFRESH_TOKEN_IF_EXPIRING_IN = 60000 * 50;
const WAKE_INTERVAL = 30000;

function sleep(durationInMS) {
  return new Promise(resolve => setTimeout(resolve, durationInMS));
}

export default function* autoRefreshDirectLineTokenSaga() {
  let task;
  let token = yield select(({ directLineCredentials: { token } }) => token);

  for (;;) {
    if (task) {
      yield cancel(task);
    }

    task =
      token &&
      (yield fork(function* (token) {
        for (;;) {
          const expiringIn = decode(token).exp * 1000 - Date.now();

          expiringIn > 0 && expiringIn < REFRESH_TOKEN_IF_EXPIRING_IN && (yield put(refreshDirectLineToken()));

          yield call(sleep, WAKE_INTERVAL);
        }
      }, token));

    ({
      payload: { token }
    } = yield take(SET_DIRECT_LINE_TOKEN));
  }
}
