import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineSecret from '../action/setDirectLineSecret';

import type { StoreState } from '../createStore';

export default function useDirectLineSecret(): readonly [string, (secret: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ directLineCredentials: { secret } }) => secret),
    useCallback((secret: string) => dispatch(setDirectLineSecret(secret)), [dispatch])
  ]);
}
