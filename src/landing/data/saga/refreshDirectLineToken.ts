import { call } from 'redux-saga/effects';

import { REFRESH_DIRECT_LINE_TOKEN } from '../action/refreshDirectLineToken';
import getDomainURL from '../../../common/util/getDomainURL';
import put from './internal/put';
import refreshDirectLineToken from '../../util/refreshDirectLineToken';
import select from './internal/select';
import setDirectLineToken from '../action/setDirectLineToken';
import takeEvery from './internal/takeEvery';

import type { ResultOfPromise } from '../../types/ResultOfPromise';
import type { StoreState } from '../createStore';

export default function* refreshDirectLineTokenSaga() {
  yield takeEvery(REFRESH_DIRECT_LINE_TOKEN, function* () {
    try {
      const [domainHost, protocol, token] = (yield select(
        ({ directLineCredentials: { domainHost, token }, protocol }: StoreState): [string, string, string] => [
          domainHost,
          protocol,
          token
        ]
      )) as [string, string, string];

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
