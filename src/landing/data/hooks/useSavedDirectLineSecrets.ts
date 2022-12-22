import { useCallback } from 'react';

import removeSavedDirectLineSecret from '../action/removeSavedDirectLineSecret';
import saveDirectLineSecret from '../action/saveDirectLineSecret';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useSavedDirectLineSecrets(): readonly [
  readonly string[],
  (secret: string) => void,
  (secret: string) => void
] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ directLineCredentials: { savedSecrets } }) => Object.freeze(savedSecrets)),
    useCallback((secret: string) => dispatch(saveDirectLineSecret(secret)), [dispatch]),
    useCallback((secret: string) => dispatch(removeSavedDirectLineSecret(secret)), [dispatch])
  ]);
}
