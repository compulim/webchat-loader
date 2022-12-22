import {
  SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING,
  SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR,
  SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY
} from '../action/setDirectLineAppServiceExtensionStatus';

import type setDirectLineAppServiceExtensionStatus from '../action/setDirectLineAppServiceExtensionStatus';

type SetDirectLineAppServiceExtensionStatusAction = ReturnType<typeof setDirectLineAppServiceExtensionStatus>;

type State = {
  reason?: string;
  status: 'checking' | 'error' | 'ready';
};

export default function directLineAppServiceExtensionStatus(
  state: State = { status: 'checking' },
  action: SetDirectLineAppServiceExtensionStatusAction
): State {
  const { type } = action;

  if (type === SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING) {
    return { status: 'checking' };
  } else if (type === SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR) {
    return { reason: action.payload.reason, status: 'error' };
  } else if (type === SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY) {
    return { reason: action.payload.reason, status: 'ready' };
  }

  return state;
}
