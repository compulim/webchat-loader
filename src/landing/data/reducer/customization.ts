import type saveCSSCustomProperties from '../action/saveCSSCustomProperties.js';
import { SAVE_CSS_CUSTOM_PROPERTIES } from '../action/saveCSSCustomProperties.js';
import type saveCustomPropsJSON from '../action/saveCustomPropsJSON.js';
import { SAVE_CUSTOM_PROPS_JSON } from '../action/saveCustomPropsJSON.js';
import type saveStyleOptionsJSON from '../action/saveStyleOptionsJSON.js';
import { SAVE_STYLE_OPTIONS_JSON } from '../action/saveStyleOptionsJSON.js';

type SaveCSSCustomPropertiesAction = ReturnType<typeof saveCSSCustomProperties>;
type SaveCustomPropsJSONAction = ReturnType<typeof saveCustomPropsJSON>;
type SaveStyleOptionsJSONAction = ReturnType<typeof saveStyleOptionsJSON>;

type CustomizationAction = SaveCSSCustomPropertiesAction | SaveCustomPropsJSONAction | SaveStyleOptionsJSONAction;

type State = Readonly<{
  cssCustomProperties: string;
  customPropsJSON: string;
  styleOptionsJSON: string;
}>;

const DEFAULT_STATE: State = Object.freeze({ cssCustomProperties: '', customPropsJSON: '', styleOptionsJSON: '' });

export default function customization(state: State = DEFAULT_STATE, action: CustomizationAction): State {
  const { type } = action;

  if (type === SAVE_CSS_CUSTOM_PROPERTIES) {
    state = Object.freeze({ ...state, cssCustomProperties: action.payload.css });
  } else if (type === SAVE_CUSTOM_PROPS_JSON) {
    state = Object.freeze({ ...state, customPropsJSON: action.payload.json });
  } else if (type === SAVE_STYLE_OPTIONS_JSON) {
    state = Object.freeze({ ...state, styleOptionsJSON: action.payload.json });
  }

  return state;
}
