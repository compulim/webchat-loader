import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolTranscript from '../action/setProtocolTranscript';

export default function useProtocolTranscript() {
  const dispatch = useDispatch();

  return [
    useSelector(({ protocol }) => protocol === 'transcript'),
    useCallback(() => dispatch(setProtocolTranscript()), [dispatch])
  ];
}
