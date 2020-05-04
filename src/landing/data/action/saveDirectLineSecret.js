const SAVE_DIRECT_LINE_SECRET = 'SAVE_DIRECT_LINE_SECRET';

export default function saveDirectLineSecret(secret) {
  return {
    payload: { secret },
    type: SAVE_DIRECT_LINE_SECRET
  };
}

export { SAVE_DIRECT_LINE_SECRET };
