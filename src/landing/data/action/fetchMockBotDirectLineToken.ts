import type { Action } from 'redux';

const FETCH_MOCK_BOT_DIRECT_LINE_TOKEN = 'FETCH_MOCK_BOT_DIRECT_LINE_TOKEN';

export default function fetchMockBotDirectLineToken(): Action<typeof FETCH_MOCK_BOT_DIRECT_LINE_TOKEN> {
  return { type: FETCH_MOCK_BOT_DIRECT_LINE_TOKEN };
}

export { FETCH_MOCK_BOT_DIRECT_LINE_TOKEN };
