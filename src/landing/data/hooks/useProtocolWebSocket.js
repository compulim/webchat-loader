import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolWebSocket from '../action/setProtocolWebSocket';

export default function useProtocolWebSocket() {
  const dispatch = useDispatch();

  return [
    useSelector(({ protocol }) => protocol === 'web socket'),
    useCallback(() => dispatch(setProtocolWebSocket()), [dispatch])
  ];
}
