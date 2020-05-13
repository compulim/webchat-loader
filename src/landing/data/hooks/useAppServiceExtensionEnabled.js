import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import disableAppServiceExtension from '../action/disableAppServiceExtension';
import enableAppServiceExtension from '../action/enableAppServiceExtension';

export default function useAppServiceExtensionEnabled() {
  const dispatch = useDispatch();

  return [
    useSelector(({ appServiceExtensionEnabled }) => appServiceExtensionEnabled),
    useCallback(value => dispatch(value ? enableAppServiceExtension() : disableAppServiceExtension()), [dispatch])
  ];
}
