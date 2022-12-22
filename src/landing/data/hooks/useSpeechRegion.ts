import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setSpeechRegion from '../action/setSpeechRegion';

import type { StoreState } from '../createStore';

export default function useSpeechRegion(): readonly [string, (region: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ speechCredentials: { region } }) => region),
    useCallback((region: string) => dispatch(setSpeechRegion(region)), [dispatch])
  ]);
}
