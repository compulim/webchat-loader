import { useCallback } from 'react';

import setProtocolREST from '../action/setProtocolREST';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useProtocolREST(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ protocol }) => protocol === 'rest'),
    useCallback(() => dispatch(setProtocolREST()), [dispatch])
  ]);
}
