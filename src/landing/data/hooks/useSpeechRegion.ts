import { useCallback } from 'react';

import setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import setSpeechRegion from '../action/setSpeechRegion';
import setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useSpeechRegion(): readonly [string, (region: string) => void] {
  const dispatch = useDispatch();

  return Object.freeze([
    useSelector(({ speechCredentials: { region } }) => region),
    useCallback(
      (region: string) => {
        dispatch(setSpeechRegion(region));

        if (region === 'browser') {
          dispatch(setSpeechAuthorizationToken(''));
          dispatch(setSpeechSubscriptionKey(''));
        }
      },
      [dispatch]
    )
  ]);
}
