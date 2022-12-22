import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_SPEECH_SUBSCRIPTION_KEY = 'SET_SPEECH_SUBSCRIPTION_KEY';

export default function setSpeechSubscriptionKey(
  subscriptionKey: string
): ActionWithPayload<typeof SET_SPEECH_SUBSCRIPTION_KEY, { subscriptionKey: string }> {
  return {
    payload: { subscriptionKey },
    type: SET_SPEECH_SUBSCRIPTION_KEY
  };
}

export { SET_SPEECH_SUBSCRIPTION_KEY };
