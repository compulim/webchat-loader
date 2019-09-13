import { SET_VERSION } from '../action/setVersion';

export default function (state = 'dev', action) {
  if (action.type === SET_VERSION) {
    state = action.payload.version;
  }

  return state;
}
