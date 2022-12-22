import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_DIRECT_LINE_TOKEN_URL = 'SET_DIRECT_LINE_TOKEN_URL';

export default function setDirectLineTokenURL(
  url: string
): ActionWithPayload<typeof SET_DIRECT_LINE_TOKEN_URL, { url: string }> {
  return {
    payload: { url },
    type: SET_DIRECT_LINE_TOKEN_URL
  };
}

export { SET_DIRECT_LINE_TOKEN_URL };
