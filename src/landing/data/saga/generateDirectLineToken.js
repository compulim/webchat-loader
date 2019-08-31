import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GENERATE_DIRECT_LINE_TOKEN } from '../action/generateDirectLineToken';

import generateDirectLineToken from '../../util/generateDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* generateDirectLineTokenSaga() {
  yield takeEvery(GENERATE_DIRECT_LINE_TOKEN, function* () {
    const secret = yield select(({ directLineCredentials: { secret } }) => secret);
    const { token } = yield call(generateDirectLineToken, secret);

    yield put(setDirectLineToken(token));
  });
}
