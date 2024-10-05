import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_STYLE_OPTIONS_JSON = 'SAVE_STYLE_OPTIONS_JSON';

export default function saveStyleOptionsJSON(
  json: string
): ActionWithPayload<typeof SAVE_STYLE_OPTIONS_JSON, { json: string }> {
  return {
    payload: { json },
    type: SAVE_STYLE_OPTIONS_JSON
  };
}

export { SAVE_STYLE_OPTIONS_JSON };
