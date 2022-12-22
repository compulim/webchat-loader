import { useCallback } from 'react';

import setDirectLineUserId from '../action/setDirectLineUserId';
import tryDecodeJWT from '../../util/tryDecodeJWT';
import useDirectLineToken from './useDirectLineToken';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useDirectLineUserId(): readonly [string, (userId: string) => void] {
  const [token] = useDirectLineToken();
  const dispatch = useDispatch();

  const value = useSelector(({ directLineCredentials: { userId } }) => userId);
  const setter = useCallback((userId: string) => dispatch(setDirectLineUserId(userId)), [dispatch]);

  return Object.freeze([(tryDecodeJWT<{ user: string | undefined }>(token) || {}).user || value, setter]);
}
