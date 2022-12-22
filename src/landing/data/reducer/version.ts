import { SET_VERSION } from '../action/setVersion';

import type setVersion from '../action/setVersion';

type SetVersionAction = ReturnType<typeof setVersion>;

type State = string;

export default function (state: State = 'dev', action: SetVersionAction): State {
  if (action.type === SET_VERSION) {
    state = action.payload.version;
  }

  return state;
}
