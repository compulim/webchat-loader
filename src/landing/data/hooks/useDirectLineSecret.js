import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineSecret from '../action/setDirectLineSecret';

export default function useDirectLineSecret() {
  const dispatch = useDispatch();

  return [
    useSelector(({ directLineCredentials: { secret } }) => secret),
    useCallback(value => dispatch(setDirectLineSecret(value)), [dispatch])
  ];
}
