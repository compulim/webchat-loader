import type { ActionWithPayload } from '../../types/ActionWithPayload';

const REMOVE_SAVED_DIRECT_LINE_SECRET = 'REMOVE_SAVED_DIRECT_LINE_SECRET';

export default function removeSavedDirectLineSecret(
  secret: string
): ActionWithPayload<typeof REMOVE_SAVED_DIRECT_LINE_SECRET, { secret: string }> {
  return {
    payload: { secret },
    type: REMOVE_SAVED_DIRECT_LINE_SECRET
  };
}

export { REMOVE_SAVED_DIRECT_LINE_SECRET };
