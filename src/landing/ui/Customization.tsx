import './Customization.css';

import React, { memo, useCallback, useRef } from 'react';
import { useStateWithRef } from 'use-state-with-ref';

import { onErrorResumeNext } from 'on-error-resume-next';
import useCSSCustomProperties from '../data/hooks/useCSSCustomProperties';
import useStyleOptionsJSON from '../data/hooks/useStyleOptionsJSON';
import CSSCustomProperties from './Customization/CSSCustomProperties';
import StyleOptions from './Customization/StyleOptions';
import Row from './Row';

const Customization = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const styleOptionsTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [savedCSSCustomProperties, setSavedCSSCustomProperties, savedCSSCustomPropertiesRef] = useCSSCustomProperties();
  const [savedStyleOptionsJSON, setSavedStyleOptionsJSON, savedStyleOptionsJSONRef] = useStyleOptionsJSON();

  const [cssCustomProperties, setCSSCustomProperties, cssCustomPropertiesRef] = useStateWithRef<string>(
    savedCSSCustomProperties || ''
  );
  const [styleOptionsJSON, setStyleOptionsJSON, styleOptionsJSONRef] = useStateWithRef<string>(
    savedStyleOptionsJSON || '{}'
  );

  const handleDialogClose = useCallback(() => {
    setSavedCSSCustomProperties(cssCustomPropertiesRef.current);
    setSavedStyleOptionsJSON(
      onErrorResumeNext(() => JSON.stringify(JSON.parse(styleOptionsJSONRef.current), null, 2) + '\n') ||
        styleOptionsJSONRef.current
    );
  }, [cssCustomPropertiesRef, setSavedCSSCustomProperties, setSavedStyleOptionsJSON, styleOptionsJSONRef]);

  const handleOpenButtonClick = useCallback(() => {
    dialogRef.current?.showModal();
    styleOptionsTextAreaRef.current?.focus();

    setCSSCustomProperties(savedCSSCustomPropertiesRef.current);
    setStyleOptionsJSON(savedStyleOptionsJSONRef.current);
  }, [dialogRef, setCSSCustomProperties, setStyleOptionsJSON, savedStyleOptionsJSONRef]);

  return (
    <Row header="Customization">
      <button className={'customization-dialog-open-button'} onClick={handleOpenButtonClick} type="button">
        Edit
      </button>
      <dialog className={'customization-dialog'} onClose={handleDialogClose} ref={dialogRef}>
        <div className="customization-dialog__box">
          <h2 className="customization-dialog__title">Customization (auto-save)</h2>
          <StyleOptions onInput={setStyleOptionsJSON} ref={styleOptionsTextAreaRef} value={styleOptionsJSON} />
          <CSSCustomProperties onInput={setCSSCustomProperties} value={cssCustomProperties} />
        </div>
      </dialog>
    </Row>
  );
};

export default memo(Customization);
