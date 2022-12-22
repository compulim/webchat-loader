import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineDomainHost from '../action/setDirectLineDomainHost';

import type { StoreState } from '../createStore';

export default function useDirectLineDomainHost(): readonly [string, (domainHost: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ directLineCredentials: { domainHost } }) => domainHost || ''),
    useCallback((domainHost: string) => dispatch(setDirectLineDomainHost(domainHost)), [dispatch])
  ]);
}
