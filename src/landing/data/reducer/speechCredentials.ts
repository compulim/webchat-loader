import updateIn from 'simple-update-in';

import caseInsensitiveCompare from '../../util/caseInsensitiveCompare';

import { REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY } from '../action/removeSavedSpeechSubscriptionKey';
import { SAVE_SPEECH_SUBSCRIPTION_KEY } from '../action/saveSpeechSubscriptionKey';
import { SET_SPEECH_AUTHORIZATION_TOKEN } from '../action/setSpeechAuthorizationToken';
import { SET_SPEECH_REGION } from '../action/setSpeechRegion';
import { SET_SPEECH_SUBSCRIPTION_KEY } from '../action/setSpeechSubscriptionKey';

import type removeSavedSpeechSubscriptionKey from '../action/removeSavedSpeechSubscriptionKey';
import type saveSpeechSubscriptionKey from '../action/saveSpeechSubscriptionKey';
import type setSpeechAuthorizationToken from '../action/setSpeechAuthorizationToken';
import type setSpeechRegion from '../action/setSpeechRegion';
import type setSpeechSubscriptionKey from '../action/setSpeechSubscriptionKey';

type RemoveSavedSpeechSubscriptionKey = ReturnType<typeof removeSavedSpeechSubscriptionKey>;
type SaveSpeechSubscriptionKey = ReturnType<typeof saveSpeechSubscriptionKey>;
type SetSpeechAuthorizationToken = ReturnType<typeof setSpeechAuthorizationToken>;
type SetSpeechRegion = ReturnType<typeof setSpeechRegion>;
type SetSpeechSubscriptionKey = ReturnType<typeof setSpeechSubscriptionKey>;

type SetSpeechKeyAction =
  | RemoveSavedSpeechSubscriptionKey
  | SaveSpeechSubscriptionKey
  | SetSpeechAuthorizationToken
  | SetSpeechRegion
  | SetSpeechSubscriptionKey;

type State = {
  authorizationToken: string;
  region: string;
  savedSubscriptionKeys: string[];
  subscriptionKey: string;
};

const DEFAULT_STATE: State = {
  authorizationToken: '',
  region: 'westus',
  savedSubscriptionKeys: [] as string[],
  subscriptionKey: ''
};

export default function setSpeechKey(state: State = DEFAULT_STATE, { payload, type }: SetSpeechKeyAction): State {
  if (type === REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY) {
    state = updateIn(state, [
      'savedSubscriptionKeys',
      (value: State['savedSubscriptionKeys'][0]): boolean => value === payload.subscriptionKey
    ]);
  } else if (type === SAVE_SPEECH_SUBSCRIPTION_KEY) {
    const { subscriptionKey } = payload;

    state = updateIn(state, [
      'savedSubscriptionKeys',
      (value: State['savedSubscriptionKeys'][0]): boolean => value === subscriptionKey
    ]);

    state = updateIn(
      state,
      ['savedSubscriptionKeys'],
      (keys: State['savedSubscriptionKeys']): State['savedSubscriptionKeys'] =>
        [...(keys || []), subscriptionKey].sort(caseInsensitiveCompare)
    );
  } else if (type === SET_SPEECH_AUTHORIZATION_TOKEN) {
    state = updateIn(state, ['authorizationToken'], (): State['authorizationToken'] => payload.authorizationToken);
  } else if (type === SET_SPEECH_REGION) {
    state = updateIn(state, ['region'], (): State['region'] => payload.region);
  } else if (type === SET_SPEECH_SUBSCRIPTION_KEY) {
    state = updateIn(state, ['subscriptionKey'], (): State['subscriptionKey'] => payload.subscriptionKey);
  }

  return state;
}
