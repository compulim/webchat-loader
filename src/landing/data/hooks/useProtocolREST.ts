import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolREST from '../action/setProtocolREST';

import type { StoreState } from '../createStore';

export default function useProtocolREST(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ protocol }) => protocol === 'rest'),
    useCallback(() => dispatch(setProtocolREST()), [dispatch])
  ]);
}
