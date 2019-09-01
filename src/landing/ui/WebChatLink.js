import React, { useMemo } from 'react';

import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useStreamingExtensionEnabled from '../data/hooks/useStreamingExtensionEnabled';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useVersion from '../data/hooks/useVersion';
import useWebSocketEnabled from '../data/hooks/useWebSocketEnabled';

const WebChatLink = () => {
  const [secret] = useDirectLineSecret();
  const [speechKey] = useSpeechSubscriptionKey();
  const [speechRegion] = useSpeechRegion();
  const [streamingExtensionEnabled] = useStreamingExtensionEnabled();
  const [token] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();
  const [webSocketEnabled] = useWebSocketEnabled();

  const searchParams = useMemo(() => new URLSearchParams({
    v: version,
    ws: webSocketEnabled + '',
    ...(streamingExtensionEnabled ? { se: 'webchat-mockbot-se.azurewebsites.net' } : {}),
    ...(speechRegion ? { speechregion: speechRegion } : {}),
    userid: userId,
    ...(token ? { t: token } : { s: secret }),
    ...(speechKey ? { speechkey: speechKey } : {})
  }), [
    secret,
    speechKey,
    speechRegion,
    streamingExtensionEnabled,
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
