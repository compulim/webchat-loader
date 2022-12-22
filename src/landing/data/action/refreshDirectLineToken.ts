import type { Action } from 'redux';

const REFRESH_DIRECT_LINE_TOKEN = 'REFRESH_DIRECT_LINE_TOKEN';

export default function refreshDirectLineToken(): Action<typeof REFRESH_DIRECT_LINE_TOKEN> {
  return { type: REFRESH_DIRECT_LINE_TOKEN };
}

export { REFRESH_DIRECT_LINE_TOKEN };
