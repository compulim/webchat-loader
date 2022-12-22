import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setVersion from '../action/setVersion';

import type { StoreState } from '../createStore';

export default function useVersion(): readonly [string, (version: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ version }) => version),
    useCallback((version: string) => dispatch(setVersion(version)), [dispatch])
  ]);
}
