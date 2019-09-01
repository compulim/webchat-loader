import { DISABLE_STREAMING_EXTENSIONS } from '../action/disableStreamingExtensions';
import { ENABLE_STREAMING_EXTENSIONS } from '../action/enableStreamingExtensions';

import { DISABLE_WEB_SOCKET } from '../action/disableWebSocket';

export default function streamExtensionsEnabled(state = false, { type }) {
  if (
    type === DISABLE_STREAMING_EXTENSIONS ||
    type === DISABLE_WEB_SOCKET
  ) {
    state = false;
  } else if (type === ENABLE_STREAMING_EXTENSIONS) {
    state = true;
  }

  return state;
}
