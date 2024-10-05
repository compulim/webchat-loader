import './TranscriptDialog.css';

import classNames from 'classnames';
import { LoremIpsum } from 'lorem-ipsum';
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler
} from 'react';

import useTranscriptDialogContent from '../data/hooks/useTranscriptDialogContent';
import useTranscriptDialogVisible from '../data/hooks/useTranscriptDialogVisible';
import preChatMessageWithStarterPrompts from '../sample/preChatMessageWithStarterPrompts';
import transcript1 from '../sample/transcript1';
import transcript2 from '../sample/transcript2';
import transcript3 from '../sample/transcript3';
import transcript4 from '../sample/transcript4';
import transcript5 from '../sample/transcript5';
import transcript6 from '../sample/transcript6';
import parseChatHistoryFromHARFile from '../util/parseChatHistoryFromHARFile';
import FileUploadButton from './FileUploadButton';

const GENERATE_COUNT = 50;

const SAMPLE_TRANSCRIPT_JSON = JSON.stringify(transcript1, null, 2);
const SAMPLE_TRANSCRIPT_JSON_2 = JSON.stringify(transcript2, null, 2);
const SAMPLE_TRANSCRIPT_JSON_3 = JSON.stringify(transcript3, null, 2);
const SAMPLE_TRANSCRIPT_JSON_4 = JSON.stringify(transcript4, null, 2);
const SAMPLE_TRANSCRIPT_JSON_5 = JSON.stringify(transcript5, null, 2);
const SAMPLE_TRANSCRIPT_JSON_6 = JSON.stringify(transcript6, null, 2);
const SAMPLE_STARTER_PROMPTS = JSON.stringify(preChatMessageWithStarterPrompts, null, 2);

function parseTranscript(value: string): false | [] {
  try {
    const parsedTranscript = JSON.parse(value) as [];

    if (Array.isArray(parsedTranscript)) {
      return parsedTranscript;
    }
  } catch (err) {}

  return false;
}

const TranscriptDialog = memo(() => {
  const abortController = useMemo(() => new AbortController(), []);
  const [forceEnableLoadButton, setForceEnableLoadButton] = useState(false);
  const [savedContent, setSavedContent] = useTranscriptDialogContent();
  const [, setVisible] = useTranscriptDialogVisible();

  const [editedContent, setEditedContent] = useState(() => {
    const transcript = parseTranscript(savedContent);

    return transcript && transcript.length ? JSON.stringify(transcript, null, 2) + '\n' : '';
  });

  const handleGenerateClick = useCallback<MouseEventHandler>(
    event => {
      const count =
        (event.shiftKey && +(prompt('How many messages do you want to generate?', '50') || 0)) || GENERATE_COUNT;
      const loremIpsum = new LoremIpsum();
      const nextEditedContent = [];
      let timestamp = new Date();

      for (let i = 0; i < count; i++) {
        nextEditedContent.unshift({
          from: {
            role: i % 2 ? 'bot' : 'user'
            // role: 'bot'
          },
          id: `a-${count - i}`,
          text: `${count - i}: ${loremIpsum.generateParagraphs(1)}`,
          timestamp: timestamp.toISOString(),
          type: 'message'
        });

        timestamp.setUTCSeconds(timestamp.getUTCSeconds() - 301);
      }

      setEditedContent(JSON.stringify(nextEditedContent, null, 2));
    },
    [setEditedContent]
  );

  const handleUploadHARFile = useCallback<(content: ArrayBuffer | null | string) => void>(
    content => {
      (async function () {
        if (typeof content === 'string') {
          const chatHistory = await Array.fromAsync(parseChatHistoryFromHARFile(content));

          abortController.signal.aborted ||
            setEditedContent(chatHistory ? JSON.stringify(chatHistory || [], null, 2) : '');
        }
      })();
    },
    [abortController]
  );

  const handleLoadSampleButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON + '\n'),
    [setEditedContent]
  );

  const handleLoadSample2ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_2 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample3ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_3 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample4ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_4 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample5ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_5 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample6ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_TRANSCRIPT_JSON_6 + '\n'),
    [setEditedContent]
  );

  const handleLoadSample7ButtonClick = useCallback<MouseEventHandler>(
    () => setEditedContent(SAMPLE_STARTER_PROMPTS + '\n'),
    [setEditedContent]
  );

  const handleSaveButtonClick = useCallback<() => void>(() => {
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

  const handleTextAreaChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    ({ target: { value } }) => setEditedContent(value),
    [setEditedContent]
  );

  const handleTextAreaKeyDown = useCallback<KeyboardEventHandler>(
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

  useEffect(() => {
    const handleKeyUpDown = (event: KeyboardEvent) =>
      event.key === 'Control' && setForceEnableLoadButton(event.type !== 'keyup');

    window.addEventListener('keydown', handleKeyUpDown, { capture: true });
    window.addEventListener('keyup', handleKeyUpDown, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyUpDown);
      window.removeEventListener('keyup', handleKeyUpDown);
    };
  }, []);

  useEffect(() => () => abortController.abort(), [abortController]);

  const disableLoadButton = !forceEnableLoadButton && !!editedContent;

  return (
    <div className="transcript-dialog">
      <div className="transcript-dialog__button-bar">
        <button disabled={!isValid} onClick={handleSaveButtonClick} type="button">
          Save (CTRL+S)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSampleButtonClick} type="button">
          Load sample
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSample2ButtonClick} type="button">
          Load sample 2 (Citation)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSample3ButtonClick} type="button">
          Load sample 3 (VoteAction)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSample4ButtonClick} type="button">
          Load sample 4 (CSAT v1)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSample5ButtonClick} type="button">
          Load sample 5 (CSAT v2)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSample6ButtonClick} type="button">
          Load sample 6 (Citation v2)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleLoadSample7ButtonClick} type="button">
          Load sample 7 (Starter prompts)
        </button>
        &nbsp;
        <button disabled={disableLoadButton} onClick={handleGenerateClick} type="button">
          Generate lorem ipsum
        </button>
        &nbsp;
        <FileUploadButton onUpload={handleUploadHARFile}>Upload HAR file</FileUploadButton>
      </div>
      <div className="transcript-dialog__body">
        <textarea
          autoFocus={true}
          className={classNames('transcript-dialog__text-area', { 'transcript-dialog__text-area--invalid': !isValid })}
          onChange={handleTextAreaChange}
          onKeyDown={handleTextAreaKeyDown}
          placeholder={`Please paste transcript in JSON format.\n\n${SAMPLE_TRANSCRIPT_JSON}`}
          spellCheck={false}
          title="Transcript in JSON format"
          value={editedContent}
        />
      </div>
    </div>
  );
});

TranscriptDialog.displayName='TranscriptDialog';

export default TranscriptDialog;
