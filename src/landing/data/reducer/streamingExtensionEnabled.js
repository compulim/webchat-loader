import { DISABLE_STREAMING_EXTENSION } from '../action/disableStreamingExtension';
import { ENABLE_STREAMING_EXTENSION } from '../action/enableStreamingExtension';

import { DISABLE_WEB_SOCKET } from '../action/disableWebSocket';

export default function streamExtensionEnabled(state = false, { type }) {
  if (
    type === DISABLE_STREAMING_EXTENSION ||
    type === DISABLE_WEB_SOCKET
  ) {
    state = false;
  } else if (type === ENABLE_STREAMING_EXTENSION) {
    state = true;
  }

  return state;
}
