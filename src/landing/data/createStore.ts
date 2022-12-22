import { createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import updateIn from 'simple-update-in';

import reducer from './reducer';
import saga from './saga';

import type { StoreStateOf } from '../types/StoreStateOf';
import tryParseJSON from '../util/tryParseJSON';

const LOCAL_STORAGE_KEY = 'REDUX_STORE';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    reducer,
    tryParseJSON(window.localStorage?.getItem?.(LOCAL_STORAGE_KEY) || '') || {},
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
