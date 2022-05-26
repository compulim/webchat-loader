import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import useDirectLineToken from './useDirectLineToken';
import setDirectLineUserId from '../action/setDirectLineUserId';

export default function useDirectLineUserId() {
  const [token] = useDirectLineToken();
  const dispatch = useDispatch();

  const value = useSelector(({ directLineCredentials: { userId } }) => userId);
  const setter = useCallback(value => dispatch(setDirectLineUserId(value)));

  return [((token && decode(token)) || {}).user || value, setter];
}
