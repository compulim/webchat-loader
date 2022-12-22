import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolAppServiceExtension from '../action/setProtocolAppServiceExtension';

import type { StoreState } from '../createStore';

export default function useProtocolAppServiceExtension(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ protocol }) => protocol === 'app service extension'),
    useCallback(() => dispatch(setProtocolAppServiceExtension()), [dispatch])
  ]);
}
