import tryDecodeJWT from '../../util/tryDecodeJWT';
import useDirectLineToken from './useDirectLineToken';

export default function useDirectLineConversationId() {
  const [directLineToken] = useDirectLineToken();

  return [((directLineToken && tryDecodeJWT(directLineToken)) || {}).conv || ''];
}
