import { useCallback } from 'react';

import fetchDirectLineToken from '../action/fetchDirectLineToken';
import useDispatch from './internal/useDispatch';

export default function useFetchDirectLineToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(fetchDirectLineToken()), [dispatch]);
}
