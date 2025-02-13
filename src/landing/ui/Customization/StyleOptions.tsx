import classNames from 'classnames';
import { onErrorResumeNext } from 'on-error-resume-next';
import { type FormEventHandler, Fragment, memo, useCallback, useMemo } from 'react';
import { useRefFrom } from 'use-ref-from';
import { safeParse } from 'valibot';

import { looseStyleOptionsSchema } from '../../../common/types/LooseStyleOptions';

type StyleOptionsProps = Readonly<{
  onInput?: ((value: string) => void) | undefined;
  value: string;
}>;

const SAMPLE = JSON.stringify({ backgroundColor: '#FEE', speechRecognitionContinuous: true }, null, 2);

const StyleOptions = memo(({ onInput, value }: StyleOptionsProps) => {
  const onInputRef = useRefFrom(onInput);

  const hasError = useMemo<boolean>(
    () =>
      !safeParse(
        looseStyleOptionsSchema,
        onErrorResumeNext(() => JSON.parse(value))
      ).success,
    [value]
  );

  const handleApplySampleClick = useCallback(() => onInputRef.current?.(SAMPLE), [onInputRef]);

  const handleInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onInputRef.current?.(value),
    [onInputRef.current]
  );

  return (
    <Fragment>
      <div className="customization-dialog__section">
        <h3>Style options</h3>
        <p>
          <button className="customization-dialog__link-button" onClick={handleApplySampleClick} type="button">
            Apply sample
          </button>
          . Link to{' '}
          <a
            href="https://github.com/microsoft/BotFramework-WebChat/blob/main/packages/api/src/StyleOptions.ts"
            target="_blank"
          >
            <code>StyleOptions.ts</code>
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/microsoft/BotFramework-WebChat/blob/main/packages/api/src/defaultStyleOptions.ts"
            target="_blank"
          >
            <code>defaultStyleOptions.ts</code>
          </a>
          .
        </p>
      </div>
      <textarea
        autoFocus={true}
        className={classNames('customization-dialog__textarea', {
          'customization-dialog__textarea--has-error': hasError
        })}
        onInput={handleInput}
        placeholder={SAMPLE}
        spellCheck={false}
        value={value}
      />
    </Fragment>
  );
});

StyleOptions.displayName = 'StyleOptions';

export default StyleOptions;

export type { StyleOptionsProps };
