import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import refreshDirectLineToken from '../action/refreshDirectLineToken';

export default function useRefreshToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(refreshDirectLineToken()), [dispatch]);
}
