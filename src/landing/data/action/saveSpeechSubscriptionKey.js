const SAVE_SPEECH_SUBSCRIPTION_KEY = 'SAVE_SPEECH_SUBSCRIPTION_KEY';

export default function saveSpeechSubscriptionKey(subscriptionKey) {
  return {
    payload: { subscriptionKey },
    type: SAVE_SPEECH_SUBSCRIPTION_KEY
  };
}

export { SAVE_SPEECH_SUBSCRIPTION_KEY };
