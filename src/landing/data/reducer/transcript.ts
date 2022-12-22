import updateIn from 'simple-update-in';

import { HIDE_TRANSCRIPT_DIALOG } from '../action/hideTranscriptDialog';
import { SAVE_TRANSCRIPT_DIALOG_CONTENT } from '../action/saveTranscriptDialogContent';
import { SHOW_TRANSCRIPT_DIALOG } from '../action/showTranscriptDialog';

import type hideTranscriptDialog from '../action/hideTranscriptDialog';
import type saveTranscriptDialogContent from '../action/saveTranscriptDialogContent';
import type showTranscriptDialog from '../action/showTranscriptDialog';

type HideTranscriptDialogAction = ReturnType<typeof hideTranscriptDialog>;
type SaveTranscriptDialogContentAction = ReturnType<typeof saveTranscriptDialogContent>;
type ShowTranscriptDialogAction = ReturnType<typeof showTranscriptDialog>;

type TranscriptAction = HideTranscriptDialogAction | SaveTranscriptDialogContentAction | ShowTranscriptDialogAction;

type State = {
  content: string;
  visible: boolean;
};

const DEFAULT_STATE: State = {
  content: '',
  visible: false
};

export default function transcript(state: State = DEFAULT_STATE, action: TranscriptAction): State {
  const { type } = action;

  if (type === HIDE_TRANSCRIPT_DIALOG) {
    state = updateIn(state, ['visible'], () => false);
  } else if (type === SAVE_TRANSCRIPT_DIALOG_CONTENT) {
    state = updateIn(state, ['content'], () => action.payload.content);
  } else if (type === SHOW_TRANSCRIPT_DIALOG) {
    state = updateIn(state, ['visible'], () => true);
  }

  return state;
}
