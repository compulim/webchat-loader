import React, { type FormEventHandler, forwardRef, Fragment, memo, useCallback } from 'react';

import { useRefFrom } from 'use-ref-from';

type CSSCustomPropertiesProps = Readonly<{
  onInput?: ((value: string) => void) | undefined;
  value: string;
}>;

const SAMPLE = '--bubble-minHeight: 100px;';

const CSSCustomProperties = forwardRef<HTMLTextAreaElement, CSSCustomPropertiesProps>(({ onInput, value }, ref) => {
  const onInputRef = useRefFrom(onInput);

  const handleApplySampleClick = useCallback(() => onInputRef.current?.(SAMPLE), [onInputRef]);

  const handleInput = useCallback<FormEventHandler<HTMLTextAreaElement>>(
    ({ currentTarget: { value } }) => onInputRef.current?.(value),
    [onInputRef.current]
  );

  return (
    <Fragment>
      <div className="customization-dialog__section">
        <h3>CSS Custom Properties</h3>
        <p>
          <button className="customization-dialog__link-button" onClick={handleApplySampleClick} type="button">
            Apply sample
          </button>
          . Link to{' '}
          <a
            href="https://github.com/microsoft/BotFramework-WebChat/blob/main/packages/component/src/Styles/CustomPropertyNames.ts"
            target="_blank"
          >
            <code>CustomPropertyNames.ts</code>
          </a>
          .
        </p>
      </div>
      <textarea
        className="customization-dialog__textarea"
        onInput={handleInput}
        placeholder={SAMPLE}
        ref={ref}
        spellCheck={false}
        value={value}
      />
    </Fragment>
  );
});

export default memo(CSSCustomProperties);

export type { CSSCustomPropertiesProps };
