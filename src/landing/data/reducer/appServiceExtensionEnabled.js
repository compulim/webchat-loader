import { DISABLE_APP_SERVICE_EXTENSION } from '../action/disableAppServiceExtension';
import { DISABLE_WEB_SOCKET } from '../action/disableWebSocket';
import { ENABLE_APP_SERVICE_EXTENSION } from '../action/enableAppServiceExtension';

export default function appServiceExtensionEnabled(state = false, { type }) {
  if (type === DISABLE_APP_SERVICE_EXTENSION || type === DISABLE_WEB_SOCKET) {
    state = false;
  } else if (type === ENABLE_APP_SERVICE_EXTENSION) {
    state = true;
  }

  return state;
}
