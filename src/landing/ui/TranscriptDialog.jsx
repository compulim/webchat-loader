import { css, cx } from 'emotion';
import React, { useCallback, useMemo, useState } from 'react';

import useTranscriptDialogContent from '../data/hooks/useTranscriptDialogContent';
import useTranscriptDialogVisible from '../data/hooks/useTranscriptDialogVisible';

const DIALOG_CSS = css({
  '&.transcript-dialog': {
    backgroundColor: 'White',
    borderRadius: 4,
    boxShadow: '0 0 10px rgba(0, 0, 0, .05)',
    bottom: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    left: 20,
    position: 'fixed',
    right: 20,
    top: 20,

    '& .transcript-dialog__button-bar': {
      padding: 5
    },

    '& .transcript-dialog__body': {
      height: '100%',
      overflow: 'scrolling',
      width: '100%'
    },

    '& .transcript-dialog__text-area': {
      backgroundColor: 'Transparent',
      border: 0,
      boxSizing: 'border-box',
      flex: 1,
      fontFamily: 'Cascadia Code, Consolas, monospace',
      height: '100%',
      outline: 0,
      padding: 5,
      resize: 'none',
      width: '100%'
    },

    '& .transcript-dialog__text-area--invalid': {
      color: 'Red'
    }
  }
});

const NOW = Date.now();

const SAMPLE_TRANSCRIPT = [
  {
    id: 'a-00001',
    text: 'What can I do for you?',
    timestamp: new Date(NOW - 120000).toISOString(),
    type: 'message',
    attachments: [
      {
        content: {
          type: 'AdaptiveCard',
          body: [
            {
              type: 'TextBlock',
              text: 'You can choose one of the followings.'
            }
          ],
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          version: '1.2',
          actions: [
            {
              type: 'Action.Submit',
              title: 'What time is it?'
            },
            {
              type: 'Action.Submit',
              title: 'What is the weather?'
            }
          ]
        },
        contentType: 'application/vnd.microsoft.card.adaptive'
      }
    ]
  },
  {
    from: {
      role: 'user'
    },
    id: 'a-00002',
    text: 'What time is it?',
    timestamp: new Date(NOW - 60000).toISOString(),
    type: 'message'
  },
  {
    id: 'a-00003',
    text: `It's ${new Date(NOW).toLocaleTimeString()}.`,
    timestamp: new Date(NOW).toISOString(),
    type: 'message'
  }
];

function parseTranscript(value) {
  try {
    const parsedTranscript = JSON.parse(value);

    if (Array.isArray(parsedTranscript)) {
      return parsedTranscript;
    }
  } catch (err) {}

  return false;
}

const TranscriptDialog = () => {
  const [savedContent, setSavedContent] = useTranscriptDialogContent();
  const [, setVisible] = useTranscriptDialogVisible();

  const [editedContent, setEditedContent] = useState(() => {
    const transcript = parseTranscript(savedContent);

    return transcript && transcript.length ? JSON.stringify(transcript, null, 2) + '\n' : '';
  });

  const handleLoadSampleButtonClick = useCallback(
    () => setEditedContent(JSON.stringify(SAMPLE_TRANSCRIPT, null, 2) + '\n'),
    [setEditedContent]
  );

  const handleSaveButtonClick = useCallback(() => {
    if (editedContent) {
      const transcript = parseTranscript(editedContent);

      if (!transcript) {
        return;
      }

      setSavedContent(transcript.length ? JSON.stringify(transcript, null, 2) : '');
      setVisible(false);
    } else {
      setSavedContent('');
      setVisible(false);
    }
  }, [editedContent, setSavedContent, setVisible]);
  const handleTextAreaChange = useCallback(({ target: { value } }) => setEditedContent(value), [setEditedContent]);

  const handleTextAreaKeyDown = useCallback(
    event => {
      const { ctrlKey, key } = event;

      if (ctrlKey && (key === 'S' || key === 's')) {
        event.preventDefault();

        handleSaveButtonClick();
      } else if (key === 'Escape') {
        event.preventDefault();

        setVisible(false);
      }
    },
    [handleSaveButtonClick, setVisible]
  );

  const isValid = useMemo(() => {
    if (!editedContent) {
      return true;
    }

    return !!parseTranscript(editedContent);
  }, [editedContent]);

  return (
    <div className={cx(DIALOG_CSS, 'transcript-dialog')}>
      <div className="transcript-dialog__button-bar">
        <button disabled={!isValid} onClick={handleSaveButtonClick} type="button">
          Save (CTRL+S)
        </button>
        &nbsp;
        <button disabled={!!editedContent} onClick={handleLoadSampleButtonClick} type="button">
          Load sample
        </button>
      </div>
      <div className="transcript-dialog__body">
        <textarea
          autoFocus={true}
          className={cx('transcript-dialog__text-area', { 'transcript-dialog__text-area--invalid': !isValid })}
          onChange={handleTextAreaChange}
          onKeyDown={handleTextAreaKeyDown}
          placeholder={`Please paste transcript in JSON format.\n\n${JSON.stringify(SAMPLE_TRANSCRIPT, null, 2)}`}
          spellCheck={false}
          title="Transcript in JSON format"
          value={editedContent}
        />
      </div>
    </div>
  );
};

export default TranscriptDialog;
