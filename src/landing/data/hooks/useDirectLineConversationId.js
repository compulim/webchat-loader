import useDirectLineToken from './useDirectLineToken';

import { decode } from 'jsonwebtoken';

export default function useDirectLineConversationId() {
  const [directLineToken] = useDirectLineToken();

  return [((directLineToken && decode(directLineToken)) || {}).conv || ''];
}
