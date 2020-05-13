import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolAppServiceExtension from '../action/setProtocolAppServiceExtension';

export default function useProtocolAppServiceExtension() {
  const dispatch = useDispatch();

  return [
    useSelector(({ protocol }) => protocol === 'app service extension'),
    useCallback(() => dispatch(setProtocolAppServiceExtension()), [dispatch])
  ];
}
