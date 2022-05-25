import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hideTranscriptDialog from '../action/hideTranscriptDialog';
import showTranscriptDialog from '../action/showTranscriptDialog';

export default function useTranscriptDialogVisible() {
  const dispatch = useDispatch();

  return [
    useSelector(({ transcript: { visible } }) => !!visible),
    useCallback(visible => dispatch(visible ? showTranscriptDialog() : hideTranscriptDialog()), [dispatch])
  ];
}
