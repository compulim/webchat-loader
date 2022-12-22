import type { Action } from 'redux';

const HIDE_TRANSCRIPT_DIALOG = 'HIDE_TRANSCRIPT_DIALOG';

export default function hideTranscriptDialog(): Action<typeof HIDE_TRANSCRIPT_DIALOG> {
  return { type: HIDE_TRANSCRIPT_DIALOG };
}

export { HIDE_TRANSCRIPT_DIALOG };
