const REMOVE_SAVED_DIRECT_LINE_SECRET = 'REMOVE_SAVED_DIRECT_LINE_SECRET';

export default function removeSavedDirectLineSecret(secret) {
  return {
    payload: { secret },
    type: REMOVE_SAVED_DIRECT_LINE_SECRET
  };
}

export { REMOVE_SAVED_DIRECT_LINE_SECRET };
