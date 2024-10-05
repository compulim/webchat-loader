import { Fragment, memo, useCallback, useRef } from 'react';
import TranscriptDialog from './Transcript/TranscriptDialog';

const EditTranscriptButton = memo(() => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = useCallback(() => {
    console.log('open edit transcript dialog');

    dialogRef.current?.showModal();
  }, [dialogRef]);

  return (
    <Fragment>
      <button onClick={handleClick} type="button">
        Edit
      </button>
      <TranscriptDialog ref={dialogRef} />
    </Fragment>
  );
});

EditTranscriptButton.displayName = 'EditTranscriptButton';

export default EditTranscriptButton;
