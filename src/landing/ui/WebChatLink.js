import React, { useMemo } from 'react';

import useDirectLineConversationId from '../data/hooks/useDirectLineConversationId';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useProtocolAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import useVersion from '../data/hooks/useVersion';

const WebChatLink = () => {
  const [conversationId] = useDirectLineConversationId();
  const [domainHost] = useDirectLineDomainHost();
  const [protocolAppServiceExtension] = useProtocolAppServiceExtension();
  const [protocolWebSocket] = useProtocolWebSocket();
  const [secret] = useDirectLineSecret();
  const [speechKey] = useSpeechSubscriptionKey();
  const [speechRegion] = useSpeechRegion();
  const [token] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();

  const searchParams = useMemo(() => {
    const tokenURL = /^https?:\/\//.test(secret || '');

    if ((tokenURL && !token) || (!secret && !token) || (protocolAppServiceExtension && !domainHost)) {
      return;
    }

    return new URLSearchParams({
      v: version,
      ws: protocolWebSocket + '',
      ...(protocolAppServiceExtension ? { se: domainHost } : {}),
      ...(speechRegion ? { speechregion: speechRegion } : {}),
      ...(conversationId ? { cid: conversationId } : {}),
      userid: userId,
      ...(token ? { t: token } : { s: secret }),
      ...(speechKey ? { speechkey: speechKey } : {})
    });
  }, [
    conversationId,
    domainHost,
    protocolAppServiceExtension,
    protocolWebSocket,
    secret,
    speechKey,
    speechRegion,
    token,
    userId,
    version
  ]);

  const webChatURL = useMemo(() => searchParams && `webchat?${searchParams.toString()}`, [searchParams]);

  return webChatURL ? (
    <a href={webChatURL} target="_blank">
      Open Web Chat in a new window
    </a>
  ) : (
    <span>Open Web Chat in a new window</span>
  );
};
export default WebChatLink;
