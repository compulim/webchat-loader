import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import removeSavedDirectLineSecret from '../action/removeSavedDirectLineSecret';
import saveDirectLineSecret from '../action/saveDirectLineSecret';

import type { StoreState } from '../createStore';

export default function useSavedDirectLineSecrets(): readonly [
  readonly string[],
  (secret: string) => void,
  (secret: string) => void
] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, readonly string[]>(({ directLineCredentials: { savedSecrets } }) =>
      Object.freeze(savedSecrets)
    ),
    useCallback((secret: string) => dispatch(saveDirectLineSecret(secret)), [dispatch]),
    useCallback((secret: string) => dispatch(removeSavedDirectLineSecret(secret)), [dispatch])
  ]);
}
