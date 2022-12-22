import type { ActionWithPayload } from '../../types/ActionWithPayload';

const REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY = 'REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY';

export default function removeSavedSpeechSubscriptionKey(
  subscriptionKey: string
): ActionWithPayload<typeof REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY, { subscriptionKey: string }> {
  return {
    payload: { subscriptionKey },
    type: REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY
  };
}

export { REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY };
