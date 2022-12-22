import { call, put, select, takeEvery } from 'redux-saga/effects';

import { FETCH_DIRECT_LINE_TOKEN } from '../action/fetchDirectLineToken';
import fetchDirectLineToken from '../../util/fetchDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';
import tryDecodeJWT from '../../util/tryDecodeJWT';

import type { ResultOfPromise } from '../../types/ResultOfPromise';
import type { StoreState } from '../createStore';

export default function* fetchDirectLineTokenSaga() {
  yield takeEvery(FETCH_DIRECT_LINE_TOKEN, function* () {
    try {
      const [secret, userId] = (yield select(
        ({ directLineCredentials: { secret, userId } }: StoreState): [string, string] => [secret, userId]
      )) as [string, string];

      let url = secret;

      if (!/^https?:/u.test(url)) {
        return;
      }

      url = url.replace(/\{userid\}/giu, userId);

      let { token } = (yield call(fetchDirectLineToken, url)) as ResultOfPromise<
        ReturnType<typeof fetchDirectLineToken>
      >;

      if (new URL(url).hostname === 'covid19healthbot.cdc.gov') {
        token = (tryDecodeJWT<{ connectorToken: string }>(token) || {}).connectorToken || '';
      }

      yield put(setDirectLineToken(token));
    } catch (err) {
      console.error(err);
    }
  });
}
