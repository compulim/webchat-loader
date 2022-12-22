import { useCallback } from 'react';

import setProtocolWebSocket from '../action/setProtocolWebSocket';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useProtocolWebSocket(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ protocol }) => protocol === 'web socket'),
    useCallback(() => dispatch(setProtocolWebSocket()), [dispatch])
  ]);
}
