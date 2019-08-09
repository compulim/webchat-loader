import React, { useMemo, useState } from 'react';
import { render } from 'react-dom';

import Credential from './ui/Credential';
// import ExperimentSelector from './ui/ExperimentSelector';
import SpeechCredential from './ui/SpeechCredential';
import VersionSelector from './ui/VersionSelector';
import WebSocketToggle from './ui/WebSocketToggle';

const App = () => {
  // const [experiment, setExperiment] = useState('');
  const [secret, setSecret] = useState(localStorage.getItem('WEB_CHAT_SECRET') || '');
  const [speechKey, setSpeechKey] = useState(localStorage.getItem('SPEECH_KEY') || '');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(`r_${ Math.random().toString(36).substr(2) }`);
  const [useWebSocket, setUseWebSocket] = useState(true);
  const [version, setVersion] = useState('4.5.2');
  const searchParams = new URLSearchParams({
    // ...(experiment ? { x: experiment } : {}),
    v: version,
    ...(token ? { t: token } : { s: secret }),
    ...(speechKey ? { speechkey: speechKey } : {}),
    userid: userId,
    ws: useWebSocket + ''
  });
  const webChatURL = `webchat?${ searchParams.toString() }`;

  useMemo(() => localStorage.setItem('SPEECH_KEY', speechKey), [speechKey]);
  useMemo(() => localStorage.setItem('WEB_CHAT_SECRET', secret), [secret]);

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
        <SpeechCredential
          onSpeechKeyChange={ setSpeechKey }
          speechKey={ speechKey }
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
