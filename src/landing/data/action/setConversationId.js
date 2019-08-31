const SET_CONVERSATION_ID = 'SET_CONVERSATION_ID';

export default function setConversationId(conversationId) {
  return {
    payload: { conversationId },
    type: SET_CONVERSATION_ID
  };
}

export { SET_CONVERSATION_ID }
