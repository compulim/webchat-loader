const SET_DIRECT_LINE_TOKEN = 'SET_DIRECT_LINE_TOKEN';

export default function setDirectLineToken(token) {
  return {
    payload: { token },
    type: SET_DIRECT_LINE_TOKEN
  };
}

export { SET_DIRECT_LINE_TOKEN }
