import type { Action } from 'redux';

const SET_PROTOCOL_WEB_SOCKET = 'SET_PROTOCOL_WEB_SOCKET';

export default function setProtocolWebSocket(): Action<typeof SET_PROTOCOL_WEB_SOCKET> {
  return { type: SET_PROTOCOL_WEB_SOCKET };
}

export { SET_PROTOCOL_WEB_SOCKET };
