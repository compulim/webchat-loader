import React, { memo, useCallback, type FormEventHandler } from 'react';

type Mode = 'copilot' | 'fluent' | 'white label';

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
};

export default memo(function ThemeSwitcher({ mode, onChange }: Props) {
  const handleChange = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value } }) => onChange(value === 'copilot' || value === 'fluent' ? value : 'white label'),
    [onChange]
  );

  const hasFluentThemeProvider = !!(window as any).WebChat.FluentThemeProvider;

  return (
    hasFluentThemeProvider && (
      <div className="theme-switcher">
        <label className="theme-switcher__label">
          <input
            checked={mode === 'copilot'}
            className="theme-switcher__radio-button"
            onChange={handleChange}
            type="radio"
            value="copilot"
          />
          Copilot
        </label>
        <label className="theme-switcher__label">
          <input
            checked={mode === 'fluent'}
            className="theme-switcher__radio-button"
            onChange={handleChange}
            type="radio"
            value="fluent"
          />
          Fluent UI
        </label>
        <label className="theme-switcher__label">
          <input
            checked={mode !== 'copilot' && mode !== 'fluent'}
            className="theme-switcher__radio-button"
            onChange={handleChange}
            type="radio"
            value="white label"
          />
          White-labelled
        </label>
      </div>
    )
  );
});
