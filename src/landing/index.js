import { render } from 'react-dom';
import React, { useMemo, useState } from 'react';

import Credential from './ui/Credential';
// import ExperimentSelector from './ui/ExperimentSelector';
import SpeechCredential from './ui/SpeechCredential';
import StreamingExtensionToggle from './ui/StreamingExtension';
import VersionSelector from './ui/VersionSelector';
import WebSocketToggle from './ui/WebSocketToggle';

import generateUserId from './util/generateUserId';
import useStateWithLocalStorage from './util/useStateWithLocalStorage';

const App = () => {
  // const [experiment, setExperiment] = useState('');
  const [secret, setSecret] = useStateWithLocalStorage('', 'WEB_CHAT_SECRET');
  const [speechKey, setSpeechKey] = useStateWithLocalStorage('', 'SPEECH_KEY');
  const [speechRegion, setSpeechRegion] = useStateWithLocalStorage('westus', 'SPEECH_REGION');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(generateUserId(false));
  const [useStreamingExtension, setUseStreamingExtension] = useStateWithLocalStorage(true, 'USE_STREAMING_EXTENSION');
  const [useWebSocket, setUseWebSocket] = useStateWithLocalStorage(true, 'USE_WEB_SOCKET');
  const [version, setVersion] = useState('4.5.2');
  const searchParams = useMemo(() => new URLSearchParams({
    // ...(experiment ? { x: experiment } : {}),
    v: version,
    ...(token ? { t: token } : { s: secret }),
    ...(speechKey ? { speechkey: speechKey } : {}),
    ...(speechRegion ? { speechregion: speechRegion } : {}),
    userid: useStreamingExtension ? generateUserId(true) : userId,
    ws: useWebSocket + '',
    ...(useStreamingExtension ? { se: 'webchat-mockbot-se.azurewebsites.net' } : {})
  }), [
    secret,
    speechKey,
    speechRegion,
    token,
    userId,
    useWebSocket,
    version
  ]);
  const webChatURL = `webchat?${ searchParams.toString() }`;

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <div style={{
        backgroundColor: 'White',
        border: 'solid 1px #DDD',
        padding: '0 20px 20px'
      }}>
        <pre
          title={ [
            'Slant by Glenn Chappell 3/93 -- based on Standard',
            'Includes ISO Latin-1',
            'figlet release 2.1 -- 12 Aug 1994',
            'Permission is hereby given to modify this font, as long as the',
            'modifier\'s name is placed on a comment line.',
            '',
            'Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter',
            'supported by FIGlet and FIGWin.  May also be slightly modified for better use',
            'of new full-width/kern/smush alternatives, but default output is NOT changed.'
          ].join('\n') }
        >&nbsp;_       __     __       ________          __<br />
          | |     / /__  / /_     / ____/ /_  ____ _/ /_<br />
          | | /| / / _ \/ __ \   / /   / __ \/ __ `/ __/<br />
          | |/ |/ /  __/ /_/ /  / /___/ / / / /_/ / /_<br />
          |__/|__/\___/_.___/   \____/_/ /_/\__,_/\__/<br />
        </pre>
        <VersionSelector
          onChange={ setVersion }
          value={ version }
        />
        <Credential
          onSecretChange={ setSecret }
          onTokenChange={ setToken }
          onUserIdChange={ setUserId }
          secret={ secret }
          token={ token }
          userId={ userId }
        />
        <WebSocketToggle
          onChange={ setUseWebSocket }
          value={ useWebSocket }
        />
        <StreamingExtensionToggle
          disabled={ !useWebSocket }
          onChange={ setUseStreamingExtension }
          value={ useStreamingExtension }
        />
        <SpeechCredential
          onSpeechKeyChange={ setSpeechKey }
          onSpeechRegionChange={ setSpeechRegion }
          speechKey={ speechKey }
          speechRegion={ speechRegion }
        />
        {/* <ExperimentSelector
          onChange={ setExperiment }
          value={ experiment }
        /> */}
        <section className="row" style={{ marginBottom: 0 }}>
          <a
            href={ webChatURL }
            target="_blank"
          >
            Open Web Chat in a new window
          </a>
        </section>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
