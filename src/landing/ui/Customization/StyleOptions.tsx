import './StyleOptions.css';

import { cx } from 'emotion';
import { onErrorResumeNext } from 'on-error-resume-next';
import React, { FormEventHandler, Fragment, memo, useCallback, useMemo, useRef } from 'react';
import { useStateWithRef } from 'use-state-with-ref';
import { safeParse } from 'valibot';

import { looseStyleOptionsSchema } from '../../../common/types/LooseStyleOptions';
import useStyleOptionsContent from '../../data/hooks/useStyleOptionsContent';

const StyleOptions = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [savedContent, setSavedContent, savedContentRef] = useStyleOptionsContent();

  const [content, setContent, contentRef] = useStateWithRef<string>(savedContent || '{}');

  const hasError = useMemo<boolean>(
    () =>
      !safeParse(
        looseStyleOptionsSchema,
        onErrorResumeNext(() => JSON.parse(content))
      ).success,
    [content]
  );

  const handleDialogClose = useCallback(
    () =>
      setSavedContent(
        onErrorResumeNext(() => JSON.stringify(JSON.parse(contentRef.current), null, 2) + '\n') || contentRef.current
      ),
    [contentRef, setSavedContent]
  );

  const handleOpenButtonClick = useCallback(() => {
    dialogRef.current?.showModal();
    setContent(savedContentRef.current);
  }, [dialogRef, setContent, savedContentRef]);

  const handleTextAreaInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => setContent(value),
    [setContent]
  );

  return (
    <Fragment>
      <button className={'style-options-dialog-open-button'} onClick={handleOpenButtonClick} type="button">
        Edit style options
      </button>
      <dialog className={'style-options-dialog'} onClose={handleDialogClose} ref={dialogRef}>
        <h2>Style options</h2>
        <p>
          Link to{' '}
          <a
            href="https://github.com/microsoft/BotFramework-WebChat/blob/main/packages/api/src/StyleOptions.ts"
            target="_blank"
          >
            <code>StyleOptions.ts</code>
          </a>
          {' '}and{' '}
          <a
            href="https://github.com/microsoft/BotFramework-WebChat/blob/main/packages/api/src/defaultStyleOptions.ts"
            target="_blank"
          >
            <code>defaultStyleOptions.ts</code>
          </a>
        </p>
        <textarea
          autoFocus={true}
          className={cx('style-options-dialog__textarea', { 'style-options-dialog__textarea--has-error': hasError })}
          onInput={handleTextAreaInput}
          placeholder="{}"
          spellCheck={false}
          value={content}
        ></textarea>
      </dialog>
    </Fragment>
  );
};

export default memo(StyleOptions);
