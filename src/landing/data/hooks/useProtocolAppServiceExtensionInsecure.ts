import { useCallback } from 'react';

import setProtocolAppServiceExtensionInsecure from '../action/setProtocolAppServiceExtensionInsecure';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useProtocolAppServiceExtensionInsecure(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ protocol }) => protocol === 'app service extension insecure'),
    useCallback(() => dispatch(setProtocolAppServiceExtensionInsecure()), [dispatch])
  ]);
}
