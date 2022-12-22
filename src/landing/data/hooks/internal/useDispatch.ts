import { useDispatch as useReduxDispatch } from 'react-redux';

import type { Action } from '../../createStore';
import type { Dispatch } from 'redux';

export default function useDispatch() {
  return useReduxDispatch<Dispatch<Action>>();
}
