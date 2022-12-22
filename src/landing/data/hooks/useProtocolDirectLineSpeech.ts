import { useCallback } from 'react';

import setProtocolDirectLineSpeech from '../action/setProtocolDirectLineSpeech';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useProtocolDirectLineSpeech(): readonly [boolean, () => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ protocol }) => protocol === 'direct line speech'),
    useCallback(() => dispatch(setProtocolDirectLineSpeech()), [dispatch])
  ]);
}
