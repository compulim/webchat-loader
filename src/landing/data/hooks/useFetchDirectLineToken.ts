import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import fetchDirectLineToken from '../action/fetchDirectLineToken';

export default function useFetchDirectLineToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(fetchDirectLineToken()), [dispatch]);
}
