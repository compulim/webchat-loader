import { useSelector as useReduxSelector } from 'react-redux';

import type { StoreState } from '../../createStore';

export default function useSelector<TSelected = unknown>(
  selector: (state: StoreState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
  return useReduxSelector<StoreState, TSelected>(selector, equalityFn);
}
