import React, { Fragment, memo, useMemo, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const SESSION_STORAGE_THEME_KEY = 'THEME';

export default memo(function (props) {
  const {
    WebChat: { FluentThemeProvider, ReactWebChat }
  } = window as any;

  const [mode, setMode] = useState<'fluent' | 'white label'>(() => {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_THEME_KEY) || 'white label';
    } catch {}

    return 'white label';
  });

  useMemo(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_THEME_KEY, mode);
    } catch {}
  }, [mode]);

  if (FluentThemeProvider && mode === 'fluent') {
    return (
      <Fragment>
        <ThemeSwitcher mode={mode} onChange={setMode} />
        <FluentThemeProvider>
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
