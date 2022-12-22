import { useDispatch as useReduxDispatch } from 'react-redux';

import type { Action } from '../../reducer';
import type { Dispatch } from 'redux';

export default function useDispatch() {
  return useReduxDispatch<Dispatch<Action>>();
}
