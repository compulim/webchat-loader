import { useSelector } from 'react-redux';

import type { StoreState } from '../createStore';

export default function useDirectLineAppServiceExtensionResponse(): readonly [string | undefined] {
  return [
    useSelector<StoreState, string | undefined>(({ directLineAppServiceExtensionStatus: { reason, status } }) =>
      status === 'ready' ? reason : undefined
    )
  ];
}
