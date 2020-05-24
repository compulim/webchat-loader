import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/object/values';
import 'core-js/features/promise';
import 'core-js/features/string/starts-with';
import 'core-js/features/symbol';
import 'core-js/features/url-search-params';
import 'core-js/features/url';
import 'regenerator-runtime';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import React, { useMemo } from 'react';

import App from './App';

import createStore from './data/createStore';

const Main = () => {
  const store = useMemo(createStore, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

render(<Main />, document.getElementById('root'));
