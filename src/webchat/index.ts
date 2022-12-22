import 'core-js/features/promise';

import { DirectLine as NPMDirectLine, DirectLineStreaming as NPMDirectLineStreaming } from 'botframework-directlinejs';
import { fetch } from 'whatwg-fetch';
import random from 'math-random';

import createDirectLineFromTranscript from './util/createDirectLineFromTranscript';
import getDomainURL from '../common/util/getDomainURL';
import loadAsset from './util/loadAsset';

async function main() {
  const urlSearchParams = new URLSearchParams(location.search);

  const directLineDomainHost: string | undefined = urlSearchParams.get('dd') || undefined;
  const protocolAppServiceExtension: boolean = urlSearchParams.get('p') === 'ase';
  const protocolAppServiceExtensionInsecure: boolean = urlSearchParams.get('p') === 'ase-insecure';
  const protocolDirectLineSpeech: boolean = urlSearchParams.get('p') === 'dls';
  const protocolREST: boolean = urlSearchParams.get('p') === 'rest';
  const protocolTranscript: boolean = urlSearchParams.get('p') === 'blob';
  const speechAuthorizationToken: string | undefined = urlSearchParams.get('st') || undefined;
  const speechSubscriptionKey: string | undefined = urlSearchParams.get('sk') || undefined;
  const speechRegion: string | undefined = urlSearchParams.get('sr') || undefined;
  const transcriptBlobURL: string = urlSearchParams.get('blob') || '';
  let conversationId: string | undefined = urlSearchParams.get('cid') || undefined;
  let secret: string | undefined = urlSearchParams.get('ds') || undefined;
  let token: string | undefined = urlSearchParams.get('dt') || undefined;
  let userID: string | undefined = urlSearchParams.get('userid') || undefined;
  let version: string = urlSearchParams.get('v') || 'latest';

  const protocolWebSocket =
    !protocolAppServiceExtension && !protocolAppServiceExtensionInsecure && !protocolREST && !protocolTranscript;
  const domainURL = getDomainURL(
    directLineDomainHost,
    protocolAppServiceExtension
      ? 'app service extension'
      : protocolAppServiceExtensionInsecure
      ? 'app service extension insecure'
      : protocolDirectLineSpeech
      ? 'direct line speech'
      : protocolREST
      ? 'rest'
      : protocolTranscript
      ? 'transcript'
      : 'web socket'
  );
  let assetURLs;

  const WEB_CHAT_DEV_ASSET = `https://github.com/microsoft/BotFramework-WebChat/releases/download/daily/webchat-es5.js`;

  if (/^0/.test(version)) {
    assetURLs = [
      `https://unpkg.com/botframework-webchat@${version}/botchat.js`,
      `https://unpkg.com/botframework-webchat@${version}/botchat.css`,
      `https://unpkg.com/botframework-webchat@${version}/CognitiveServices.js`
    ];
    console.warn(`Using Web Chat from ${assetURLs[0]}`);
  } else if (/^4\.\d+\.\d+-/.test(version)) {
    assetURLs = [`https://unpkg.com/botframework-webchat@${version}/dist/webchat-es5.js`];
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

      const res = await fetch(new URL('directline/tokens/generate', domainURL).href, {
        body: JSON.stringify({ User: { Id: userID } }),
        headers: {
          authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      const result = await res.json();

      secret = undefined;
      token = result.token;
      conversationId = result.conversationId;
    }
  }

  await Promise.all((assetURLs || []).map(url => loadAsset(url)));

  let adapters;

  if (protocolAppServiceExtension || protocolAppServiceExtensionInsecure) {
    let createDirectLineAppServiceExtension;

    if (typeof (window as any).DirectLine !== 'undefined') {
      console.warn('Using DirectLineJS from the bundle of directLine.js.');
      createDirectLineAppServiceExtension = (options: any) =>
        new (window as any).DirectLine.DirectLineStreaming(options);
    } else if ((window as any).WebChat?.createDirectLineAppServiceExtension) {
      console.warn('Using DirectLineJS from the bundle of Web Chat v4.');
      createDirectLineAppServiceExtension = (options: any) =>
        new (window as any).WebChat.createDirectLineAppServiceExtension(options);
    } else {
      console.warn('Using DirectLineJS from Web Chat Loader.');
      createDirectLineAppServiceExtension = (options: any) => new NPMDirectLineStreaming(options);
    }

    adapters = {
      directLine: await createDirectLineAppServiceExtension({
        conversationId,
        domain: domainURL.href,
        token
      })
    };
  } else if (protocolDirectLineSpeech) {
    console.warn('Using Direct Line Speech chat adapter from the bundle of Web Chat v4.');

    adapters = await (window as any).WebChat.createDirectLineSpeechAdapters({
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

    if (typeof (window as any).DirectLine !== 'undefined') {
      console.warn('Using DirectLineJS from the bundle of directLine.js.');
      createDirectLine = (options: any) => new (window as any).DirectLine.DirectLine(options);
    } else if ((window as any).WebChat?.createDirectLine) {
      console.warn('Using DirectLineJS from the bundle of Web Chat v4.');
      createDirectLine = (options: any) => new (window as any).WebChat.createDirectLine(options);
    } else if ((window as any).BotChat?.DirectLine) {
      console.warn('Using DirectLineJS from the bundle of Web Chat v3.');
      createDirectLine = (options: any) => new (window as any).BotChat.DirectLine(options);
    } else {
      console.warn('Using DirectLineJS from Web Chat Loader.');
      createDirectLine = (options: any) => new NPMDirectLine(options);
    }

    adapters = {
      directLine: createDirectLine({
        domain: domainURL.href,
        ...(token ? { token } : secret ? { secret } : {}),
        webSocket: protocolWebSocket
      })
    };
  }

  const rootElement = document.getElementById('webchat');

  if (rootElement) {
    if (/^0/.test(version)) {
      rootElement.style.position = 'relative';

      (window as any).BotChat.App(
        {
          botConnection: adapters.directLine,
          ...(speechSubscriptionKey
            ? {
                speechOptions: {
                  speechRecognizer: new (window as any).CognitiveServices.SpeechRecognizer({
                    subscriptionKey: speechSubscriptionKey
                  }),
                  speechSynthesizer: new (window as any).CognitiveServices.SpeechSynthesizer({
                    gender: (window as any).CognitiveServices.SynthesisGender.Female,
                    subscriptionKey: speechSubscriptionKey,
                    voiceName: 'Microsoft Server Speech Text to Speech Voice (en-US, JessaRUS)'
                  })
                }
              }
            : {}),
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

          adapters.webSpeechPonyfillFactory = await (
            window as any
          ).WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
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

      (window as any).WebChat.renderWebChat(
        {
          ...adapters,
          sendTypingIndicator: true
        },
        rootElement
      );
    }
  }

  (document.querySelector('#webchat > *') as HTMLElement).focus?.();
}

main().catch(err => console.error(err));
