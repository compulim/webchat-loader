import type saveCSSCustomProperties from '../action/saveCSSCustomProperties.js';
import { SAVE_CSS_CUSTOM_PROPERTIES } from '../action/saveCSSCustomProperties.js';
import type saveStyleOptionsJSON from '../action/saveStyleOptionsJSON.js';
import { SAVE_STYLE_OPTIONS_JSON } from '../action/saveStyleOptionsJSON.js';

type SaveCSSCustomPropertiesAction = ReturnType<typeof saveCSSCustomProperties>;
type SaveStyleOptionsJSONAction = ReturnType<typeof saveStyleOptionsJSON>;

type CustomizationAction = SaveCSSCustomPropertiesAction | SaveStyleOptionsJSONAction;

type State = Readonly<{
  cssCustomProperties: string;
  styleOptionsJSON: string;
}>;

const DEFAULT_STATE: State = Object.freeze({ cssCustomProperties: '', styleOptionsJSON: '' });

export default function customization(state: State = DEFAULT_STATE, action: CustomizationAction): State {
  const { type } = action;

  if (type === SAVE_CSS_CUSTOM_PROPERTIES) {
    state = Object.freeze({ ...state, cssCustomProperties: action.payload.css });
  } else if (type === SAVE_STYLE_OPTIONS_JSON) {
    state = Object.freeze({ ...state, styleOptionsJSON: action.payload.json });
  }

  return state;
}
