import 'core-js/modules/web.url-search-params';
import 'core-js/modules/es.promise';
import 'core-js/modules/es.array.find';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.object.values';
import 'core-js/modules/es.symbol';
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
