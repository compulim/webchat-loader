import './EditCustomizationButton.css';

import { Fragment, memo, useCallback, useRef } from 'react';

import EditCustomizationDialog from './EditCustomizationDialog';

const EditCustomizationButton = memo(() => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenButtonClick = useCallback(() => dialogRef.current?.showModal(), [dialogRef]);

  return (
    <Fragment>
      <button className="edit-customization-button" onClick={handleOpenButtonClick} type="button">
        Edit
      </button>
      <EditCustomizationDialog ref={dialogRef} />
    </Fragment>
  );
});

EditCustomizationButton.displayName = 'EditCustomizationButton';

export default EditCustomizationButton;
