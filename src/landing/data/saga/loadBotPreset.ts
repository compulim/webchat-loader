import { put, takeEvery } from 'redux-saga/effects';

import { LOAD_BOT_PRESET } from '../action/loadBotPreset';

import fetchDirectLineToken from '../action/fetchDirectLineToken';
import fetchSpeechAuthorizationToken from '../action/fetchSpeechAuthorizationToken';
import setDirectLineDomainHost from '../action/setDirectLineDomainHost';
import setDirectLineSecret from '../action/setDirectLineSecret';
import setDirectLineToken from '../action/setDirectLineToken';
import setProtocolAppServiceExtension from '../action/setProtocolAppServiceExtension';
import setProtocolDirectLineSpeech from '../action/setProtocolDirectLineSpeech';
import setProtocolWebSocket from '../action/setProtocolWebSocket';
import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';

import type loadBotPreset from '../action/loadBotPreset';

type LoadBotPresetAction = ReturnType<typeof loadBotPreset>;

export default function* loadBotPresetSaga() {
  yield takeEvery(LOAD_BOT_PRESET, function* ({ payload: { name } }: LoadBotPresetAction) {
    if (name === 'mockbot') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('https://webchat-mockbot.azurewebsites.net/directline/token'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey('https://webchat-mockbot.azurewebsites.net/speechservices/token'));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot3') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('https://webchat-mockbot3.azurewebsites.net/api/token/directline'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot3-dlase') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('https://webchat-mockbot3.azurewebsites.net/api/token/directlinease'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolAppServiceExtension());
      yield put(setDirectLineDomainHost('webchat-mockbot3.azurewebsites.net'));

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot-dls') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret(''));

      yield put(setProtocolDirectLineSpeech());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey('https://webchat-mockbot-streaming.azurewebsites.net/speechservices/token'));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot-ase') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('https://webchat-mockbot-streaming.azurewebsites.net/directline/token'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolAppServiceExtension());
      yield put(setDirectLineDomainHost('webchat-mockbot-streaming.azurewebsites.net'));

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey('https://webchat-mockbot-streaming.azurewebsites.net/speechservices/token'));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'dev') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('http://localhost:3978/directline/token'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey('https://localhost:3978/speechservices/token'));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot-proxy') {
      yield put(setDirectLineToken(''));

      // const { token } = yield call(fetchMockBotDirectLineToken, 'webchat-mockbot-proxy.azurewebsites.net');

      yield put(setProtocolAppServiceExtension());
      yield put(setDirectLineDomainHost('webchat-mockbot-proxy.azurewebsites.net'));
      yield put(setDirectLineSecret(''));
      // yield put(setDirectLineToken(token));

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey('https://webchat-mockbot.azurewebsites.net/speechservices/token'));
      yield put(fetchSpeechAuthorizationToken());
    }
  });
}
