import { SET_VERSION } from '../action/setVersion';

export default function (state = 'localhost', action) {
  if (action.type === SET_VERSION) {
    state = action.payload.version;
  }

  return state;
}
