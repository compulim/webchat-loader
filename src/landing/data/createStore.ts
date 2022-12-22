import { createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import updateIn from 'simple-update-in';

import reducer from './reducer';
import saga from './saga';

import type { StoreStateOf } from '../types/StoreStateOf';

const LOCAL_STORAGE_KEY = 'REDUX_STORE';

function onErrorResumeNext<T extends () => any>(fn: T): ReturnType<T> | undefined {
  try {
    return fn();
  } catch (err) {}
}

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    reducer,
    onErrorResumeNext(() => JSON.parse(window.localStorage?.getItem?.(LOCAL_STORAGE_KEY) || '')) || {},
    applyMiddleware(
      sagaMiddleware
      // () => next => action => {
      //   console.log(action);

      //   return next(action);
      // }
    )
  );

  sagaMiddleware.run(saga);

  store.subscribe(() => {
    const state = store.getState();

    const persistedState = updateIn(state, ['transcript', 'visible'], () => false);

    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedState));
    } catch (error) {
      console.error(error);
    }

    // console.log(store.getState());
  });

  return store;
}

export type StoreState = StoreStateOf<ReturnType<typeof createStore>>;
