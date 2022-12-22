import { call, put, select, takeEvery } from 'redux-saga/effects';

import { REFRESH_DIRECT_LINE_TOKEN } from '../action/refreshDirectLineToken';
import getDomainURL from '../../../common/util/getDomainURL';
import refreshDirectLineToken from '../../util/refreshDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

import type { StoreState } from '../createStore';
import { ResultOfPromise } from '../../types/ResultOfPromise';

export default function* refreshDirectLineTokenSaga() {
  yield takeEvery(REFRESH_DIRECT_LINE_TOKEN, function* () {
    try {
      const { domainHost, protocol, token } = (yield select(
        ({
          directLineCredentials: { domainHost, token },
          protocol
        }: StoreState): { domainHost: string; protocol: string; token: string } => ({
          domainHost,
          protocol,
          token
        })
      )) as { domainHost: string; protocol: string; token: string };

      if (!token) {
        return;
      }

      const domainURL = getDomainURL(domainHost, protocol);

      const { token: refreshedToken } = (yield call<typeof refreshDirectLineToken>(refreshDirectLineToken, {
        domainURL,
        token
      })) as ResultOfPromise<ReturnType<typeof refreshDirectLineToken>>;

      yield put(setDirectLineToken(refreshedToken));
    } catch (err) {
      console.error(err);
    }
  });
}
