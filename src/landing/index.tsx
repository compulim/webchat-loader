import 'core-js/features/promise';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React, { useMemo } from 'react';

import App from './App';
import createStore from './data/createStore';

import type { FC } from 'react';

const Main: FC<{}> = () => {
  const store = useMemo(createStore, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Main />, document.getElementById('root'));
