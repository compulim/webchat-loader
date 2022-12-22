import { useCallback } from 'react';

import setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useSpeechSubscriptionKey(): readonly [string, (subscriptionKey: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ speechCredentials: { subscriptionKey } }) => subscriptionKey),
    useCallback((subscriptionKey: string) => dispatch(setSpeechSubscriptionKey(subscriptionKey)), [dispatch])
  ]);
}
