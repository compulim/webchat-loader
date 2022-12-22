import { useCallback } from 'react';

import generateDirectLineToken from '../action/generateDirectLineToken';
import useDispatch from './internal/useDispatch';

export default function useGenerateDirectLineToken(): () => void {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(generateDirectLineToken()), [dispatch]);
}
