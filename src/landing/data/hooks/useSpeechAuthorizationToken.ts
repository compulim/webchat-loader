import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';

import type { StoreState } from '../createStore';

export default function useSpeechAuthorizationToken(): readonly [string, (authorizationToken: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ speechCredentials: { authorizationToken } }) => authorizationToken),
    useCallback((authorizationToken: string) => dispatch(setSpeechAuthorizationToken(authorizationToken)), [dispatch])
  ]);
}
