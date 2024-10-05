import './Protocol.css';

import { type ChangeEventHandler, Fragment, memo, useCallback } from 'react';

import useDirectLineAppServiceExtensionErrorReason from '../data/hooks/useDirectLineAppServiceExtensionErrorReason';
import useDirectLineAppServiceExtensionResponse from '../data/hooks/useDirectLineAppServiceExtensionResponse';
import useDirectLineAppServiceExtensionStatus from '../data/hooks/useDirectLineAppServiceExtensionStatus';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useDirectLineDomainURL from '../data/hooks/useDirectLineDomainURL';
import useProtocolAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolAppServiceExtensionInsecure from '../data/hooks/useProtocolAppServiceExtensionInsecure';
import useProtocolDirectLineSpeech from '../data/hooks/useProtocolDirectLineSpeech';
import useProtocolREST from '../data/hooks/useProtocolREST';
import useProtocolTranscript from '../data/hooks/useProtocolTranscript';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useTranscriptDialogVisible from '../data/hooks/useTranscriptDialogVisible';
import Row from './Row';

const DOMAIN_SUFFIX = '/v3/directline';
const DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION = '/.bot/v3/directline';

const Protocol = memo(() => {
  const [, setTranscriptDialogVisible] = useTranscriptDialogVisible();
  const [directLineAppServiceExtensionErrorReason] = useDirectLineAppServiceExtensionErrorReason();
  const [directLineAppServiceExtensionResponse] = useDirectLineAppServiceExtensionResponse();
  const [directLineAppServiceExtensionStatus] = useDirectLineAppServiceExtensionStatus();
  const [directLineDomainHost, setDirectLineDomainHost] = useDirectLineDomainHost();
  const [directLineDomainURL] = useDirectLineDomainURL();
  const [protocolAppServiceExtension, setProtocolAppServiceExtension] = useProtocolAppServiceExtension();
  const [protocolAppServiceExtensionInsecure, setProtocolAppServiceExtensionInsecure] =
    useProtocolAppServiceExtensionInsecure();
  const [protocolDirectLineSpeech, setProtocolDirectLineSpeech] = useProtocolDirectLineSpeech();
  const [protocolREST, setProtocolREST] = useProtocolREST();
  const [protocolTranscript, setProtocolTranscript] = useProtocolTranscript();
  const [protocolWebSocket, setProtocolWebSocket] = useProtocolWebSocket();
  const protocolAppServiceExtensionFamily = protocolAppServiceExtension || protocolAppServiceExtensionInsecure;

  const handleDomainChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setDirectLineDomainHost(value || ''),
    [setDirectLineDomainHost]
  );

  const handleEditTranscriptClick = useCallback(() => setTranscriptDialogVisible(true), [setTranscriptDialogVisible]);

  const handleProtocolClick = useCallback(() => {
    if (protocolAppServiceExtension) {
      setProtocolAppServiceExtensionInsecure();
    } else if (protocolAppServiceExtensionInsecure) {
      setProtocolAppServiceExtension();
    }
  }, [
    protocolAppServiceExtension,
    protocolAppServiceExtensionInsecure,
    setProtocolAppServiceExtension,
    setProtocolAppServiceExtensionInsecure
  ]);

  return (
    <Row header="Protocol" rowLabel={false}>
      <div>
        <label className="protocol-label">
          <input
            checked={protocolWebSocket}
            className="protocol-checkbox"
            name="protocol"
            onChange={setProtocolWebSocket}
            type="radio"
          />
          &nbsp; Direct Line via Web Socket
        </label>
      </div>
      <div>
        <label className="protocol-label">
          <input
            checked={protocolREST}
            className="protocol-checkbox"
            name="protocol"
            onChange={setProtocolREST}
            type="radio"
          />
          &nbsp; Direct Line via REST short-polling
        </label>
        {protocolREST && (
          <small className="protocol--red">This protocol is not recommended to use in production.</small>
        )}
      </div>
      <div>
        <label className="protocol-label">
          <input
            checked={protocolDirectLineSpeech}
            className="protocol-checkbox"
            name="protocol"
            onChange={setProtocolDirectLineSpeech}
            type="radio"
          />
          &nbsp; Direct Line Speech
        </label>
        {protocolDirectLineSpeech && <small>This protocol is supported since version 4.7.0.</small>}
      </div>
      <div>
        <label className="protocol-label">
          <input
            checked={protocolAppServiceExtension || protocolAppServiceExtensionInsecure}
            className="protocol-checkbox"
            name="protocol"
            onChange={setProtocolAppServiceExtension}
            type="radio"
          />
          &nbsp; Direct Line App Service Extension
        </label>
        {protocolAppServiceExtensionFamily && (
          <Fragment>
            <div className="protocol-domain-input">
              <button className="protocol-domain-input__protocol-button" onClick={handleProtocolClick}>
                {directLineDomainURL.protocol}//
              </button>
              <span className="protocol-domain-input__input-box">
                {/* @ts-ignore */}
                <nobr className="protocol-domain-input__doppelganger">
                  {protocolAppServiceExtensionFamily ? directLineDomainHost : ''}
                  {/* @ts-ignore */}
                </nobr>
                <input
                  className="protocol-domain-input__input"
                  disabled={!protocolAppServiceExtensionFamily}
                  onChange={handleDomainChange}
                  required={protocolAppServiceExtensionFamily}
                  type="text"
                  value={protocolAppServiceExtensionFamily ? directLineDomainHost : ''}
                />
              </span>
              {protocolAppServiceExtensionFamily ? DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION : DOMAIN_SUFFIX}
              <span
                title={
                  directLineAppServiceExtensionStatus === 'error'
                    ? directLineAppServiceExtensionErrorReason
                    : directLineAppServiceExtensionStatus === 'ready'
                    ? directLineAppServiceExtensionResponse
                    : undefined
                }
              >
                {' '}
                {directLineAppServiceExtensionStatus === 'error'
                  ? '❌'
                  : directLineAppServiceExtensionStatus === 'ready'
                  ? '🟢'
                  : '⌛'}
              </span>
            </div>
          </Fragment>
        )}
      </div>
      <div>
        <label className="protocol-label">
          <input
            checked={protocolTranscript}
            className="protocol-checkbox"
            name="protocol"
            onChange={setProtocolTranscript}
            type="radio"
          />
          &nbsp; Load from transcript &nbsp;
          <button disabled={!protocolTranscript} onClick={handleEditTranscriptClick} type="button">
            Edit
          </button>
        </label>
      </div>
    </Row>
  );
});

Protocol.displayName = 'Protocol';

export default Protocol;
