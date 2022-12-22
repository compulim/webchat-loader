import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_DIRECT_LINE_TOKEN = 'SET_DIRECT_LINE_TOKEN';

export default function setDirectLineToken(
  token: string
): ActionWithPayload<typeof SET_DIRECT_LINE_TOKEN, { token: string }> {
  return {
    payload: { token },
    type: SET_DIRECT_LINE_TOKEN
  };
}

export { SET_DIRECT_LINE_TOKEN };
