import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolDirectLineSpeech from '../action/setProtocolDirectLineSpeech';

import type { StoreState } from '../createStore';

export default function useProtocolDirectLineSpeech(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ protocol }) => protocol === 'direct line speech'),
    useCallback(() => dispatch(setProtocolDirectLineSpeech()), [dispatch])
  ]);
}
