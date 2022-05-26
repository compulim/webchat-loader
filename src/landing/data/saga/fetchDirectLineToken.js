import { call, put, select, takeEvery } from 'redux-saga/effects';
import decode from 'jwt-decode';

import { FETCH_DIRECT_LINE_TOKEN } from '../action/fetchDirectLineToken';
import fetchDirectLineToken from '../../util/fetchDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* fetchDirectLineTokenSaga() {
  yield takeEvery(FETCH_DIRECT_LINE_TOKEN, function* () {
    try {
      const { secret, userId } = yield select(({ directLineCredentials: { secret, userId } }) => ({ secret, userId }));
      let url = secret;

      if (!/^https?:/u.test(url)) {
        return;
      }

      url = url.replace(/\{userid\}/giu, userId);

      let { token } = yield call(fetchDirectLineToken, url);

      if (new URL(url).hostname === 'covid19healthbot.cdc.gov') {
        token = decode(token).connectorToken;
      }

      yield put(setDirectLineToken(token));
    } catch (err) {
      console.error(err);
    }
  });
}
