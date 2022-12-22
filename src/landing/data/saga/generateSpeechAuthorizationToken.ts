import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GENERATE_SPEECH_AUTHORIZATION_TOKEN } from '../action/generateSpeechAuthorizationToken';

import generateSpeechAuthorizationToken from '../../util/generateSpeechAuthorizationToken';
import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';

import type { StoreState } from '../createStore';
import { ResultOfPromise } from '../../types/ResultOfPromise';

export default function* generateDirectLineTokenSaga() {
  yield takeEvery(GENERATE_SPEECH_AUTHORIZATION_TOKEN, function* () {
    const { region, subscriptionKey } = (yield select(
      ({
        speechCredentials: { region, subscriptionKey }
      }: StoreState): { region: string; subscriptionKey: string } => ({
        region,
        subscriptionKey
      })
    )) as {
      region: string;
      subscriptionKey: string;
    };

    try {
      const { authorizationToken } = (yield call(generateSpeechAuthorizationToken, {
        region,
        subscriptionKey
      })) as ResultOfPromise<ReturnType<typeof generateSpeechAuthorizationToken>>;

      yield put(setSpeechAuthorizationToken(authorizationToken));
    } catch (err) {
      yield put(setSpeechAuthorizationToken('<Failed to fetch authorization token>'));
    }
  });
}
