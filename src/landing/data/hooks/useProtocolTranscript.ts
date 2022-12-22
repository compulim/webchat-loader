import { useCallback } from 'react';

import setProtocolTranscript from '../action/setProtocolTranscript';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useProtocolTranscript(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ protocol }) => protocol === 'transcript'),
    useCallback(() => dispatch(setProtocolTranscript()), [dispatch])
  ]);
}
