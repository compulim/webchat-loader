import './WebChatLink.css';

import { onErrorResumeNext } from 'on-error-resume-next';
import { memo, useMemo } from 'react';
import { safeParse } from 'valibot';

import { looseStyleOptionsSchema } from '../../common/types/LooseStyleOptions';
import useCSSCustomProperties from '../data/hooks/useCSSCustomProperties';
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
import useStyleOptionsJSON from '../data/hooks/useStyleOptionsJSON';
import useTranscriptDialogContent from '../data/hooks/useTranscriptDialogContent';
import useVersion from '../data/hooks/useVersion';
import isURL from '../util/isURL';

const WebChatLink = memo(() => {
  const [conversationId] = useDirectLineConversationId();
  const [cssCustomProperties] = useCSSCustomProperties();
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
  const [styleOptionsJSON] = useStyleOptionsJSON();
  const [token] = useDirectLineToken();
  const [transcriptContent] = useTranscriptDialogContent();
  const [userId] = useDirectLineUserId();
  const [version] = useVersion();

  const transcriptContentBlobURL = useMemo<string>(
    () => transcriptContent && URL.createObjectURL(new Blob([transcriptContent], { type: 'application/json' })),
    [transcriptContent]
  );

  const rectifiedStyleOptionsJSON = useMemo(() => {
    const { output, success } = safeParse(
      looseStyleOptionsSchema,
      onErrorResumeNext(() => JSON.parse(styleOptionsJSON))
    );

    if (success) {
      return JSON.stringify(output);
    }
  }, [styleOptionsJSON]);

  const searchParams = useMemo<undefined | URLSearchParams>(() => {
    const isDirectLineTokenURL = isURL(secret);
    const isSpeechTokenURL = isURL(speechSubscriptionKey);

    console.log({ protocolWebSocket, isDirectLineTokenURL, token, secret });

    if (protocolDirectLineSpeech && !speechSubscriptionKey && !speechAuthorizationToken) {
      return;
    }

    if ((protocolAppServiceExtension || protocolAppServiceExtensionInsecure) && (!token || !domainHost)) {
      return;
    }

    if (protocolTranscript && !transcriptContentBlobURL) {
      return;
    }

    if ((protocolREST || protocolWebSocket) && !token && (!secret || isDirectLineTokenURL)) {
      console.log('CANNOT');

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
        : {}),

      ...(cssCustomProperties ? { css: cssCustomProperties } : {}),
      ...(rectifiedStyleOptionsJSON ? { so: rectifiedStyleOptionsJSON } : {})

      // ws: protocolWebSocket + '',
      // ...(protocolAppServiceExtension ? { se: domainHost } : {}),
      // ...(speechRegion ? { speechregion: speechRegion } : {}),
      // userid: userId,
      // ...(speechSubscriptionKey ? { speechkey: speechSubscriptionKey } : {})
    });
  }, [
    conversationId,
    cssCustomProperties,
    domainHost,
    protocolAppServiceExtension,
    protocolWebSocket,
    rectifiedStyleOptionsJSON,
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
    <a className="webchat-link" href={webChatURL} rel="noopener noreferrer" target="_blank">
      Open Web Chat in a new window
    </a>
  ) : (
    <span className="webchat-link webchat-link--disabled">Open Web Chat in a new window</span>
  );
});

WebChatLink.displayName = 'WebChatLink';

export default WebChatLink;
