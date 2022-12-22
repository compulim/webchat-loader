import { useCallback } from 'react';

import setDirectLineToken from '../action/setDirectLineToken';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useDirectLineToken(): readonly [string, (token: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ directLineCredentials: { token } }) => token),
    useCallback((token: string) => dispatch(setDirectLineToken(token)), [dispatch])
  ]);
}
