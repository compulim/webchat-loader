import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_VERSION = 'SET_VERSION';

export default function setVersion(version: string): ActionWithPayload<typeof SET_VERSION, { version: string }> {
  return {
    payload: { version },
    type: SET_VERSION
  };
}

export { SET_VERSION };
