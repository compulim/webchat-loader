import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import fetchSpeechAuthorizationToken from '../action/fetchSpeechAuthorizationToken';

export default function useFetchSpeechAuthorizationToken() {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(fetchSpeechAuthorizationToken()));
}
