import type { ActionWithPayload } from "../../types/ActionWithPayload";

const SET_DIRECT_LINE_USER_ID = 'SET_DIRECT_LINE_USER_ID';

export default function setDirectLineUserId(
  userId: string
): ActionWithPayload<typeof SET_DIRECT_LINE_USER_ID, { userId: string }> {
  return {
    payload: { userId },
    type: SET_DIRECT_LINE_USER_ID
  };
}

export { SET_DIRECT_LINE_USER_ID };
