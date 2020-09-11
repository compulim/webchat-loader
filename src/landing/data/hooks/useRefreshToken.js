import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import refreshDirectLineToken from '../action/refreshDirectLineToken';

export default function useRefreshToken() {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(refreshDirectLineToken()));
}
