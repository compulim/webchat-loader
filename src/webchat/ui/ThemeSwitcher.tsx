import React, { memo, useCallback, type FormEventHandler } from 'react';

type Mode = 'fluent' | 'white label';

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
};

export default memo(function ThemeSwitcher({ mode, onChange }: Props) {
  const handleChange = useCallback<FormEventHandler<HTMLInputElement>>(
    ({ currentTarget: { value } }) => onChange(value === 'fluent' ? 'fluent' : 'white label'),
    [onChange]
  );

  const hasFluentThemeProvider = !!(window as any).WebChat.FluentThemeProvider;

  return (
    hasFluentThemeProvider && (
      <div className="theme-switcher">
        <label className="theme-switcher__label">
          <input
            checked={mode === 'fluent'}
            className="theme-switcher__radio-button"
            onChange={handleChange}
            type="radio"
            value="fluent"
          />
          Fluent
        </label>
        <label className="theme-switcher__label">
          <input
            checked={mode !== 'fluent'}
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
