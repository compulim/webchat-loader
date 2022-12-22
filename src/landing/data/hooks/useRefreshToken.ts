import { useCallback } from 'react';

import refreshDirectLineToken from '../action/refreshDirectLineToken';
import useDispatch from './internal/useDispatch';

export default function useRefreshToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(refreshDirectLineToken()), [dispatch]);
}
