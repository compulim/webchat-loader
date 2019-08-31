const SET_DIRECT_LINE_USER_ID = 'SET_DIRECT_LINE_USER_ID'

export default function setDirectLineUserId(userId) {
  return {
    payload: { userId },
    type: SET_DIRECT_LINE_USER_ID
  };
}

export { SET_DIRECT_LINE_USER_ID }
