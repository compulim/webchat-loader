import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineDomainHost from '../action/setDirectLineDomainHost';

export default function useDirectLineDomainHost() {
  const dispatch = useDispatch();

  return [
    useSelector(({ directLineCredentials: { domainHost } }) => domainHost || ''),
    useCallback(value => dispatch(setDirectLineDomainHost(value)), [dispatch])
  ];
}
