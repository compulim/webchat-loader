import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import saveTranscriptDialogContent from '../action/saveTranscriptDialogContent';

import type { StoreState } from '../createStore';

export default function useTranscriptDialogContent(): readonly [string, (content: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ transcript: { content } }) => content || ''),
    useCallback((content: string) => dispatch(saveTranscriptDialogContent(content)), [dispatch])
  ]);
}
