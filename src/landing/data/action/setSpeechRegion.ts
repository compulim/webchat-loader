import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_SPEECH_REGION = 'SET_SPEECH_REGION';

export default function setSpeechRegion(
  region: string
): ActionWithPayload<typeof SET_SPEECH_REGION, { region: string }> {
  return {
    payload: { region },
    type: SET_SPEECH_REGION
  };
}

export { SET_SPEECH_REGION };
