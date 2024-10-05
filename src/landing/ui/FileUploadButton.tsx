import './FileUploadButton.css';

import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import type { ChangeEventHandler, FC, FormEventHandler, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  onError?: (err: any) => void;
  onUpload?: (content: ArrayBuffer | null | string) => void;
  resultType?: string;
}>;

const FileUploadButton: FC<Props> = ({ children, onError, onUpload, resultType }) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target }) => {
      new Promise<ArrayBuffer | null | string>((resolve, reject) => {
        const firstFile = target.files?.[0];

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

  const handleSubmit = useCallback<FormEventHandler>(event => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <form className="file-upload-button" onSubmit={handleSubmit}>
      <button type="button">{children}</button>
      <input accept=".har" className="file-upload-button__file" onChange={handleChange} type="file" />
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
  children: PropTypes.any,
  onError: PropTypes.func,
  onUpload: PropTypes.func,
  resultType: PropTypes.oneOf(['text'])
};

export default FileUploadButton;
