import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import updateIn from 'simple-update-in';

import reducer from './reducer';
import saga from './saga';

const LOCAL_STORAGE_KEY = 'REDUX_STORE';

function onErrorResumeNext(fn) {
  try {
    return fn();
  } catch (err) {}
}

export default function () {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    onErrorResumeNext(() => JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))) || {},
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

    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedState));

    // console.log(store.getState());
  });

  return store;
}
