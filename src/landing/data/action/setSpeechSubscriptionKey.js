const SET_SPEECH_SUBSCRIPTION_KEY = 'SET_SPEECH_SUBSCRIPTION_KEY';

export default function setSpeechSubscriptionKey(subscriptionKey) {
  return {
    payload: { subscriptionKey },
    type: SET_SPEECH_SUBSCRIPTION_KEY
  };
}

export { SET_SPEECH_SUBSCRIPTION_KEY };
