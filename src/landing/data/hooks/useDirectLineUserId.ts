import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineUserId from '../action/setDirectLineUserId';
import tryDecodeJWT from '../../util/tryDecodeJWT';
import useDirectLineToken from './useDirectLineToken';

import type { StoreState } from '../createStore';

export default function useDirectLineUserId(): readonly [string, (userId: string) => void] {
  const [token] = useDirectLineToken();
  const dispatch = useDispatch();

  const value = useSelector<StoreState, string>(({ directLineCredentials: { userId } }) => userId);
  const setter = useCallback((userId: string) => dispatch(setDirectLineUserId(userId)), [dispatch]);

  return [(tryDecodeJWT<{ user: string | undefined }>(token) || {}).user || value, setter];
}
