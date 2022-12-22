import type { Action } from 'redux';

const GENERATE_DIRECT_LINE_TOKEN = 'GENERATE_DIRECT_LINE_TOKEN';

export default function generateDirectLineToken(): Action<typeof GENERATE_DIRECT_LINE_TOKEN> {
  return { type: GENERATE_DIRECT_LINE_TOKEN };
}

export { GENERATE_DIRECT_LINE_TOKEN };
