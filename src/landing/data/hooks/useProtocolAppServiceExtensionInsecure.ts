import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolAppServiceExtensionInsecure from '../action/setProtocolAppServiceExtensionInsecure';

import type { StoreState } from '../createStore';

export default function useProtocolAppServiceExtensionInsecure(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ protocol }) => protocol === 'app service extension insecure'),
    useCallback(() => dispatch(setProtocolAppServiceExtensionInsecure()), [dispatch])
  ]);
}
