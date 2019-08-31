import React from 'react';

import BotPresets from './ui/BotPresets';
import DirectLineCredentials from './ui/DirectLineCredentials';
// import ExperimentSelector from './ui/ExperimentSelector';
import Protocol from './ui/Protocol';
import SpeechCredentials from './ui/SpeechCredentials';
import VersionSelector from './ui/VersionSelector';
import WebChatLink from './ui/WebChatLink';

import generateUserId from './util/generateUserId';
import useStateWithLocalStorage from './util/useStateWithLocalStorage';

const App = () => {
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
        <VersionSelector />
        <BotPresets />
        <Protocol />
        <DirectLineCredentials />
        <SpeechCredentials />
        {/* <ExperimentSelector
          onChange={ setExperiment }
          value={ experiment }
        /> */}
        <section className="row" style={{ marginBottom: 0 }}>
          <WebChatLink />
        </section>
      </div>
    </div>
  );
};

export default App
