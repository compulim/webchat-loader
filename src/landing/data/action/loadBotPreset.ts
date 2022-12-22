import type { ActionWithPayload } from '../../types/ActionWithPayload';

const LOAD_BOT_PRESET = 'LOAD_BOT_PRESET';

export default function loadBotPreset(name: string): ActionWithPayload<typeof LOAD_BOT_PRESET, { name: string }> {
  return {
    payload: { name },
    type: LOAD_BOT_PRESET
  };
}

export { LOAD_BOT_PRESET };
