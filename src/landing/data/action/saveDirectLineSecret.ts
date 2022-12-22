import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_DIRECT_LINE_SECRET = 'SAVE_DIRECT_LINE_SECRET';

export default function saveDirectLineSecret(
  secret: string
): ActionWithPayload<typeof SAVE_DIRECT_LINE_SECRET, { secret: string }> {
  return {
    payload: { secret },
    type: SAVE_DIRECT_LINE_SECRET
  };
}

export { SAVE_DIRECT_LINE_SECRET };
