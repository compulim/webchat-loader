import { useCallback } from 'react';

import saveTranscriptDialogContent from '../action/saveTranscriptDialogContent';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useTranscriptDialogContent(): readonly [string, (content: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ transcript: { content } }) => content || ''),
    useCallback((content: string) => dispatch(saveTranscriptDialogContent(content)), [dispatch])
  ]);
}
