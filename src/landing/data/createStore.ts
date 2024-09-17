import { onErrorResumeNext } from 'on-error-resume-next';
import { applyMiddleware, createStore as createReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import updateIn from 'simple-update-in';

import tryParseJSON from '../util/tryParseJSON';
import reducer from './reducer';
import saga from './saga';

import type { ActionOf } from '../types/ActionOf';
import type { StoreStateOf } from '../types/StoreStateOf';
import type fetchArtifactBundleURL from './action/fetchArtifactBundleURL';
import type fetchDirectLineToken from './action/fetchDirectLineToken';
import type fetchSpeechAuthorizationToken from './action/fetchSpeechAuthorizationToken';
import type generateDirectLineToken from './action/generateDirectLineToken';
import type generateSpeechAuthorizationToken from './action/generateSpeechAuthorizationToken';
import type pingDirectLineAppServiceExtension from './action/pingDirectLineAppServiceExtension';
import type refreshDirectLineToken from './action/refreshDirectLineToken';

const LOCAL_STORAGE_KEY = 'REDUX_STORE';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createReduxStore(
    reducer,
    tryParseJSON(onErrorResumeNext(() => window.localStorage?.getItem?.(LOCAL_STORAGE_KEY)) || '') || {},
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(saga);

  store.subscribe(() => {
    const state = store.getState();

    let persistedState = updateIn(state, ['transcript', 'visible'], () => false);

    persistedState = updateIn(persistedState, ['directLineAppServiceExtensionStatus'], () => false);
    persistedState = updateIn(persistedState, ['fetchArtifactBundleURLStatus'], () => false);

    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedState));
    } catch (error) {
      console.error(error);
    }

    // console.log(store.getState());
  });

  return store;
}

export type Action =
  | ActionOf<ReturnType<typeof createStore>>
  | ReturnType<typeof fetchArtifactBundleURL>
  | ReturnType<typeof fetchDirectLineToken>
  | ReturnType<typeof fetchSpeechAuthorizationToken>
  | ReturnType<typeof generateDirectLineToken>
  | ReturnType<typeof generateSpeechAuthorizationToken>
  | ReturnType<typeof pingDirectLineAppServiceExtension>
  | ReturnType<typeof refreshDirectLineToken>;

export type StoreState = StoreStateOf<ReturnType<typeof createStore>>;
