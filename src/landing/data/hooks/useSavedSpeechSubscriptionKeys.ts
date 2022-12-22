import { useCallback } from 'react';

import removeSavedSpeechSubscriptionKey from '../action/removeSavedSpeechSubscriptionKey';
import saveSpeechSubscriptionKey from '../action/saveSpeechSubscriptionKey';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useSavedSpeechSubscriptionKey(): readonly [
  readonly string[],
  (subscriptionKey: string) => void,
  (subscriptionKey: string) => void
] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ speechCredentials: { savedSubscriptionKeys } }) => Object.freeze(savedSubscriptionKeys || [])),
    useCallback((subscriptionKey: string) => dispatch(saveSpeechSubscriptionKey(subscriptionKey)), [dispatch]),
    useCallback((subscriptionKey: string) => dispatch(removeSavedSpeechSubscriptionKey(subscriptionKey)), [dispatch])
  ]);
}
