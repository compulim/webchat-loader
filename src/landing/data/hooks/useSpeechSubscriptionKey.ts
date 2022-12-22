import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';

import type { StoreState } from '../createStore';

export default function useSpeechSubscriptionKey(): readonly [string, (subscriptionKey: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string>(({ speechCredentials: { subscriptionKey } }) => subscriptionKey),
    useCallback((subscriptionKey: string) => dispatch(setSpeechSubscriptionKey(subscriptionKey)), [dispatch])
  ]);
}
