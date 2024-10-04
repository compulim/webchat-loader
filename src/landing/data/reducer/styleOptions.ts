import type saveStyleOptionsContent from '../action/saveStyleOptionsContent';
import { SAVE_STYLE_OPTIONS_CONTENT } from '../action/saveStyleOptionsContent';

type SaveStyleOptionsContentAction = ReturnType<typeof saveStyleOptionsContent>;

type StyleOptionsAction = SaveStyleOptionsContentAction;

type State = Readonly<{
  content: string;
}>;

const DEFAULT_STATE: State = Object.freeze({
  content: ''
});

export default function transcript(state: State = DEFAULT_STATE, action: StyleOptionsAction): State {
  const { type } = action;

  if (type === SAVE_STYLE_OPTIONS_CONTENT) {
    state = Object.freeze({ ...state, content: action.payload.content });
  }

  return state;
}
