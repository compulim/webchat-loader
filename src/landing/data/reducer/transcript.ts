import updateIn from 'simple-update-in';

import { SAVE_TRANSCRIPT_DIALOG_CONTENT } from '../action/saveTranscriptDialogContent';

import type saveTranscriptDialogContent from '../action/saveTranscriptDialogContent';

type SaveTranscriptDialogContentAction = ReturnType<typeof saveTranscriptDialogContent>;

type TranscriptAction = SaveTranscriptDialogContentAction;

type State = {
  content: string;
};

const DEFAULT_STATE: State = {
  content: ''
};

export default function transcript(state: State = DEFAULT_STATE, action: TranscriptAction): State {
  const { type } = action;

  if (type === SAVE_TRANSCRIPT_DIALOG_CONTENT) {
    state = updateIn(state, ['content'], () => action.payload.content);
  }

  return state;
}
