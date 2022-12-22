import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_CONVERSATION_ID = 'SET_CONVERSATION_ID';

export default function setConversationId(
  conversationId: string
): ActionWithPayload<typeof SET_CONVERSATION_ID, { conversationId: string }> {
  return {
    payload: { conversationId },
    type: SET_CONVERSATION_ID
  };
}

export { SET_CONVERSATION_ID };
