import type { Action } from 'redux';
import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING = 'SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING';
const SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR = 'SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR';
const SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY = 'SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY';

type SetDirectLineAppServiceExtensionStatusActionChecking = Action<
  typeof SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING
>;

type SetDirectLineAppServiceExtensionStatusActionError = ActionWithPayload<
  typeof SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR,
  {
    reason: string;
  }
>;

type SetDirectLineAppServiceExtensionStatusActionReady = ActionWithPayload<
  typeof SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY,
  {
    reason: string;
  }
>;

// TypeScript seems buggy.
// When the following overload are uncommented, the ReturnType<> become Error | Ready, instead of Checking | Error | Ready.

// export default function setDirectLineAppServiceExtensionStatus(
//   status: 'checking'
// ): SetDirectLineAppServiceExtensionStatusActionChecking;

// export default function setDirectLineAppServiceExtensionStatus(
//   status: 'error' | 'ready',
//   reason: string
// ): SetDirectLineAppServiceExtensionStatusActionError | SetDirectLineAppServiceExtensionStatusActionReady;

export default function setDirectLineAppServiceExtensionStatus(
  status: 'checking' | 'error' | 'ready',
  reason?: string
):
  | SetDirectLineAppServiceExtensionStatusActionChecking
  | SetDirectLineAppServiceExtensionStatusActionError
  | SetDirectLineAppServiceExtensionStatusActionReady {
  if (status === 'error') {
    return {
      payload: {
        reason: reason as string
      },
      type: SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR
    };
  } else if (status === 'ready') {
    return {
      payload: {
        reason: reason as string
      },
      type: SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY
    };
  }

  return { type: SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING };
}

export {
  SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_CHECKING,
  SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_ERROR,
  SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS_READY
};
