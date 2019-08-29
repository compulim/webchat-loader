import { DirectLine as NPMDirectLine } from 'botframework-directlinejs';
import random from 'math-random';
import updateIn from 'simple-update-in';

import fetchMockBotSpeechServicesToken from './util/fetchMockBotSpeechServicesToken';
import loadAsset from './util/loadAsset';
import passThrough from './util/passThrough';
import toRxJS from './util/toRxJS';

async function main() {
  const urlSearchParams = new URLSearchParams(location.search);
  let version = urlSearchParams.get('v') || 'latest';
  const experiment = urlSearchParams.get('x') || 'noop';
  let conversationId = urlSearchParams.get('cid');
  let secret = urlSearchParams.get('s');
  const speechKey = urlSearchParams.get('speechkey');
  const speechRegion = urlSearchParams.get('speechregion');
  let token = urlSearchParams.get('t');
  let userID = urlSearchParams.get('userid');
  const streamingExtensionHostname = urlSearchParams.get('se');
  const webSocket = urlSearchParams.get('ws') !== 'false';

  let assetURLs;
  let customDirectLineJS;

  if (version === 'localhost') {
    try {
      await loadAsset(`http://localhost:5000/directLine.js?_=${ Date.now() }`);
      customDirectLineJS = true;
    } catch (err) {
      console.warn('Loading Web Chat from localhost:5000, but custom DirectLineJS is not found. Will use DirectLineJS from Web Chat bundle.');
    }

    assetURLs = [`http://localhost:5000/webchat.js?_=${ Date.now() }`];

    if (streamingExtensionHostname && secret && !token) {
      userID = `dl_${ random().toString(36).substr(2, 10) }`;

      const res = await fetch(`https://${ streamingExtensionHostname }/.bot/v3/directline/tokens/generate`, {
        body: JSON.stringify({ User: { Id: userID } }),
        headers: {
          authorization: `Bearer ${ secret }`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      const result = await res.json();

      secret = null;
      token = result.token;
      conversationId = result.conversationId;
    }
  } else if (/^4/.test(version)) {
    assetURLs = [`https://cdn.botframework.com/botframework-webchat/${ version }/webchat.js`];
  } else {
    assetURLs = [
      `https://unpkg.com/botframework-webchat@${ version }/botchat.js`,
      `https://unpkg.com/botframework-webchat@${ version }/botchat.css`,
      `https://unpkg.com/botframework-webchat@${ version }/CognitiveServices.js`,
    ];
  }

  await Promise.all(assetURLs.map(url => loadAsset(url)));

  const DirectLine = customDirectLineJS ? window.DirectLine.DirectLine : (window.WebChat.DirectLine || NPMDirectLine);
  const directLineOptions = {
    ...(conversationId ? { conversationId } : {}),
    domain: streamingExtensionHostname ? `https://${ streamingExtensionHostname }/.bot/v3/directline` : undefined,
    ...(secret ? { secret } : {}),
    ...(!!streamingExtensionHostname ? { streamingWebSocket: true } : {}),
    ...(token ? { token }: {}),
    webSocket
  };
  const directLine = new DirectLine(directLineOptions);
  const quirkyDirectLine = {
    activity$: passThrough(directLine.activity$, activity => {
      const nextActivity = updateIn(
        activity,
        ['attachments', () => true, 'contentUrl'],
        experiment === 'noop' ?
          value => value
        : experiment === 'placeholder' ?
          () => 'placeholder.png'
        : experiment === '403' ?
          // Removing the token will cause 403
          value => value.replace(/\?t=.+/, '')
        :
          undefined
      );

      return nextActivity;
    }),
    connectionStatus$: passThrough(directLine.connectionStatus$),
    end: () => directLine.end(),
    get referenceGrammarId() { return directLine.referenceGrammarId; },
    getSessionId: (...args) => directLine.getSessionId(...args),
    postActivity: (...args) => directLine.postActivity(...args),
    get token() { return directLine.token; }
  };

  if (version === 'localhost' || /^4/.test(version)) {
    let webSpeechPonyfillFactory;

    if (speechKey) {
      const speechOptions = {
        // speechSynthesisOutputFormat: 'audio-16khz-32kbitrate-mono-mp3'
        // speechRecognitionEndpointId: '16f4e386-3356-4bee-8e36-c1d3d9b9a252',
        // speechSynthesisDeploymentId: '5bc5e66a-3e81-4026-948d-d219afcc5702'
        // textNormalization: 'itn'
        // enableTelemetry: true
      };

      if (speechKey === '__mockbot__') {
        const { region } = await fetchMockBotSpeechServicesToken();

        const speechRecognitionPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          ...speechOptions,
          // authorizationToken: () => fetchMockBotSpeechServicesToken().then(({ token }) => token),
          region,
          subscriptionKey: 'c2c0791c71874cd29be24acb4b04a326'
        });

        const speechSynthesisPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          ...speechOptions,
          authorizationToken: () => fetchMockBotSpeechServicesToken().then(({ token }) => token),
          region
        });

        webSpeechPonyfillFactory = options => {
          const { SpeechGrammarList, SpeechRecognition } = speechRecognitionPonyfillFactory(options);
          const { speechSynthesis, SpeechSynthesisUtterance } = speechSynthesisPonyfillFactory(options);

          return {
            SpeechGrammarList,
            SpeechRecognition,
            speechSynthesis,
            SpeechSynthesisUtterance
          };
        };
      } else {
        webSpeechPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          ...speechOptions,
          region: speechRegion || 'westus',
          subscriptionKey: speechKey
        });
      }
    }

    window.WebChat.renderWebChat({
      directLine: quirkyDirectLine,
      // selectVoice: () => ({ voiceURI: '1' }),
      webSpeechPonyfillFactory
    }, document.getElementById('webchat'));
  } else {
    window.BotChat.App({
      botConnection: {
        ...quirkyDirectLine,
        activity$: toRxJS(quirkyDirectLine.activity$),
        connectionStatus$: toRxJS(quirkyDirectLine.connectionStatus$)
      },
      speechOptions: {
        speechRecognizer: new CognitiveServices.SpeechRecognizer({ subscriptionKey: speechKey }),
        speechSynthesizer: new CognitiveServices.SpeechSynthesizer({
          gender: CognitiveServices.SynthesisGender.Female,
          subscriptionKey: speechKey,
          voiceName: 'Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)'
        })
      },
      user: { id: userID, name: 'You' }
    }, document.getElementById('webchat'));
  }

  document.querySelector('#webchat > *').focus();

  // setTimeout(() => {
  //   quirkyDirectLine.postActivity({
  //     from: { id: userID },
  //     text: `echo Loading Web Chat "${ version }" using experiment "${ experiment }"`,
  //     type: 'message'
  //   }).subscribe();
  // }, 2000);
}

main().catch(err => console.error(err));
