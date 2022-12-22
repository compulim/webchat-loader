import { SET_PROTOCOL_APP_SERVICE_EXTENSION } from '../action/setProtocolAppServiceExtension';
import { SET_PROTOCOL_APP_SERVICE_EXTENSION_INSECURE } from '../action/setProtocolAppServiceExtensionInsecure';
import { SET_PROTOCOL_DIRECT_LINE_SPEECH } from '../action/setProtocolDirectLineSpeech';
import { SET_PROTOCOL_REST } from '../action/setProtocolREST';
import { SET_PROTOCOL_TRANSCRIPT } from '../action/setProtocolTranscript';
import { SET_PROTOCOL_WEB_SOCKET } from '../action/setProtocolWebSocket';

import type setProtocolAppServiceExtension from '../action/setProtocolAppServiceExtension';
import type setProtocolAppServiceExtensionInsecure from '../action/setProtocolAppServiceExtensionInsecure';
import type setProtocolDirectLineSpeech from '../action/setProtocolDirectLineSpeech';
import type setProtocolREST from '../action/setProtocolREST';
import type setProtocolTranscript from '../action/setProtocolTranscript';
import type setProtocolWebSocket from '../action/setProtocolWebSocket';

type SetProtocolAppServiceExtensionAction = ReturnType<typeof setProtocolAppServiceExtension>;
type SetProtocolAppServiceExtensionInsecureAction = ReturnType<typeof setProtocolAppServiceExtensionInsecure>;
type SetProtocolDirectLineSpeechAction = ReturnType<typeof setProtocolDirectLineSpeech>;
type SetProtocolRESTAction = ReturnType<typeof setProtocolREST>;
type SetProtocolTranscriptAction = ReturnType<typeof setProtocolTranscript>;
type SetProtocolWebSocketAction = ReturnType<typeof setProtocolWebSocket>;

type ProtocolAction =
  | SetProtocolAppServiceExtensionAction
  | SetProtocolAppServiceExtensionInsecureAction
  | SetProtocolDirectLineSpeechAction
  | SetProtocolRESTAction
  | SetProtocolTranscriptAction
  | SetProtocolWebSocketAction;

type State =
  | 'app service extension insecure'
  | 'app service extension'
  | 'direct line speech'
  | 'rest'
  | 'transcript'
  | 'web socket';

export default function protocol(state: State = 'web socket', { type }: ProtocolAction): State {
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
