import { useCallback } from 'react';

import hideTranscriptDialog from '../action/hideTranscriptDialog';
import showTranscriptDialog from '../action/showTranscriptDialog';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useTranscriptDialogVisible(): readonly [boolean, (visible: boolean) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ transcript: { visible } }) => !!visible),
    useCallback((visible: boolean) => dispatch(visible ? showTranscriptDialog() : hideTranscriptDialog()), [dispatch])
  ]);
}
