import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolAppServiceExtensionInsecure from '../action/setProtocolAppServiceExtensionInsecure';

export default function useProtocolAppServiceExtensionInsecure() {
  const dispatch = useDispatch();

  return [
    useSelector(({ protocol }) => protocol === 'app service extension insecure'),
    useCallback(() => dispatch(setProtocolAppServiceExtensionInsecure()), [dispatch])
  ];
}
