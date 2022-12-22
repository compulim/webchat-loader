import { useCallback } from 'react';

import setVersion from '../action/setVersion';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useVersion(): readonly [string, (version: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ version }) => version),
    useCallback((version: string) => dispatch(setVersion(version)), [dispatch])
  ]);
}
