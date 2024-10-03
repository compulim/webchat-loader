import { call } from 'redux-saga/effects';

import fetchDirectLineToken from '../../util/fetchDirectLineToken';
import tryDecodeJWT from '../../util/tryDecodeJWT';
import { FETCH_DIRECT_LINE_TOKEN } from '../action/fetchDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';
import put from './internal/put';
import select from './internal/select';
import takeEvery from './internal/takeEvery';

import type { ResultOfPromise } from '../../types/ResultOfPromise';
import setDirectLineDomainHost from '../action/setDirectLineDomainHost';
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

      let { domain, token } = (yield call(fetchDirectLineToken, url)) as ResultOfPromise<
        ReturnType<typeof fetchDirectLineToken>
      >;

      if (new URL(url).hostname === 'covid19healthbot.cdc.gov') {
        token = (tryDecodeJWT<{ connectorToken: string }>(token) || {}).connectorToken || '';
      }

      if (domain) {
        yield put(setDirectLineDomainHost(new URL(domain).host));
      }

      yield put(setDirectLineToken(token));
    } catch (err) {
      console.error(err);
    }
  });
}
