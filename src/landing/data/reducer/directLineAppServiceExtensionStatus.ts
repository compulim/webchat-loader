import { SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS } from '../action/setDirectLineAppServiceExtensionStatus';

import type setDirectLineAppServiceExtensionStatus from '../action/setDirectLineAppServiceExtensionStatus';

type SetDirectLineAppServiceExtensionStatusAction = ReturnType<typeof setDirectLineAppServiceExtensionStatus>;

type State = {
  reason?: string;
  status: 'checking' | 'error' | 'ready';
};

export default function directLineAppServiceExtensionStatus(
  state: State = { status: 'checking' },
  { payload, type }: SetDirectLineAppServiceExtensionStatusAction
): State {
  if (type === SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS) {
    const { reason, status } = payload;

    if (status === 'error') {
      return { reason, status };
    } else if (status === 'ready') {
      return { reason, status };
    }

    return { status: 'checking' };
  }

  return state;
}
