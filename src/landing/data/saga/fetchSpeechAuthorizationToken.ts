import { call, put, select, takeEvery } from 'redux-saga/effects';

import { FETCH_SPEECH_AUTHORIZATION_TOKEN } from '../action/fetchSpeechAuthorizationToken';
import fetchSpeechAuthorizationToken from '../../util/fetchSpeechAuthorizationToken';
import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import setSpeechRegion from '../action/setSpeechRegion';
import tryDecodeJWT from '../../util/tryDecodeJWT';

import type { StoreState } from '../createStore';

export default function* fetchSpeechAuthorizationTokenSaga() {
  yield takeEvery(FETCH_SPEECH_AUTHORIZATION_TOKEN, function* () {
    try {
      const url = (yield select(
        ({ speechCredentials: { subscriptionKey } }: StoreState): string => subscriptionKey
      )) as string;

      if (!/^https?:/u.test(url)) {
        return;
      }

      const { token } = yield call(fetchSpeechAuthorizationToken, url);

      const { region } = tryDecodeJWT<{ region: string }>(token) || {};

      if (region) {
        yield put(setSpeechRegion(region));
      }

      yield put(setSpeechAuthorizationToken(token));
    } catch (err) {
      console.error(err);
    }
  });
}
