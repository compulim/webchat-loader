import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolREST from '../action/setProtocolREST';

export default function useProtocolREST() {
  const dispatch = useDispatch();

  return [
    useSelector(({ protocol }) => protocol === 'rest'),
    useCallback(() => dispatch(setProtocolREST()), [dispatch])
  ];
}
