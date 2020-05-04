const REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY = 'REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY';

export default function removeSavedSpeechSubscriptionKey(subscriptionKey) {
  return {
    payload: { subscriptionKey },
    type: REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY
  };
}

export { REMOVE_SAVED_SPEECH_SUBSCRIPTION_KEY };
