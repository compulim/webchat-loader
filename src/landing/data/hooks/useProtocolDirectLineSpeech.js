import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setProtocolDirectLineSpeech from '../action/setProtocolDirectLineSpeech';

export default function useProtocolDirectLineSpeech() {
  const dispatch = useDispatch();

  return [
    useSelector(({ protocol }) => protocol === 'direct line speech'),
    useCallback(() => dispatch(setProtocolDirectLineSpeech()), [dispatch])
  ];
}
