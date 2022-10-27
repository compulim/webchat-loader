import { css } from 'emotion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

const ROOT_CSS = css({
  '&.preset': {
    appearance: 'none',
    background: 'transparent',
    border: 0,
    color: 'rgb(0, 0, 238)',
    cursor: 'pointer',
    display: 'inline',
    margin: 0,
    padding: 0,
    textDecoration: 'underline'
  },

  '&.preset--disabled': {
    color: '#CCC'
  }
});

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
      onLoad && onLoad(value);
    },
    [onLoad, value]
  );

  return (
    <Fragment>
      <button
        className={classNames(ROOT_CSS, 'preset', { 'preset--disabled': !value })}
        disabled={!value}
        onClick={handleLoadClick}
        title={value ? '' : 'Unavailable'}
      >
        {typeof text === 'function' ? text() : text || value}
      </button>
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
  onLoad: undefined,
  text: undefined
};

Preset.propTypes = {
  onDelete: PropTypes.func,
  onLoad: PropTypes.func,
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
  onLoad: undefined,
  onSave: undefined
};

Presets.propTypes = {
  onDelete: PropTypes.func,
  onLoad: PropTypes.func,
  onSave: PropTypes.func,
  texts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.string])).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Presets;
