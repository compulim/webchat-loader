import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS = 'SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS';

type SetDirectLineAppServiceExtensionStatusActionChecking = ActionWithPayload<
  typeof SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS,
  {
    status: 'checking';
  }
>;

type SetDirectLineAppServiceExtensionStatusActionErrorOrReady = ActionWithPayload<
  typeof SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS,
  {
    reason: string;
    status: 'error' | 'ready';
  }
>;

type SetDirectLineAppServiceExtensionStatusAction =
  | SetDirectLineAppServiceExtensionStatusActionChecking
  | SetDirectLineAppServiceExtensionStatusActionErrorOrReady;

export default function setDirectLineAppServiceExtensionStatus(
  status: 'checking'
): SetDirectLineAppServiceExtensionStatusActionChecking;

export default function setDirectLineAppServiceExtensionStatus(
  status: 'error' | 'ready',
  reason: string
): SetDirectLineAppServiceExtensionStatusActionErrorOrReady;

export default function setDirectLineAppServiceExtensionStatus(
  status: 'checking' | 'error' | 'ready',
  reason?: string
): SetDirectLineAppServiceExtensionStatusAction {
  if (status === 'error' || status === 'ready') {
    return {
      payload: {
        reason: reason as string,
        status
      },
      type: SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS
    };
  }

  return {
    payload: {
      status: 'checking'
    },
    type: SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS
  };
}

export { SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS };
