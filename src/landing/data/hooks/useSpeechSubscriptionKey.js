import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';

export default function useSpeechSubscriptionKey() {
  const dispatch = useDispatch();

  return [
    useSelector(({ speechCredentials: { subscriptionKey } }) => subscriptionKey),
    useCallback(value => dispatch(setSpeechSubscriptionKey(value)), [dispatch])
  ];
}
