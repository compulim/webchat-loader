import './Presets.css';

import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

import type { FC, MouseEventHandler } from 'react';

type PresetProps = {
  onDelete?: (value: string) => void;
  onLoad?: (value: string) => void;
  text?: string | (() => string);
  value: string;
};

const Preset: FC<PresetProps> = ({ onDelete, onLoad, text, value }) => {
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
};

Preset.defaultProps = {
  onDelete: undefined,
  onLoad: undefined,
  text: undefined
};

Preset.propTypes = {
  onDelete: PropTypes.func,
  onLoad: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  value: PropTypes.string.isRequired
};

type PresetsProps = {
  onDelete?: (value: string) => void;
  onLoad?: (value: string) => void;
  onSave?: () => void;
  texts: readonly (string | (() => string))[];
  values: readonly string[];
};

const Presets: FC<PresetsProps> = ({ onDelete, onLoad, onSave, texts, values }) => {
  const handleSaveClick = useCallback<MouseEventHandler>(
    event => {
      event.preventDefault();
      onSave?.();
    },
    [onSave]
  );

  return (
    <small className="presets">
      {values.map((value, index) => (
        <Preset key={value} onDelete={onDelete} onLoad={onLoad} text={texts[index] || value} value={value} />
      ))}
      {!!onSave && (
        <button className="presets__save-preset" onClick={handleSaveClick} type="button">
          Save
        </button>
      )}
    </small>
  );
};

Presets.defaultProps = {
  onDelete: undefined,
  onLoad: undefined,
  onSave: undefined
};

Presets.propTypes = {
  onDelete: PropTypes.func,
  onLoad: PropTypes.func,
  onSave: PropTypes.func,
  texts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired).isRequired,
  values: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default Presets;
