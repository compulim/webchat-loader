import { call, put, select, takeEvery } from 'redux-saga/effects';

import { REFRESH_DIRECT_LINE_TOKEN } from '../action/refreshDirectLineToken';
import getDomainURL from '../../../common/util/getDomainURL';
import refreshDirectLineToken from '../../util/refreshDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* refreshDirectLineTokenSaga() {
  yield takeEvery(REFRESH_DIRECT_LINE_TOKEN, function* () {
    try {
      const { domainHost, protocol, token } = yield select(
        ({ directLineCredentials: { domainHost, token }, protocol }) => ({
          domainHost,
          protocol,
          token
        })
      );

      if (!token) {
        return;
      }

      const domainURL = getDomainURL(domainHost, protocol);

      const { token: refreshedToken } = yield call(refreshDirectLineToken, { domainURL, token });

      yield put(setDirectLineToken(refreshedToken));
    } catch (err) {
      console.error(err);
    }
  });
}
