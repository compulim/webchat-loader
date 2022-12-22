import { useSelector } from 'react-redux';

import type { StoreState } from '../createStore';

export default function useDirectLineAppServiceExtensionResponse(): readonly [string | undefined] {
  return Object.freeze([
    useSelector<StoreState, string | undefined>(({ directLineAppServiceExtensionStatus: { reason, status } }) =>
      status === 'ready' ? reason : undefined
    )
  ]);
}
