import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import saveTranscriptDialogContent from '../action/saveTranscriptDialogContent';

export default function useTranscriptDialogContent() {
  const dispatch = useDispatch();

  return [
    useSelector(({ transcript: { content } }) => content || ''),
    useCallback(content => dispatch(saveTranscriptDialogContent(content)), [dispatch])
  ];
}
