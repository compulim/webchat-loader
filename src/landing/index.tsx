import React, { memo, useMemo } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import createStore from './data/createStore';

const Main = memo(() => {
  const store = useMemo(createStore, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});

render(<Main />, document.getElementById('root'));

IS_DEVELOPMENT && new EventSource('/esbuild').addEventListener('change', () => location.reload());
