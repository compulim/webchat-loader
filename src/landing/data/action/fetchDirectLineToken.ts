import type { Action } from 'redux';

const FETCH_DIRECT_LINE_TOKEN = 'FETCH_DIRECT_LINE_TOKEN';

export default function fetchDirectLineToken(): Action<typeof FETCH_DIRECT_LINE_TOKEN> {
  return { type: FETCH_DIRECT_LINE_TOKEN };
}

export { FETCH_DIRECT_LINE_TOKEN };
