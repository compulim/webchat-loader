import { useCallback } from 'react';

import fetchSpeechAuthorizationToken from '../action/fetchSpeechAuthorizationToken';
import useDispatch from './internal/useDispatch';

export default function useFetchSpeechAuthorizationToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(fetchSpeechAuthorizationToken()), [dispatch]);
}
