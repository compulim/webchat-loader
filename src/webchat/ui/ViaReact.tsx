import { Fragment, memo, useEffect, useMemo, useState } from 'react';

import ThemeSwitcher from './ThemeSwitcher';

const SESSION_STORAGE_THEME_KEY = 'THEME';

const ViaReact = memo(props => {
  const {
    WebChat: { FluentThemeProvider, ReactWebChat }
  } = window as any;

  const [mode, setMode] = useState<'copilot' | 'fluent' | 'white label'>(() => {
    try {
      const theme = sessionStorage.getItem(SESSION_STORAGE_THEME_KEY);

      if (theme === 'copilot' || theme === 'fluent') {
        return theme;
      }
    } catch {}

    return 'white label';
  });

  useMemo(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_THEME_KEY, mode);
    } catch {}
  }, [mode]);

  // TODO: Fix should not need to reload.
  useEffect(() => () => location.reload(), [mode]);

  if (FluentThemeProvider && (mode === 'copilot' || mode === 'fluent')) {
    return (
      <Fragment>
        <ThemeSwitcher mode={mode} onChange={setMode} />
        <FluentThemeProvider variant={mode}>
          <ReactWebChat className="landing__web-chat" sendTypingIndicator={true} {...props} />
        </FluentThemeProvider>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <ThemeSwitcher mode={mode} onChange={setMode} />
        <ReactWebChat className="landing__web-chat" sendTypingIndicator={true} {...props} />
      </Fragment>
    );
  }
});

ViaReact.displayName = 'ViaReact';

export default ViaReact;
