import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import generateSpeechAuthorizationToken from '../action/generateSpeechAuthorizationToken';

export default function useGenerateSpeechAuthorizationToken() {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(generateSpeechAuthorizationToken()));
}
