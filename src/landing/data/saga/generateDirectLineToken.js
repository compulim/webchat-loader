import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GENERATE_DIRECT_LINE_TOKEN } from '../action/generateDirectLineToken';

import generateDirectLineToken from '../../util/generateDirectLineToken';
import getDomainURL from '../../../common/util/getDomainURL';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* generateDirectLineTokenSaga() {
  yield takeEvery(GENERATE_DIRECT_LINE_TOKEN, function* () {
    const { domainHost, protocol, secret } = yield select(
      ({ directLineCredentials: { domainHost, secret }, protocol }) => ({
        domainHost,
        protocol,
        secret
      })
    );

    try {
      const { token } = yield call(generateDirectLineToken, { domainURL: getDomainURL(domainHost, protocol), secret });

      yield put(setDirectLineToken(token));
    } catch (err) {
      yield put(setDirectLineToken('<Failed to fetch token>'));
    }
  });
}
