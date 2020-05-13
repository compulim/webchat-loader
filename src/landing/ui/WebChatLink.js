import React, { useMemo } from 'react';

import useAppServiceExtensionEnabled from '../data/hooks/useAppServiceExtensionEnabled';
import useDirectLineConversationId from '../data/hooks/useDirectLineConversationId';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import useVersion from '../data/hooks/useVersion';
import useWebSocketEnabled from '../data/hooks/useWebSocketEnabled';

const WebChatLink = () => {
  const [appServiceExtensionEnabled] = useAppServiceExtensionEnabled();
  const [conversationId] = useDirectLineConversationId();
  const [domainHost] = useDirectLineDomainHost();
  const [secret] = useDirectLineSecret();
  const [speechKey] = useSpeechSubscriptionKey();
  const [speechRegion] = useSpeechRegion();
  const [token] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();
  const [webSocketEnabled] = useWebSocketEnabled();

  const searchParams = useMemo(
    () =>
      new URLSearchParams({
        v: version,
        ws: webSocketEnabled + '',
        ...(appServiceExtensionEnabled ? { se: domainHost } : {}),
        ...(speechRegion ? { speechregion: speechRegion } : {}),
        ...(conversationId ? { cid: conversationId } : {}),
        userid: userId,
        ...(token ? { t: token } : { s: secret }),
        ...(speechKey ? { speechkey: speechKey } : {})
      }),
    [
      conversationId,
      domainHost,
      secret,
      speechKey,
      speechRegion,
      appServiceExtensionEnabled,
      token,
      userId,
      version,
      webSocketEnabled
    ]
  );

  const webChatURL = useMemo(() => `webchat?${searchParams.toString()}`, [searchParams]);

  return (
    <a href={webChatURL} target="_blank">
      Open Web Chat in a new window
    </a>
  );
};
export default WebChatLink;
