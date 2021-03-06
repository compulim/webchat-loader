import React, { useMemo } from 'react';

import isURL from '../util/isURL';

import useDirectLineConversationId from '../data/hooks/useDirectLineConversationId';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useProtocolAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolDirectLineSpeech from '../data/hooks/useProtocolDirectLineSpeech';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useSpeechAuthorizationToken from '../data/hooks/useSpeechAuthorizationToken';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import useVersion from '../data/hooks/useVersion';

const WebChatLink = () => {
  const [conversationId] = useDirectLineConversationId();
  const [domainHost] = useDirectLineDomainHost();
  const [protocolAppServiceExtension] = useProtocolAppServiceExtension();
  const [protocolDirectLineSpeech] = useProtocolDirectLineSpeech();
  const [protocolWebSocket] = useProtocolWebSocket();
  const [secret] = useDirectLineSecret();
  const [speechAuthorizationToken] = useSpeechAuthorizationToken();
  const [speechSubscriptionKey] = useSpeechSubscriptionKey();
  const [speechRegion] = useSpeechRegion();
  const [token] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();

  const searchParams = useMemo(() => {
    const directLineTokenURL = isURL(secret);
    const speechTokenURL = isURL(speechSubscriptionKey);

    if (
      (!protocolDirectLineSpeech && ((directLineTokenURL && !token) || (!secret && !token))) ||
      (protocolAppServiceExtension && !domainHost) ||
      (speechTokenURL && !speechAuthorizationToken)
    ) {
      return;
    }

    return new URLSearchParams({
      v: version,
      p: protocolAppServiceExtension ? 'ase' : protocolDirectLineSpeech ? 'dls' : protocolWebSocket ? 'ws' : 'rest',

      ...(conversationId ? { cid: conversationId } : {}),

      ...(protocolAppServiceExtension && domainHost ? { dd: domainHost } : {}),
      ...(token ? { dt: token } : { ds: secret }),

      ...(speechRegion ? { sr: speechRegion } : {}),
      ...(speechAuthorizationToken
        ? { st: speechAuthorizationToken }
        : speechSubscriptionKey
        ? { sk: speechSubscriptionKey }
        : {}),
      uid: userId

      // ws: protocolWebSocket + '',
      // ...(protocolAppServiceExtension ? { se: domainHost } : {}),
      // ...(speechRegion ? { speechregion: speechRegion } : {}),
      // userid: userId,
      // ...(speechSubscriptionKey ? { speechkey: speechSubscriptionKey } : {})
    });
  }, [
    conversationId,
    domainHost,
    protocolAppServiceExtension,
    protocolWebSocket,
    secret,
    speechAuthorizationToken,
    speechSubscriptionKey,
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
