import type { Action } from 'redux';

const SHOW_TRANSCRIPT_DIALOG = 'SHOW_TRANSCRIPT_DIALOG';

export default function showTranscriptDialog(): Action<typeof SHOW_TRANSCRIPT_DIALOG> {
  return { type: SHOW_TRANSCRIPT_DIALOG };
}

export { SHOW_TRANSCRIPT_DIALOG };
