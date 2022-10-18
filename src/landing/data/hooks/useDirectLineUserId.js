import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setDirectLineUserId from '../action/setDirectLineUserId';
import tryDecodeJWT from '../../util/tryDecodeJWT';
import useDirectLineToken from './useDirectLineToken';

export default function useDirectLineUserId() {
  const [token] = useDirectLineToken();
  const dispatch = useDispatch();

  const value = useSelector(({ directLineCredentials: { userId } }) => userId);
  const setter = useCallback(value => dispatch(setDirectLineUserId(value)));

  return [(tryDecodeJWT(token) || {}).user || value, setter];
}
