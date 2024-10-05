import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_CSS_CUSTOM_PROPERTIES = 'SAVE_CSS_CUSTOM_PROPERTIES';

export default function saveCSSCustomProperties(
  css: string
): ActionWithPayload<typeof SAVE_CSS_CUSTOM_PROPERTIES, { css: string }> {
  return {
    payload: { css },
    type: SAVE_CSS_CUSTOM_PROPERTIES
  };
}

export { SAVE_CSS_CUSTOM_PROPERTIES };
