import { SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS } from '../action/setDirectLineAppServiceExtensionStatus';

export default function directLineAppServiceExtensionStatus(
  state = { status: 'checking' },
  { payload, type }
) {
  if (type === SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS) {
    const { reason, status } = payload;

    if (status === 'error') {
      return { reason, status };
    } else if (status === 'ready') {
      return { status };
    }

    return { status: 'checking' };
  }

  return state;
}
