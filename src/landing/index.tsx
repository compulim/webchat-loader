import { memo, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
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

const rootElement = document.getElementById('root');

rootElement && createRoot(rootElement).render(<Main />);

IS_DEVELOPMENT && new EventSource('/esbuild').addEventListener('change', () => location.reload());
