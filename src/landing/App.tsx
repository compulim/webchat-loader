import { css } from 'emotion';
import classNames from 'classnames';
import React from 'react';

import BotPresets from './ui/BotPresets';
import DirectLineCredentials from './ui/DirectLineCredentials';
// import ExperimentSelector from './ui/ExperimentSelector';
import Protocol from './ui/Protocol';
import SpeechCredentials from './ui/SpeechCredentials';
import TranscriptDialog from './ui/TranscriptDialog';
import useTranscriptDialogVisible from './data/hooks/useTranscriptDialogVisible';
import VersionSelector from './ui/VersionSelector';
import WebChatLink from './ui/WebChatLink';

import type { FC } from 'react';

const ROOT_CSS = css({
  '&.app': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center'
  },

  '&.app .app__box': {
    backgroundColor: 'White',
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(0, 0, 0, .05)',
    padding: '0 20px 20px'
  },

  '& .app__build-time': {
    bottom: 5,
    color: '#ddd',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSize: '80%',
    fontWeight: 600,
    position: 'absolute',
    right: 5,
    textShadow: '1px 1px rgba(255, 255, 255, 1)',
    zIndex: -1
  }
});

const App: FC = () => {
  const [transcriptDialogVisible] = useTranscriptDialogVisible();

  return (
    <div className={classNames(ROOT_CSS + '', 'app')}>
      <div className="app__box">
        <pre
          title={[
            'Slant by Glenn Chappell 3/93 -- based on Standard',
            'Includes ISO Latin-1',
            'figlet release 2.1 -- 12 Aug 1994',
            'Permission is hereby given to modify this font, as long as the',
            "modifier's name is placed on a comment line.",
            '',
            'Modified by Paul Burton <solution@earthlink.net> 12/96 to include new parameter',
            'supported by FIGlet and FIGWin.  May also be slightly modified for better use',
            'of new full-width/kern/smush alternatives, but default output is NOT changed.'
          ].join('\n')}
        >
          &nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__
          <br />
          |&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/__&nbsp;&nbsp;/&nbsp;/_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;____/&nbsp;/_&nbsp;&nbsp;____&nbsp;_/&nbsp;/_
          <br />
          |&nbsp;|&nbsp;/|&nbsp;/&nbsp;/&nbsp;_&nbsp;\/&nbsp;__&nbsp;\&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;__&nbsp;\/&nbsp;__&nbsp;`/&nbsp;__/
          <br />
          |&nbsp;|/&nbsp;|/&nbsp;/&nbsp;&nbsp;__/&nbsp;/_/&nbsp;/&nbsp;&nbsp;/&nbsp;/___/&nbsp;/&nbsp;/&nbsp;/&nbsp;/_/&nbsp;/&nbsp;/_
          <br />
          |__/|__/\___/_.___/&nbsp;&nbsp;&nbsp;\____/_/&nbsp;/_/\__,_/\__/
          <br />
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
      <div className="app__build-time">
        {process.env.npm_package_version} (Build at {BUILD_DATE} {BUILD_TIME})
      </div>
      {transcriptDialogVisible && <TranscriptDialog />}
    </div>
  );
};

export default App;
