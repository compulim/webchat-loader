import type { Action } from 'redux';

const SET_PROTOCOL_TRANSCRIPT = 'SET_PROTOCOL_TRANSCRIPT';

export default function setProtocolTranscript(): Action<typeof SET_PROTOCOL_TRANSCRIPT> {
  return { type: SET_PROTOCOL_TRANSCRIPT };
}

export { SET_PROTOCOL_TRANSCRIPT };
