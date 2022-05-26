import decode from 'jwt-decode';

import useDirectLineToken from './useDirectLineToken';

export default function useDirectLineConversationId() {
  const [directLineToken] = useDirectLineToken();

  return [((directLineToken && decode(directLineToken)) || {}).conv || ''];
}
