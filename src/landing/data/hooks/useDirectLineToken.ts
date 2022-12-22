import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineToken from '../action/setDirectLineToken';

import type { StoreState } from '../createStore';

export default function useDirectLineToken(): readonly [string, (token: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ directLineCredentials: { token } }) => token),
    useCallback((token: string) => dispatch(setDirectLineToken(token)), [dispatch])
  ]);
}
