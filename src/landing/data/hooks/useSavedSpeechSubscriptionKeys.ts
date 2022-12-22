import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import removeSavedSpeechSubscriptionKey from '../action/removeSavedSpeechSubscriptionKey';
import saveSpeechSubscriptionKey from '../action/saveSpeechSubscriptionKey';

import type { StoreState } from '../createStore';

export default function useSavedSpeechSubscriptionKey(): readonly [
  readonly string[],
  (subscriptionKey: string) => void,
  (subscriptionKey: string) => void
] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector<StoreState, string[]>(
      ({ speechCredentials: { savedSubscriptionKeys } }) => savedSubscriptionKeys || []
    ),
    useCallback((subscriptionKey: string) => dispatch(saveSpeechSubscriptionKey(subscriptionKey)), [dispatch]),
    useCallback((subscriptionKey: string) => dispatch(removeSavedSpeechSubscriptionKey(subscriptionKey)), [dispatch])
  ]);
}
