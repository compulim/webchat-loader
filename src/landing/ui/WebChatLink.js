import React, { useMemo } from 'react';

import useDirectLineConversationId from '../data/hooks/useDirectLineConversationId';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import useStreamingExtensionsEnabled from '../data/hooks/useStreamingExtensionsEnabled';
import useVersion from '../data/hooks/useVersion';
import useWebSocketEnabled from '../data/hooks/useWebSocketEnabled';

const WebChatLink = () => {
  const [conversationId] = useDirectLineConversationId();
  const [domain] = useDirectLineDomainHost();
  const [secret] = useDirectLineSecret();
  const [speechKey] = useSpeechSubscriptionKey();
  const [speechRegion] = useSpeechRegion();
  const [streamingExtensionsEnabled] = useStreamingExtensionsEnabled();
  const [token] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();
  const [webSocketEnabled] = useWebSocketEnabled();

  const searchParams = useMemo(() => new URLSearchParams({
    v: version,
    ws: webSocketEnabled + '',
    ...(streamingExtensionsEnabled ? { se: domain } : {}),
    ...(speechRegion ? { speechregion: speechRegion } : {}),
    ...(conversationId ? { cid: conversationId } : {}),
    userid: userId,
    ...(token ? { t: token } : { s: secret }),
    ...(speechKey ? { speechkey: speechKey } : {})
  }), [
    secret,
    speechKey,
    speechRegion,
    streamingExtensionsEnabled,
    token,
    userId,
    version,
    webSocketEnabled
  ]);

  const webChatURL = useMemo(() => `webchat?${ searchParams.toString() }`, [searchParams]);

  return (
    <a
      href={ webChatURL }
      target="_blank"
    >
      Open Web Chat in a new window
    </a>
  );
}
export default WebChatLink
