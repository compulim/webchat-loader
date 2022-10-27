import { css } from 'emotion';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback } from 'react';

const ROOT_CSS = css({
  '& .presets__delete-preset, & .presets__preset, & .presets__save-preset': {
    appearance: 'none',
    background: 'transparent',
    border: 0,
    color: 'rgb(0, 0, 238)',
    cursor: 'pointer',
    display: 'inline',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0,
    padding: 0,
    textDecoration: 'underline'
  },

  '& .presets__preset:disabled': {
    color: '#CCC',
    cursor: 'inherit',
    textDecoration: 'none'
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

const Presets = ({ onDelete, onLoad, onSave, texts, values }) => {
  const handleSaveClick = useCallback(
    event => {
      event.preventDefault();
      onSave();
    },
    [onSave]
  );

  return (
    <small className={classNames('presets', ROOT_CSS)}>
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
  texts: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.string])).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Presets;
