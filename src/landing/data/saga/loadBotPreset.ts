import fetchDirectLineToken from '../action/fetchDirectLineToken';
import fetchSpeechAuthorizationToken from '../action/fetchSpeechAuthorizationToken';
import { LOAD_BOT_PRESET } from '../action/loadBotPreset';
import setDirectLineSecret from '../action/setDirectLineSecret';
import setDirectLineToken from '../action/setDirectLineToken';
import setProtocolAppServiceExtension from '../action/setProtocolAppServiceExtension';
import setProtocolDirectLineSpeech from '../action/setProtocolDirectLineSpeech';
import setProtocolWebSocket from '../action/setProtocolWebSocket';
import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';
import put from './internal/put';
import takeEvery from './internal/takeEvery';

import type loadBotPreset from '../action/loadBotPreset';

type LoadBotPresetAction = ReturnType<typeof loadBotPreset>;

export default function* loadBotPresetSaga() {
  yield takeEvery<LoadBotPresetAction>(LOAD_BOT_PRESET, function* ({ payload: { name } }) {
    if (name === 'mockbot') {
      yield put(setDirectLineToken(''));
      yield put(
        setDirectLineSecret(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/directline'
        )
      );
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));

      yield put(
        setSpeechSubscriptionKey(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/speech/msi'
        )
      );
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'echobot') {
      yield put(setDirectLineToken(''));
      yield put(
        setDirectLineSecret(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/directline?bot=echo%20bot'
        )
      );
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));

      yield put(
        setSpeechSubscriptionKey(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/speech/msi'
        )
      );
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'echobot-dlase') {
      yield put(setDirectLineToken(''));
      yield put(
        setDirectLineSecret(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/directlinease?bot=echo%20bot'
        )
      );
      yield put(fetchDirectLineToken());

      yield put(setProtocolAppServiceExtension());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));

      yield put(
        setSpeechSubscriptionKey(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/speech/msi'
        )
      );
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot-dls') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret(''));

      yield put(setProtocolDirectLineSpeech());

      yield put(setSpeechAuthorizationToken(''));
      yield put(
        setSpeechSubscriptionKey(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/speech/msi'
        )
      );
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'mockbot-ase') {
      yield put(setDirectLineToken(''));
      yield put(
        setDirectLineSecret(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/directlinease'
        )
      );
      yield put(fetchDirectLineToken());

      yield put(setProtocolAppServiceExtension());
      // yield put(setDirectLineDomainHost('hawo-mockbot4-bot-app.azurewebsites.net'));

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));

      yield put(
        setSpeechSubscriptionKey(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/speech/msi'
        )
      );
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'echobot-dls') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret(''));

      yield put(setProtocolDirectLineSpeech());

      yield put(setSpeechAuthorizationToken(''));
      yield put(
        setSpeechSubscriptionKey(
          'https://hawo-mockbot4-token-app.ambitiousflower-67725bfd.westus.azurecontainerapps.io/api/token/speech/msi?bot=echo%20bot'
        )
      );
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'dev') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('http://localhost:3978/directline/token'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey('https://localhost:3978/speechservices/token'));
      yield put(fetchSpeechAuthorizationToken());
    } else if (name === 'relaybot') {
      yield put(setDirectLineToken(''));
      yield put(setDirectLineSecret('https://webchat-relaybot.azurewebsites.net/api/token/directline'));
      yield put(fetchDirectLineToken());

      yield put(setProtocolWebSocket());

      yield put(setSpeechAuthorizationToken(''));
      yield put(setSpeechSubscriptionKey(''));
      yield put(fetchSpeechAuthorizationToken());
    }
  });
}
