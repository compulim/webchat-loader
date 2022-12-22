import type { Action } from 'redux';

const SET_PROTOCOL_REST = 'SET_PROTOCOL_REST';

export default function setProtocolREST(): Action<typeof SET_PROTOCOL_REST> {
  return { type: SET_PROTOCOL_REST };
}

export { SET_PROTOCOL_REST };
