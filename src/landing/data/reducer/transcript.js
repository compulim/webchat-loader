import updateIn from 'simple-update-in';

import { HIDE_TRANSCRIPT_DIALOG } from '../action/hideTranscriptDialog';
import { SAVE_TRANSCRIPT_DIALOG_CONTENT } from '../action/saveTranscriptDialogContent';
import { SHOW_TRANSCRIPT_DIALOG } from '../action/showTranscriptDialog';

const DEFAULT_STATE = {
  content: '',
  visible: false
};

export default function transcript(state = DEFAULT_STATE, { payload, type }) {
  if (type === HIDE_TRANSCRIPT_DIALOG) {
    state = updateIn(state, ['visible'], () => false);
  } else if (type === SAVE_TRANSCRIPT_DIALOG_CONTENT) {
    state = updateIn(state, ['content'], () => payload.content);
  } else if (type === SHOW_TRANSCRIPT_DIALOG) {
    state = updateIn(state, ['visible'], () => true);
  }

  return state;
}
