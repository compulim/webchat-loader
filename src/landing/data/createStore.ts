import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import updateIn from 'simple-update-in';

import reducer from './reducer';
import saga from './saga';

import type { StoreStateOf } from '../types/StoreStateOf';
import tryParseJSON from '../util/tryParseJSON';

const LOCAL_STORAGE_KEY = 'REDUX_STORE';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    preloadedState: tryParseJSON(window.localStorage?.getItem?.(LOCAL_STORAGE_KEY) || '') || {},
    middleware: [sagaMiddleware]
  });

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
