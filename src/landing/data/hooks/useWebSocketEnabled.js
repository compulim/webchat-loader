import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import disableWebSocket from '../action/disableWebSocket';
import enableWebSocket from '../action/enableWebSocket';

export default function useWebSocketEnabled() {
  const dispatch = useDispatch();

  return [
    useSelector(({ webSocketEnabled }) => webSocketEnabled),
    useCallback(value => dispatch(value ? enableWebSocket() : disableWebSocket()), [dispatch])
  ];
}
