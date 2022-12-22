import type { Action } from 'redux';

const SET_PROTOCOL_DIRECT_LINE_SPEECH = 'SET_PROTOCOL_DIRECT_LINE_SPEECH';

export default function setProtocolDirectLineSpeech(): Action<typeof SET_PROTOCOL_DIRECT_LINE_SPEECH> {
  return { type: SET_PROTOCOL_DIRECT_LINE_SPEECH };
}

export { SET_PROTOCOL_DIRECT_LINE_SPEECH };
