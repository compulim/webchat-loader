import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import generateDirectLineToken from '../action/generateDirectLineToken';

export default function useGenerateDirectLineToken() {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(generateDirectLineToken()));
}
