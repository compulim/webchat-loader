import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SAVE_SPEECH_SUBSCRIPTION_KEY = 'SAVE_SPEECH_SUBSCRIPTION_KEY';

export default function saveSpeechSubscriptionKey(
  subscriptionKey: string
): ActionWithPayload<typeof SAVE_SPEECH_SUBSCRIPTION_KEY, { subscriptionKey: string }> {
  return {
    payload: { subscriptionKey },
    type: SAVE_SPEECH_SUBSCRIPTION_KEY
  };
}

export { SAVE_SPEECH_SUBSCRIPTION_KEY };
