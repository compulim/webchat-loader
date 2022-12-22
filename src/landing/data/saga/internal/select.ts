import { select as reduxSagaSelect } from 'redux-saga/effects';

import type { SelectEffect, Tail } from 'redux-saga/effects';
import type { StoreState } from '../../createStore';

export default function select<T, S extends (state: StoreState, ...args: unknown[]) => T>(
  selector: S,
  ...args: Tail<Parameters<S>>
): SelectEffect {
  return reduxSagaSelect<typeof selector>(selector, ...args);
}
