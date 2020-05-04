const SET_DIRECT_LINE_SECRET = 'SET_DIRECT_LINE_SECRET';

export default function setDirectLineSecret(secret) {
  return {
    payload: { secret },
    type: SET_DIRECT_LINE_SECRET
  };
}

export { SET_DIRECT_LINE_SECRET };
