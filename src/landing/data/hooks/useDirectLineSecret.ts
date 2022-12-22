import { useCallback } from 'react';

import setDirectLineSecret from '../action/setDirectLineSecret';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useDirectLineSecret(): readonly [string, (secret: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ directLineCredentials: { secret } }) => secret),
    useCallback((secret: string) => dispatch(setDirectLineSecret(secret)), [dispatch])
  ]);
}
