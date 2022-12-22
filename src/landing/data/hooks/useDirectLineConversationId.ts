import tryDecodeJWT from '../../util/tryDecodeJWT';
import useDirectLineToken from './useDirectLineToken';

export default function useDirectLineConversationId(): readonly [string] {
  const [directLineToken] = useDirectLineToken();

  return Object.freeze([
    ((directLineToken && tryDecodeJWT<{ conv: string | undefined }>(directLineToken)) || {}).conv || ''
  ]);
}
