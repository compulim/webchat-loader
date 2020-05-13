import { SET_PROTOCOL_APP_SERVICE_EXTENSION } from '../action/setProtocolAppServiceExtension';
import { SET_PROTOCOL_REST } from '../action/setProtocolREST';
import { SET_PROTOCOL_WEB_SOCKET } from '../action/setProtocolWebSocket';

export default function protocol(state = 'web socket', { type }) {
  if (type === SET_PROTOCOL_APP_SERVICE_EXTENSION) {
    state = 'app service extension';
  } else if (type === SET_PROTOCOL_REST) {
    state = 'rest';
  } else if (type === SET_PROTOCOL_WEB_SOCKET) {
    state = 'web socket';
  }

  return state;
}
