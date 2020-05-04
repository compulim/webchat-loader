const SET_SPEECH_REGION = 'SET_SPEECH_REGION';

export default function setSpeechRegion(region) {
  return {
    payload: { region },
    type: SET_SPEECH_REGION
  };
}

export { SET_SPEECH_REGION };
