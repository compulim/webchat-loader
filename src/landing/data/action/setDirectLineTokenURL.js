const SET_DIRECT_LINE_TOKEN_URL = 'SET_DIRECT_LINE_TOKEN_URL';

export default function setDirectLineTokenURL(url) {
  return {
    payload: { url },
    type: SET_DIRECT_LINE_TOKEN_URL
  };
}

export { SET_DIRECT_LINE_TOKEN_URL }
