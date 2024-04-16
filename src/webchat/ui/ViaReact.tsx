import React, { Fragment, memo, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default memo(function (props) {
  const {
    WebChat: { FluentThemeProvider, ReactWebChat }
  } = window as any;

  const [mode, setMode] = useState<'fluent' | 'white label'>('white label');

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
