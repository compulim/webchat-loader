import './EditCustomizationDialog.css';

import { onErrorResumeNext } from 'on-error-resume-next';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { useStateWithRef } from 'use-state-with-ref';

import useCSSCustomProperties from '../../data/hooks/useCSSCustomProperties';
import useStyleOptionsJSON from '../../data/hooks/useStyleOptionsJSON';
import CloseButton from '../CloseButton';
import CSSCustomProperties from '../Customization/CSSCustomProperties';
import StyleOptions from '../Customization/StyleOptions';

const EditCustomizationButton = memo(
  forwardRef<Pick<HTMLDialogElement, 'close' | 'showModal'>>((_, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [savedCSSCustomProperties, setSavedCSSCustomProperties, savedCSSCustomPropertiesRef] =
      useCSSCustomProperties();
    const [savedStyleOptionsJSON, setSavedStyleOptionsJSON, savedStyleOptionsJSONRef] = useStyleOptionsJSON();

    const [cssCustomProperties, setCSSCustomProperties, cssCustomPropertiesRef] = useStateWithRef<string>(
      savedCSSCustomProperties || ''
    );
    const [styleOptionsJSON, setStyleOptionsJSON, styleOptionsJSONRef] = useStateWithRef<string>(
      savedStyleOptionsJSON || '{}'
    );

    const handleCloseButtonClick = useCallback(() => dialogRef.current?.close(), [dialogRef]);

    const handleDialogClose = useCallback(() => {
      setSavedCSSCustomProperties(cssCustomPropertiesRef.current);
      setSavedStyleOptionsJSON(
        onErrorResumeNext(() => JSON.stringify(JSON.parse(styleOptionsJSONRef.current), null, 2) + '\n') ||
          styleOptionsJSONRef.current
      );
    }, [cssCustomPropertiesRef, setSavedCSSCustomProperties, setSavedStyleOptionsJSON, styleOptionsJSONRef]);

    useImperativeHandle(
      ref,
      () => ({
        close: () => dialogRef.current?.close(),
        showModal: () => {
          setCSSCustomProperties(savedCSSCustomPropertiesRef.current);
          setStyleOptionsJSON(savedStyleOptionsJSONRef.current);

          dialogRef.current?.showModal();
        }
      }),
      [dialogRef, setCSSCustomProperties, setStyleOptionsJSON, savedCSSCustomPropertiesRef, savedStyleOptionsJSONRef]
    );

    return (
      <dialog className="edit-customization-dialog" onClose={handleDialogClose} ref={dialogRef}>
        <CloseButton onClick={handleCloseButtonClick} />
        <div className="edit-customization-dialog__box">
          <h2 className="edit-customization-dialog__title">Customization (auto-save)</h2>
          <StyleOptions onInput={setStyleOptionsJSON} value={styleOptionsJSON} />
          <CSSCustomProperties onInput={setCSSCustomProperties} value={cssCustomProperties} />
        </div>
      </dialog>
    );
  })
);

EditCustomizationButton.displayName = 'EditCustomizationButton';

export default EditCustomizationButton;
