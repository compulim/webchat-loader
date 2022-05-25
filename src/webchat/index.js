import 'core-js/features/promise';
import 'core-js/features/string/starts-with';
import 'core-js/features/url-search-params';
import 'regenerator-runtime';

import { DirectLine as NPMDirectLine, DirectLineStreaming as NPMDirectLineStreaming } from 'botframework-directlinejs';
import { fetch } from 'whatwg-fetch';
import random from 'math-random';

import createDirectLineFromTranscript from './util/createDirectLineFromTranscript';
import isLocalhost from './util/isLocalhost';
import loadAsset from './util/loadAsset';

async function main() {
  const urlSearchParams = new URLSearchParams(location.search);

  const directLineDomainHost = urlSearchParams.get('dd');
  const protocolAppServiceExtension = urlSearchParams.get('p') === 'ase';
  const protocolDirectLineSpeech = urlSearchParams.get('p') === 'dls';
  const protocolREST = urlSearchParams.get('p') === 'rest';
  const protocolTranscript = urlSearchParams.get('p') === 'blob';
  const speechAuthorizationToken = urlSearchParams.get('st');
  const speechSubscriptionKey = urlSearchParams.get('sk');
  const speechRegion = urlSearchParams.get('sr');
  const transcriptBlobURL = urlSearchParams.get('blob');
  let conversationId = urlSearchParams.get('cid');
  let secret = urlSearchParams.get('ds');
  let token = urlSearchParams.get('dt');
  let userID = urlSearchParams.get('userid');
  let version = urlSearchParams.get('v') || 'latest';

  const protocolWebSocket = !protocolAppServiceExtension && !protocolREST && !protocolTranscript;
  const domain = directLineDomainHost
    ? isLocalhost(directLineDomainHost)
      ? `http://${directLineDomainHost}${protocolAppServiceExtension ? '/.bot' : ''}/v3/directline`
      : `https://${directLineDomainHost}${protocolAppServiceExtension ? '/.bot' : ''}/v3/directline`
    : undefined;

  let assetURLs;

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
    assetURLs = [WEB_CHAT_DEV_ASSET];
    console.warn(`Using Web Chat from ${WEB_CHAT_DEV_ASSET}`);
  } else {
    try {
      const url = `${version}directline.js`;

      await loadAsset(`${url}?_=${Date.now()}`);
      console.warn(`Using DirectLineJS from ${url}`);
    } catch (err) {
      try {
        const url = `${version}directLine.js`;

        await loadAsset(`${url}?_=${Date.now()}`);
        console.warn(`Using DirectLineJS from ${url}`);
      } catch (err) {}
    }

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

    if (directLineDomainHost && secret && !token) {
      userID = `dl_${random().toString(36).substr(2, 10)}`;

      const res = await fetch(`https://${directLineDomainHost}/.bot/v3/directline/tokens/generate`, {
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

  let adapters;

  if (protocolAppServiceExtension) {
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

    adapters = {
      directLine: await createDirectLineAppServiceExtension({
        conversationId,
        domain,
        token
      })
    };
  } else if (protocolDirectLineSpeech) {
    console.warn('Using Direct Line Speech chat adapter from the bundle of Web Chat v4.');

    adapters = await window.WebChat.createDirectLineSpeechAdapters({
      fetchCredentials: speechAuthorizationToken
        ? {
            authorizationToken: speechAuthorizationToken,
            region: speechRegion
          }
        : {
            region: speechRegion,
            subscriptionKey: speechSubscriptionKey
          }
    });
  } else if (protocolTranscript) {
    console.warn(`Using transcript from ${transcriptBlobURL}.`);

    let transcript = [];

    try {
      const res = await fetch(transcriptBlobURL);

      if (!res.ok) {
        throw new Error('Failed to load transcript from browser memory.');
      }

      transcript = await res.json();
    } catch (err) {}

    adapters = {
      directLine: createDirectLineFromTranscript(transcript)
    };
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

    adapters = {
      directLine: createDirectLine({
        domain,
        ...(token ? { token } : secret ? { secret } : {}),
        webSocket: protocolWebSocket
      })
    };
  }

  const rootElement = document.getElementById('webchat');

  if (/^0/.test(version)) {
    rootElement.style.position = 'relative';

    window.BotChat.App(
      {
        botConnection: adapters.directLine,
        speechOptions: {
          speechRecognizer: new CognitiveServices.SpeechRecognizer({ subscriptionKey: speechSubscriptionKey }),
          speechSynthesizer: new CognitiveServices.SpeechSynthesizer({
            gender: CognitiveServices.SynthesisGender.Female,
            subscriptionKey: speechSubscriptionKey,
            voiceName: 'Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)'
          })
        },
        user: { id: userID, name: 'You' }
      },
      rootElement
    );
  } else {
    if (!protocolDirectLineSpeech) {
      if (speechAuthorizationToken || speechSubscriptionKey) {
        const speechOptions = {
          // speechSynthesisOutputFormat: 'audio-16khz-32kbitrate-mono-mp3'
          // speechRecognitionEndpointId: '12345678-1234-5678-abcd-12345678abcd',
          // speechSynthesisDeploymentId: '12345678-1234-5678-abcd-12345678abcd'
          // textNormalization: 'itn'
          // enableTelemetry: true
        };

        adapters.webSpeechPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
          ...speechOptions,
          credentials: () => ({
            region: speechRegion,
            ...(speechAuthorizationToken
              ? { authorizationToken: speechAuthorizationToken }
              : { subscriptionKey: speechSubscriptionKey })
          })
        });
      }
    }

    window.WebChat.renderWebChat(
      {
        ...adapters,
        sendTypingIndicator: true
      },
      rootElement
    );
  }

  document.querySelector('#webchat > *').focus();
}

main().catch(err => console.error(err));
