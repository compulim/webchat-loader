import { useCallback } from 'react';

import generateSpeechAuthorizationToken from '../action/generateSpeechAuthorizationToken';
import useDispatch from './internal/useDispatch';

export default function useGenerateSpeechAuthorizationToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(generateSpeechAuthorizationToken()), [dispatch]);
}
