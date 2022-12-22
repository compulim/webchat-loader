import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolWebSocket from '../action/setProtocolWebSocket';

import type { StoreState } from '../createStore';

export default function useProtocolWebSocket(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ protocol }) => protocol === 'web socket'),
    useCallback(() => dispatch(setProtocolWebSocket()), [dispatch])
  ]);
}
