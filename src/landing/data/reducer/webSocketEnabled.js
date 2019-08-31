import { DISABLE_WEB_SOCKET } from '../action/disableWebSocket';
import { ENABLE_WEB_SOCKET } from '../action/enableWebSocket';

export default function webSocketEnabled(state = true, { type }) {
  if (type === DISABLE_WEB_SOCKET) {
    state = false;
  } else if (type === ENABLE_WEB_SOCKET) {
    state = true;
  }

  return state;
}
