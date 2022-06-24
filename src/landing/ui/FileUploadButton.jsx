import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { css, cx } from 'emotion';

const ROOT_CSS = css({
  display: 'inline',
  position: 'relative',

  '.file-upload-button__file': {
    height: '100%',
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});

const FileUploadButton = ({ children, onError, onUpload, resultType }) => {
  const handleChange = useCallback(
    ({ target }) => {
      new Promise((resolve, reject) => {
        const {
          files: [firstFile]
        } = target;

        if (!firstFile) {
          return;
        }

        const reader = new FileReader();

        reader.addEventListener('error', () => reject(reader.error), { once: true });
        reader.addEventListener('load', () => resolve(reader.result), { once: true });

        switch (resultType) {
          case 'text':
            reader.readAsText(firstFile);
            break;

          default:
            break;
        }
      })
        .then(onUpload, onError)
        .finally(() => {
          target.value = '';
        });
    },
    [onUpload]
  );

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    event.stopPropagation();
  });

  return (
    <form className={cx(ROOT_CSS, 'file-upload-button')} onSubmit={handleSubmit}>
      <button type="button">{children}</button>
      <input className="file-upload-button__file" onChange={handleChange} type="file" />
    </form>
  );
};

FileUploadButton.defaultProps = {
  children: undefined,
  onError: undefined,
  onUpload: undefined,
  resultType: 'text'
};

FileUploadButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string]),
  onError: PropTypes.func,
  onUpload: PropTypes.func,
  resultType: PropTypes.oneOf(['text'])
};

export default FileUploadButton;
