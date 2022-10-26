import { SET_PROTOCOL_APP_SERVICE_EXTENSION } from '../action/setProtocolAppServiceExtension';
import { SET_PROTOCOL_APP_SERVICE_EXTENSION_INSECURE } from '../action/setProtocolAppServiceExtensionInsecure';
import { SET_PROTOCOL_DIRECT_LINE_SPEECH } from '../action/setProtocolDirectLineSpeech';
import { SET_PROTOCOL_REST } from '../action/setProtocolREST';
import { SET_PROTOCOL_TRANSCRIPT } from '../action/setProtocolTranscript';
import { SET_PROTOCOL_WEB_SOCKET } from '../action/setProtocolWebSocket';

export default function protocol(state = 'web socket', { type }) {
  if (type === SET_PROTOCOL_APP_SERVICE_EXTENSION) {
    state = 'app service extension';
  } else if (type === SET_PROTOCOL_APP_SERVICE_EXTENSION_INSECURE) {
    state = 'app service extension insecure';
  } else if (type === SET_PROTOCOL_DIRECT_LINE_SPEECH) {
    state = 'direct line speech';
  } else if (type === SET_PROTOCOL_REST) {
    state = 'rest';
  } else if (type === SET_PROTOCOL_TRANSCRIPT) {
    state = 'transcript';
  } else if (type === SET_PROTOCOL_WEB_SOCKET) {
    state = 'web socket';
  }

  return state;
}
