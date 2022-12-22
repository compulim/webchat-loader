import { css } from 'emotion';
import classNames from 'classnames';
import React, { useMemo } from 'react';

import isURL from '../util/isURL';
import useDirectLineConversationId from '../data/hooks/useDirectLineConversationId';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useProtocolAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolAppServiceExtensionInsecure from '../data/hooks/useProtocolAppServiceExtensionInsecure';
import useProtocolDirectLineSpeech from '../data/hooks/useProtocolDirectLineSpeech';
import useProtocolREST from '../data/hooks/useProtocolREST';
import useProtocolTranscript from '../data/hooks/useProtocolTranscript';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useSpeechAuthorizationToken from '../data/hooks/useSpeechAuthorizationToken';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import useTranscriptDialogContent from '../data/hooks/useTranscriptDialogContent';
import useVersion from '../data/hooks/useVersion';

import type { FC } from 'react';

const ROOT_CSS = css({
  '&.webchat-link--disabled': {
    color: '#CCC'
  }
});

const WebChatLink: FC = () => {
  const [conversationId] = useDirectLineConversationId();
  const [domainHost] = useDirectLineDomainHost();
  const [protocolAppServiceExtension] = useProtocolAppServiceExtension();
  const [protocolAppServiceExtensionInsecure] = useProtocolAppServiceExtensionInsecure();
  const [protocolDirectLineSpeech] = useProtocolDirectLineSpeech();
  const [protocolREST] = useProtocolREST();
  const [protocolTranscript] = useProtocolTranscript();
  const [protocolWebSocket] = useProtocolWebSocket();
  const [secret] = useDirectLineSecret();
  const [speechAuthorizationToken] = useSpeechAuthorizationToken();
  const [speechRegion] = useSpeechRegion();
  const [speechSubscriptionKey] = useSpeechSubscriptionKey();
  const [token] = useDirectLineToken();
  const [transcriptContent] = useTranscriptDialogContent();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();

  const transcriptContentBlobURL = useMemo<string>(
    () => transcriptContent && URL.createObjectURL(new Blob([transcriptContent], { type: 'application/json' })),
    [transcriptContent]
  );

  const searchParams = useMemo<undefined | URLSearchParams>(() => {
    const isDirectLineTokenURL = isURL(secret);
    const isSpeechTokenURL = isURL(speechSubscriptionKey);

    if (protocolDirectLineSpeech && !speechSubscriptionKey && !speechAuthorizationToken) {
      return;
    }

    if ((protocolAppServiceExtension || protocolAppServiceExtensionInsecure) && (!token || !domainHost)) {
      return;
    }

    if (protocolTranscript && !transcriptContentBlobURL) {
      return;
    }

    if ((protocolREST || protocolWebSocket) && (isDirectLineTokenURL ? !token : !secret)) {
      return;
    }

    if (isSpeechTokenURL && !speechAuthorizationToken) {
      return;
    }

    return new URLSearchParams({
      v: version,
      p: protocolAppServiceExtension
        ? 'ase'
        : protocolAppServiceExtensionInsecure
        ? 'ase-insecure'
        : protocolDirectLineSpeech
        ? 'dls'
        : protocolTranscript
        ? 'blob'
        : protocolWebSocket
        ? 'ws'
        : 'rest',

      ...((protocolAppServiceExtension || protocolAppServiceExtensionInsecure) && domainHost ? { dd: domainHost } : {}),
      ...(speechRegion ? { sr: speechRegion } : {}),
      uid: userId,

      ...(conversationId ? { cid: conversationId } : {}),
      ...(protocolTranscript ? { blob: transcriptContentBlobURL } : token ? { dt: token } : { ds: secret }),
      ...(speechAuthorizationToken
        ? { st: speechAuthorizationToken }
        : speechSubscriptionKey
        ? { sk: speechSubscriptionKey }
        : {})

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
    transcriptContentBlobURL,
    userId,
    version
  ]);

  const webChatURL = useMemo<string | undefined>(
    () => searchParams && `webchat.html?${searchParams.toString()}`,
    [searchParams]
  );

  return webChatURL ? (
    <a className={classNames('webchat-link', ROOT_CSS)} href={webChatURL} rel="noopener noreferrer" target="_blank">
      Open Web Chat in a new window
    </a>
  ) : (
    <span className={classNames('webchat-link', 'webchat-link--disabled', ROOT_CSS)}>
      Open Web Chat in a new window
    </span>
  );
};
export default WebChatLink;
