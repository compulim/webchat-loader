import type { Action } from 'redux';

const SET_PROTOCOL_APP_SERVICE_EXTENSION = 'SET_PROTOCOL_APP_SERVICE_EXTENSION';

export default function setProtocolAppServiceExtension(): Action<typeof SET_PROTOCOL_APP_SERVICE_EXTENSION> {
  return { type: SET_PROTOCOL_APP_SERVICE_EXTENSION };
}

export { SET_PROTOCOL_APP_SERVICE_EXTENSION };
