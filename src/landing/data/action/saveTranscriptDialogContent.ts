import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_TRANSCRIPT_DIALOG_CONTENT = 'SAVE_TRANSCRIPT_DIALOG_CONTENT';

export default function saveTranscriptDialogContent(
  content: string
): ActionWithPayload<typeof SAVE_TRANSCRIPT_DIALOG_CONTENT, { content: string }> {
  return {
    payload: { content },
    type: SAVE_TRANSCRIPT_DIALOG_CONTENT
  };
}

export { SAVE_TRANSCRIPT_DIALOG_CONTENT };
