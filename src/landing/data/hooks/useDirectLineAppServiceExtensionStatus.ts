import { useSelector } from 'react-redux';

import type { StoreState } from '../createStore';

export default function useDirectLineAppServiceExtensionStatus(): readonly ['checking' | 'error' | 'ready'] {
  return Object.freeze([
    useSelector<StoreState, 'checking' | 'error' | 'ready'>(
      ({ directLineAppServiceExtensionStatus: { status } }) => status
    )
  ]);
}
