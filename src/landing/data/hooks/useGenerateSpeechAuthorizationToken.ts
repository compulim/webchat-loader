import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import generateSpeechAuthorizationToken from '../action/generateSpeechAuthorizationToken';

export default function useGenerateSpeechAuthorizationToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(generateSpeechAuthorizationToken()), [dispatch]);
}
