import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineToken from '../action/setDirectLineToken';

export default function useDirectLineToken() {
  const dispatch = useDispatch();

  return [
    useSelector(({ directLineCredentials: { token } }) => token),
    useCallback(value => dispatch(setDirectLineToken(value)), [dispatch])
  ];
}
