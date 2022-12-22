import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolTranscript from '../action/setProtocolTranscript';

import type { StoreState } from '../createStore';

export default function useProtocolTranscript(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ protocol }) => protocol === 'transcript'),
    useCallback(() => dispatch(setProtocolTranscript()), [dispatch])
  ]);
}
