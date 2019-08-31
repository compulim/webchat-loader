import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setSpeechRegion from '../action/setSpeechRegion';

export default function useSpeechRegion() {
  const dispatch = useDispatch();

  return [
    useSelector(({ speechCredentials: { region } }) => region),
    useCallback(value => dispatch(setSpeechRegion(value)), [dispatch])
  ];
}
