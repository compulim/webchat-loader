import { call } from 'redux-saga/effects';

import { GENERATE_DIRECT_LINE_TOKEN } from '../action/generateDirectLineToken';
import generateDirectLineToken from '../../util/generateDirectLineToken';
import getDomainURL from '../../../common/util/getDomainURL';
import put from './internal/put';
import select from './internal/select';
import setDirectLineToken from '../action/setDirectLineToken';
import takeEvery from './internal/takeEvery';

import type { ResultOfPromise } from '../../types/ResultOfPromise';
import type { StoreState } from '../createStore';

export default function* generateDirectLineTokenSaga() {
  yield takeEvery(GENERATE_DIRECT_LINE_TOKEN, function* () {
    const [domainHost, protocol, secret] = (yield select(
      ({ directLineCredentials: { domainHost, secret }, protocol }: StoreState): [string, string, string] => [
        domainHost,
        protocol,
        secret
      ]
    )) as [string, string, string];

    try {
      const { token } = (yield call<typeof generateDirectLineToken>(generateDirectLineToken, {
        domainURL: getDomainURL(domainHost, protocol),
        secret
      })) as ResultOfPromise<ReturnType<typeof generateDirectLineToken>>;

      yield put(setDirectLineToken(token));
    } catch (err) {
      yield put(setDirectLineToken('<Failed to fetch token>'));
    }
  });
}
