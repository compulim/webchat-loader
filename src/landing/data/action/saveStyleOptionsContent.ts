import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_STYLE_OPTIONS_CONTENT = 'SAVE_STYLE_OPTIONS_CONTENT';

export default function saveStyleOptionsContent(
  content: string
): ActionWithPayload<typeof SAVE_STYLE_OPTIONS_CONTENT, { content: string }> {
  return {
    payload: { content },
    type: SAVE_STYLE_OPTIONS_CONTENT
  };
}

export { SAVE_STYLE_OPTIONS_CONTENT };
