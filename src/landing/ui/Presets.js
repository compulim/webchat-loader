import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

const Preset = ({ onDelete, onLoad, text, value }) => {
  const handleDeleteClick = useCallback(
    event => {
      event.preventDefault();
      onDelete(value);
    },
    [value]
  );

  const handleLoadClick = useCallback(
    event => {
      event.preventDefault();
      onLoad(value);
    },
    [value]
  );

  return (
    <Fragment>
      <a href="#" onClick={handleLoadClick}>
        <span>{typeof text === 'function' ? text() : text || value}</span>
      </a>
      {!!onDelete && (
        <a href="#" onClick={handleDeleteClick}>
          <span>[&times;]</span>
        </a>
      )}
      &nbsp;
    </Fragment>
  );
};

Preset.defaultProps = {
  onDelete: undefined,
  text: undefined
};

Preset.propTypes = {
  onDelete: PropTypes.func,
  onLoad: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  value: PropTypes.string.isRequired
};

const Presets = ({ onDelete, onLoad, onSave, texts, values }) => {
  const handleSaveClick = useCallback(
    event => {
      event.preventDefault();
      onSave();
    },
    [onSave]
  );

  return (
    <span>
      {values.map((value, index) => (
        <Preset key={value} onDelete={onDelete} onLoad={onLoad} text={texts[index] || value} value={value} />
      ))}
      {!!onSave && (
        <a href="#" onClick={handleSaveClick}>
          <span>Save</span>
        </a>
      )}
    </span>
  );
};

Presets.defaultProps = {
  onDelete: undefined,
  onSave: undefined
};

Presets.propTypes = {
  onDelete: PropTypes.func,
  onLoad: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  texts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.string])).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Presets;
