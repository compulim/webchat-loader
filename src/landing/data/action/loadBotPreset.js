const LOAD_BOT_PRESET = 'LOAD_BOT_PRESET';

export default function loadBotPreset(name) {
  return {
    payload: { name },
    type: LOAD_BOT_PRESET
  };
}

export { LOAD_BOT_PRESET };
