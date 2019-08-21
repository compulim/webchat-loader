import { DirectLine } from 'botframework-directlinejs';
import updateIn from 'simple-update-in';

import fetchMockBotSpeechServicesToken from './util/fetchMockBotSpeechServicesToken';
import loadAsset from './util/loadAsset';
import passThrough from './util/passThrough';
import toRxJS from './util/toRxJS';

async function main() {
  const urlSearchParams = new URLSearchParams(location.search);
  let version = urlSearchParams.get('v');
  const experiment = urlSearchParams.get('x') || 'noop';
  const secret = urlSearchParams.get('s');
  const speechKey = urlSearchParams.get('speechkey');
  const speechRegion = urlSearchParams.get('speechregion');
  const token = urlSearchParams.get('t');
  const userID = urlSearchParams.get('userid');
  const webSocket = urlSearchParams.get('ws') !== 'false';

  let assetURLs;

  if (version === 'localhost') {
    assetURLs = [`http://localhost:5000/webchat.js?_=${ Date.now() }`];
  } else if (/^4/.test(version)) {
    assetURLs = [`https://cdn.botframework.com/botframework-webchat/${ version }/webchat.js`];
  } else {
    assetURLs = [
      `https://unpkg.com/botframework-webchat@${ version }/botchat.js`,
      `https://unpkg.com/botframework-webchat@${ version }/botchat.css`,
      `https://unpkg.com/botframework-webchat@${ version }/CognitiveServices.js`,
    ];
  }

  if (!assetURLs) {
    assetURLs = VERSIONS['4.4'];
    version = '4.4';
  }

  await Promise.all(assetURLs.map(url => loadAsset(url)));

  const directLine = new DirectLine({ secret, token, webSocket });
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

    if (speechKey === '__mockbot__') {
      const { region } = await fetchMockBotSpeechServicesToken();

      webSpeechPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
        authorizationToken: () => fetchMockBotSpeechServicesToken().then(({ token }) => token),
        region
      });
    } else if (speechKey) {
      webSpeechPonyfillFactory = await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
        region: speechRegion || 'westus',
        subscriptionKey: speechKey
      });
    }

    window.WebChat.renderWebChat({
      directLine: quirkyDirectLine,
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
