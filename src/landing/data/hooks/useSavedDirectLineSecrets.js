import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import removeSavedDirectLineSecret from '../action/removeSavedDirectLineSecret';
import saveDirectLineSecret from '../action/saveDirectLineSecret';

export default function useSavedDirectLineSecrets() {
  const dispatch = useDispatch();

  return [
    useSelector(({ directLineCredentials: { savedSecrets } }) => savedSecrets),
    useCallback(secret => dispatch(saveDirectLineSecret(secret)), [dispatch]),
    useCallback(secret => dispatch(removeSavedDirectLineSecret(secret)), [dispatch])
  ];
}
