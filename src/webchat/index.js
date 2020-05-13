import 'core-js/modules/web.url-search-params';
import 'core-js/modules/es.promise';
import 'regenerator-runtime';

import { DirectLine as NPMDirectLine, DirectLineStreaming as NPMDirectLineStreaming } from 'botframework-directlinejs';
import { fetch } from 'whatwg-fetch';
import random from 'math-random';
// import updateIn from 'simple-update-in';

import fetchMockBotSpeechServicesToken from './util/fetchMockBotSpeechServicesToken';
import isLocalhost from './util/isLocalhost';
import loadAsset from './util/loadAsset';
// import passThrough from './util/passThrough';
// import toRxJS from './util/toRxJS';

async function main() {
  const urlSearchParams = new URLSearchParams(location.search);
  let version = urlSearchParams.get('v') || 'latest';
  // const experiment = urlSearchParams.get('x') || 'noop';
  let conversationId = urlSearchParams.get('cid');
  let secret = urlSearchParams.get('s');
  const speechKey = urlSearchParams.get('speechkey');
  const speechRegion = urlSearchParams.get('speechregion');
  let token = urlSearchParams.get('t');
  let userID = urlSearchParams.get('userid');
  const appServiceExtensionHost = urlSearchParams.get('se');
  const webSocket = urlSearchParams.get('ws') !== 'false';

  let assetURLs;

  // const DIRECT_LINE_DEV_ASSET = `https://github.com/microsoft/BotFramework-DirectLineJS/releases/download/dev-streamingextensions/directline.js`;
  const WEB_CHAT_DEV_ASSET = `https://github.com/microsoft/BotFramework-WebChat/releases/download/daily/webchat-es5.js`;

  if (/^0/.test(version)) {
    assetURLs = [
      `https://unpkg.com/botframework-webchat@${version}/botchat.js`,
      `https://unpkg.com/botframework-webchat@${version}/botchat.css`,
      `https://unpkg.com/botframework-webchat@${version}/CognitiveServices.js`
    ];
    console.warn(`Using Web Chat from ${assetURLs[0]}`);
  } else if (/^4/.test(version)) {
    assetURLs = [`https://cdn.botframework.com/botframework-webchat/${version}/webchat-es5.js`];
    console.warn(`Using Web Chat from ${assetURLs[0]}`);
  } else if (version === 'dev') {
    assetURLs = [
      // DIRECT_LINE_DEV_ASSET,
      WEB_CHAT_DEV_ASSET
    ];

    // console.warn(`Using DirectLineJS from ${ DIRECT_LINE_DEV_ASSET }`);
    console.warn(`Using Web Chat from ${WEB_CHAT_DEV_ASSET}`);
  } else {
    try {
      const url = `${version}directLine.js`;

      await loadAsset(`${url}?_=${Date.now()}`);
      console.warn(`Using DirectLineJS from ${url}`);
    } catch (err) {}

    try {
      const url = `${version}webchat-es5.js`;

      await loadAsset(`${url}?_=${Date.now()}`);
      console.warn(`Using Web Chat from ${url}`);
    } catch (err) {
      try {
        const url = `${version}webchat.js`;

        await loadAsset(`${url}?_=${Date.now()}`);
        console.warn(`Using Web Chat from ${url}`);
      } catch (err) {
        await loadAsset(WEB_CHAT_DEV_ASSET);
        console.warn(`Using Web Chat from ${WEB_CHAT_DEV_ASSET}`);
      }
    }

    if (appServiceExtensionHost && secret && !token) {
      userID = `dl_${random().toString(36).substr(2, 10)}`;

      const res = await fetch(`https://${appServiceExtensionHost}/.bot/v3/directline/tokens/generate`, {
        body: JSON.stringify({ User: { Id: userID } }),
        headers: {
          authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      const result = await res.json();

      secret = null;
      token = result.token;
      conversationId = result.conversationId;
    }
  }

  await Promise.all((assetURLs || []).map(url => loadAsset(url)));

  let directLine;

  if (appServiceExtensionHost) {
    let createDirectLineAppServiceExtension;

    if (typeof window.DirectLine !== 'undefined') {
      console.warn('Using DirectLineJS from the bundle of directLine.js.');
      createDirectLineAppServiceExtension = options => new window.DirectLine.DirectLineStreaming(options);
    } else if (window.WebChat && window.WebChat.createDirectLineAppServiceExtension) {
      console.warn('Using DirectLineJS from the bundle of Web Chat v4.');
      createDirectLineAppServiceExtension = options => new window.WebChat.createDirectLineAppServiceExtension(options);
    } else {
      console.warn('Using DirectLineJS from Web Chat Loader.');
      createDirectLineAppServiceExtension = options => new NPMDirectLineStreaming(options);
    }

    directLine = createDirectLineAppServiceExtension({
      conversationId,
      domain: isLocalhost(appServiceExtensionHost)
        ? `http://${appServiceExtensionHost}/.bot/v3/directline`
        : `https://${appServiceExtensionHost}/.bot/v3/directline`,
      token
    });
  } else {
    let createDirectLine;

    if (typeof window.DirectLine !== 'undefined') {
      console.warn('Using DirectLineJS from the bundle of directLine.js.');
      createDirectLine = options => new window.DirectLine.DirectLine(options);
    } else if (window.WebChat && window.WebChat.createDirectLine) {
      console.warn('Using DirectLineJS from the bundle of Web Chat v4.');
      createDirectLine = options => new window.WebChat.createDirectLine(options);
    } else if (window.BotChat && window.BotChat.DirectLine) {
      console.warn('Using DirectLineJS from the bundle of Web Chat v3.');
      createDirectLine = options => new window.BotChat.DirectLine(options);
    } else {
      console.warn('Using DirectLineJS from Web Chat Loader.');
      createDirectLine = options => new NPMDirectLine(options);
    }

    directLine = createDirectLine({
      ...(secret ? { secret } : {}),
      ...(token ? { token } : {}),
      webSocket
    });
  }

  const rootElement = document.getElementById('webchat');

  if (/^0/.test(version)) {
    rootElement.style.position = 'relative';

    window.BotChat.App(
      {
        // botConnection: {
        //   ...quirkyDirectLine,
        //   activity$: toRxJS(quirkyDirectLine.activity$),
        //   connectionStatus$: toRxJS(quirkyDirectLine.connectionStatus$)
        // },
        botConnection: directLine,
        speechOptions: {
          speechRecognizer: new CognitiveServices.SpeechRecognizer({ subscriptionKey: speechKey }),
          speechSynthesizer: new CognitiveServices.SpeechSynthesizer({
            gender: CognitiveServices.SynthesisGender.Female,
            subscriptionKey: speechKey,
            voiceName: 'Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)'
          })
        },
        user: { id: userID, name: 'You' }
      },
      rootElement
    );
  } else {
    let webSpeechPonyfillFactory;

    if (speechKey) {
      const speechOptions = {
        // speechSynthesisOutputFormat: 'audio-16khz-32kbitrate-mono-mp3'
        // speechRecognitionEndpointId: '12345678-1234-5678-abcd-12345678abcd',
        // speechSynthesisDeploymentId: '12345678-1234-5678-abcd-12345678abcd'
        // textNormalization: 'itn'
        // enableTelemetry: true
      };

      if (speechKey === '__mockbot__') {
        const { region } = await fetchMockBotSpeechServicesToken();

        webSpeechPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          ...speechOptions,
          authorizationToken: () => fetchMockBotSpeechServicesToken().then(({ token }) => token),
          region
        });
      } else {
        webSpeechPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          ...speechOptions,
          region: speechRegion || 'westus',
          subscriptionKey: speechKey
        });

        // const ponyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
        //   ...speechOptions,
        //   region: speechRegion || 'westus',
        //   subscriptionKey: speechKey
        // });

        // webSpeechPonyfillFactory = (...args) => {
        //   const {
        //     SpeechGrammarList,
        //     SpeechRecognition
        //   } = ponyfillFactory(...args);

        //   console.log({
        //     SpeechGrammarList,
        //     SpeechRecognition
        //   });

        //   return {
        //     SpeechGrammarList,
        //     SpeechRecognition
        //   };
        // };
      }
    }

    window.WebChat.renderWebChat(
      {
        // directLine: quirkyDirectLine,
        directLine,
        // selectVoice: () => ({ voiceURI: '1' }),
        sendTypingIndicator: true,
        webSpeechPonyfillFactory
      },
      rootElement
    );
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
