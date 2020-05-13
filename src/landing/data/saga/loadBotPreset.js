import { call, put, takeEvery } from 'redux-saga/effects';

import { LOAD_BOT_PRESET } from '../action/loadBotPreset';

import fetchMockBotDirectLineToken from '../../util/fetchMockBotDirectLineToken2';

import disableAppServiceExtension from '../action/disableAppServiceExtension';
import enableAppServiceExtension from '../action/enableAppServiceExtension';
import enableWebSocket from '../action/enableWebSocket';
import fetchDirectLineToken from '../action/fetchDirectLineToken';
import setDirectLineDomainHost from '../action/setDirectLineDomainHost';
import setDirectLineSecret from '../action/setDirectLineSecret';
import setDirectLineToken from '../action/setDirectLineToken';
import setSpeechKeyFromMockBot from '../action/setSpeechKeyFromMockBot';

export default function* loadBotPresetSaga() {
  yield takeEvery(LOAD_BOT_PRESET, function* ({ payload: { name } }) {
    try {
      if (name === 'mockbot') {
        yield put(setDirectLineToken(''));
        yield put(setDirectLineSecret('https://webchat-mockbot.azurewebsites.net/directline/token'));
        yield put(fetchDirectLineToken());

        yield put(disableAppServiceExtension());
        yield put(enableWebSocket());
        yield put(setSpeechKeyFromMockBot());
      } else if (name === 'mockbot-ase') {
        yield put(setDirectLineToken(''));
        yield put(setDirectLineSecret('https://webchat-mockbot-streaming.azurewebsites.net/directline/token'));
        yield put(fetchDirectLineToken());

        yield put(enableAppServiceExtension());
        yield put(setDirectLineDomainHost('webchat-mockbot-streaming.azurewebsites.net'));
        yield put(enableWebSocket());
        yield put(setSpeechKeyFromMockBot());
      } else if (name === 'dev') {
        yield put(setDirectLineToken(''));
        yield put(setDirectLineSecret('http://localhost:3978/directline/token'));
        yield put(fetchDirectLineToken());

        yield put(disableAppServiceExtension());
        yield put(enableWebSocket());
        yield put(setSpeechKeyFromMockBot());
      } else if (name === 'mockbot-proxy') {
        yield put(setDirectLineToken(''));

        // const { token } = yield call(fetchMockBotDirectLineToken, 'webchat-mockbot-proxy.azurewebsites.net');

        yield put(enableAppServiceExtension());
        yield put(enableWebSocket());
        yield put(setDirectLineDomainHost('webchat-mockbot-proxy.azurewebsites.net'));
        yield put(setDirectLineSecret(''));
        // yield put(setDirectLineToken(token));
        yield put(setSpeechKeyFromMockBot());
      } else if (name === 'mockbot-streaming-extension') {
        yield put(setDirectLineToken(''));

        const { token } = yield call(fetchMockBotDirectLineToken, 'webchat-mockbot-se.azurewebsites.net');

        yield put(enableAppServiceExtension());
        yield put(enableWebSocket());
        yield put(setDirectLineDomainHost('webchat-mockbot-se.azurewebsites.net'));
        yield put(setDirectLineSecret(''));
        yield put(setDirectLineToken(token));
        yield put(setSpeechKeyFromMockBot());
      }
    } catch (err) {}
  });
}
