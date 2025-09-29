import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_CUSTOM_PROPS_JSON = 'SAVE_CUSTOM_PROPS_JSON';

export default function saveCustomPropsJSON(
  json: string
): ActionWithPayload<typeof SAVE_CUSTOM_PROPS_JSON, { json: string }> {
  return {
    payload: { json },
    type: SAVE_CUSTOM_PROPS_JSON
  };
}

export { SAVE_CUSTOM_PROPS_JSON };
