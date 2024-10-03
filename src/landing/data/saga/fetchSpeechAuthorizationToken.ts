import { call } from 'redux-saga/effects';

import { FETCH_SPEECH_AUTHORIZATION_TOKEN } from '../action/fetchSpeechAuthorizationToken';
import fetchSpeechAuthorizationToken from '../../util/fetchSpeechAuthorizationToken';
import put from './internal/put';
import select from './internal/select';
import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import setSpeechRegion from '../action/setSpeechRegion';
import takeEvery from './internal/takeEvery';
import tryDecodeJWT from '../../util/tryDecodeJWT';

import type { ResultOfPromise } from '../../types/ResultOfPromise';
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

      const { region: regionFromAPI, token } = (yield call(fetchSpeechAuthorizationToken, url)) as ResultOfPromise<
        ReturnType<typeof fetchSpeechAuthorizationToken>
      >;

      const { region: regionFromToken } = tryDecodeJWT<{ region: string }>(token) || { region: '' };

      const region = regionFromAPI || regionFromToken;

      if (region) {
        yield put(setSpeechRegion(region));
      }

      yield put(setSpeechAuthorizationToken(token));
    } catch (err) {
      console.error(err);
    }
  });
}
