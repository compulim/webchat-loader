import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';

export default function useSpeechAuthorizationToken() {
  const dispatch = useDispatch();

  return [
    useSelector(({ speechCredentials: { authorizationToken } }) => authorizationToken),
    useCallback(value => dispatch(setSpeechAuthorizationToken(value)), [dispatch])
  ];
}
