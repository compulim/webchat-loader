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
