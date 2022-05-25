const SAVE_TRANSCRIPT_DIALOG_CONTENT = 'SAVE_TRANSCRIPT_DIALOG_CONTENT';

export default function saveTranscriptDialogContent(content) {
  return {
    payload: { content },
    type: SAVE_TRANSCRIPT_DIALOG_CONTENT
  };
}

export { SAVE_TRANSCRIPT_DIALOG_CONTENT };
