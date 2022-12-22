import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_DIRECT_LINE_SECRET = 'SET_DIRECT_LINE_SECRET';

export default function setDirectLineSecret(
  secret: string
): ActionWithPayload<typeof SET_DIRECT_LINE_SECRET, { secret: string }> {
  return {
    payload: { secret },
    type: SET_DIRECT_LINE_SECRET
  };
}

export { SET_DIRECT_LINE_SECRET };
