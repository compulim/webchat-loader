import { useCallback } from 'react';

import setSpeechRegion from '../action/setSpeechRegion';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useSpeechRegion(): readonly [string, (region: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ speechCredentials: { region } }) => region),
    useCallback((region: string) => dispatch(setSpeechRegion(region)), [dispatch])
  ]);
}
