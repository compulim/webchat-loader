import { useCallback } from 'react';

import setProtocolAppServiceExtension from '../action/setProtocolAppServiceExtension';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useProtocolAppServiceExtension(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ protocol }) => protocol === 'app service extension'),
    useCallback(() => dispatch(setProtocolAppServiceExtension()), [dispatch])
  ]);
}
