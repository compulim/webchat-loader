import './Preset.css';

import { Fragment, memo, useCallback, type MouseEventHandler } from 'react';

type PresetProps = Readonly<{
  onDelete?: (value: string) => void;
  onLoad?: (value: string) => void;
  text?: string | (() => string);
  value: string;
}>;

const Preset = memo(({ onDelete, onLoad, text, value }: PresetProps) => {
  const handleDeleteClick = useCallback<MouseEventHandler>(
    event => {
      event.preventDefault();
      onDelete?.(value);
    },
    [value]
  );

  const handleLoadClick = useCallback<MouseEventHandler>(
    event => {
      event.preventDefault();
      onLoad && onLoad(value);
    },
    [onLoad, value]
  );

  return (
    <Fragment>
      <button
        className="presets__preset"
        disabled={!value}
        onClick={handleLoadClick}
        title={value ? '' : 'Not available'}
        type="button"
      >
        {typeof text === 'function' ? text() : text || value}
      </button>
      {!!onDelete && !/^#/u.test(value) && (
        <button className="presets__delete-preset" onClick={handleDeleteClick} type="button">
          [&times;]
        </button>
      )}
      &nbsp;
    </Fragment>
  );
});

Preset.displayName = 'Preset';

export default Preset;
