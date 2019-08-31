import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import removeSavedSpeechSubscriptionKey from '../action/removeSavedSpeechSubscriptionKey';
import saveSpeechSubscriptionKey from '../action/saveSpeechSubscriptionKey';

export default function useSavedSpeechSubscriptionKey() {
  const dispatch = useDispatch();

  return [
    useSelector(({ speechCredentials: { savedSubscriptionKeys } }) => savedSubscriptionKeys || []),
    useCallback(value => dispatch(saveSpeechSubscriptionKey(value)), [dispatch]),
    useCallback(value => dispatch(removeSavedSpeechSubscriptionKey(value)), [dispatch])
  ];
}
