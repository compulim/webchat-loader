import './FileUploadButton.css';

import { memo, useCallback, type ChangeEventHandler, type FormEventHandler, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<
  Readonly<{
    onError?: (err: any) => void;
    onUpload?: (content: ArrayBuffer | null | string) => void;
    resultType?: string;
  }>
>;

const FileUploadButton = memo(({ children, onError, onUpload, resultType }: Props) => {
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
});

FileUploadButton.displayName = 'FileUploadButton';

export default FileUploadButton;
