import updateIn from 'simple-update-in';

import caseInsensitiveCompare from '../../util/caseInsensitiveCompare';

import { SET_SPEECH_AUTHORIZATION_TOKEN } from '../action/setSpeechAuthorizationToken';
import { SET_SPEECH_REGION } from '../action/setSpeechRegion';
import { SET_SPEECH_SUBSCRIPTION_KEY } from '../action/setSpeechSubscriptionKey';

import { REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY } from '../action/removeSavedSpeechSubscriptionKey';
import { SAVE_SPEECH_SUBSCRIPTION_KEY } from '../action/saveSpeechSubscriptionKey';

const DEFAULT_STATE = {
  authorizationToken: '',
  region: 'westus',
  savedSubscriptionKeys: [],
  subscriptionKey: ''
};

export default function setSpeechKey(state = DEFAULT_STATE, { payload, type }) {
  if (type === REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY) {
    state = updateIn(state, ['savedSubscriptionKeys', value => value === payload.subscriptionKey]);
  } else if (type === SAVE_SPEECH_SUBSCRIPTION_KEY) {
    const { subscriptionKey } = payload;

    state = updateIn(state, ['savedSubscriptionKeys', value => value === subscriptionKey]);
    state = updateIn(state, ['savedSubscriptionKeys'], keys =>
      [...(keys || []), subscriptionKey].sort(caseInsensitiveCompare)
    );
  } else if (type === SET_SPEECH_AUTHORIZATION_TOKEN) {
    state = updateIn(state, ['authorizationToken'], () => payload.authorizationToken);
  } else if (type === SET_SPEECH_REGION) {
    state = updateIn(state, ['region'], () => payload.region);
  } else if (type === SET_SPEECH_SUBSCRIPTION_KEY) {
    state = updateIn(state, ['subscriptionKey'], () => payload.subscriptionKey);
  }

  return state;
}
