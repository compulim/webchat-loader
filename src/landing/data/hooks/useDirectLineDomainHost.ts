import { useCallback } from 'react';

import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

import setDirectLineDomainHost from '../action/setDirectLineDomainHost';

export default function useDirectLineDomainHost(): readonly [string, (domainHost: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ directLineCredentials: { domainHost } }) => domainHost || ''),
    useCallback((domainHost: string) => dispatch(setDirectLineDomainHost(domainHost)), [dispatch])
  ]);
}
