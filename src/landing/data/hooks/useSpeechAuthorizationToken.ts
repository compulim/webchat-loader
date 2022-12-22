import { useCallback } from 'react';

import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useSpeechAuthorizationToken(): readonly [string, (authorizationToken: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ speechCredentials: { authorizationToken } }) => authorizationToken),
    useCallback((authorizationToken: string) => dispatch(setSpeechAuthorizationToken(authorizationToken)), [dispatch])
  ]);
}
