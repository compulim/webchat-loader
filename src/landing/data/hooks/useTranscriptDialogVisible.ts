import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hideTranscriptDialog from '../action/hideTranscriptDialog';
import showTranscriptDialog from '../action/showTranscriptDialog';

import type { StoreState } from '../createStore';

export default function useTranscriptDialogVisible(): readonly [boolean, (visible: boolean) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, boolean>(({ transcript: { visible } }) => !!visible),
    useCallback((visible: boolean) => dispatch(visible ? showTranscriptDialog() : hideTranscriptDialog()), [dispatch])
  ]);
}
