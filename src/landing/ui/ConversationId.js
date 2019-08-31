import React, { useCallback, useMemo } from 'react';

import Row from './Row';

import useConversationId from '../data/hooks/useConversationId';

const ConversationId = () => {
  const [conversationId] = useConversationId();
  const style = useMemo(() => ({
    fontFamily: ['Consolas', 'Courier New', 'monospace'].map(font => `'${ font }'`).join(', ')
  }), []);

  const handleInputFocus = useCallback(({ target }) => target.select(), []);

  return (
    <Row header="Conversation ID">
      <input
        onFocus={ handleInputFocus }
        readOnly={ true }
        style={ style }
        type="text"
        value={ conversationId }
      />
    </Row>
  );
};

export default ConversationId
