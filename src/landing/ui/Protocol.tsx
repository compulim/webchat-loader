import { css } from 'emotion';
import classNames from 'classnames';
import React, { ChangeEventHandler, Fragment, useCallback } from 'react';

import Row from './Row';

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

import type { FC } from 'react';

const DOMAIN_SUFFIX = '/v3/directline';
const DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION = '/.bot/v3/directline';

const DOMAIN_CSS = css({
  '&.domain': {
    fontSize: '80%',

    '& .domain__doppelganger, & .domain__input': {
      border: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      padding: 0
    },

    '& .domain__input': {
      backgroundColor: '#EEE',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },

    '& .domain__input-box': {
      margin: '1px 2px',
      position: 'relative'
    },

    '& .domain__protocol-button': {
      appearance: 'none',
      background: 'transparent',
      border: 0,
      fontSize: 'inherit',
      padding: 0
    }
  }
});

const APP_SERVICE_EXTENSION_CSS = css({});
const CHECKBOX_CSS = css({ margin: 0 });
const LABEL_CSS = css({
  alignItems: 'center',
  display: 'flex'
});
const RED_CSS = css({ color: 'Red' });

const Protocol: FC = () => {
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
        <label className={LABEL_CSS}>
          <input
            checked={protocolWebSocket}
            className={CHECKBOX_CSS}
            name="protocol"
            onChange={setProtocolWebSocket}
            type="radio"
          />
          &nbsp; Direct Line via Web Socket
        </label>
      </div>
      <div>
        <label className={LABEL_CSS}>
          <input
            checked={protocolREST}
            className={CHECKBOX_CSS}
            name="protocol"
            onChange={setProtocolREST}
            type="radio"
          />
          &nbsp; Direct Line via REST short-polling
        </label>
        {protocolREST && <small className={RED_CSS}>This protocol is not recommended to use in production.</small>}
      </div>
      <div>
        <label className={LABEL_CSS}>
          <input
            checked={protocolDirectLineSpeech}
            className={CHECKBOX_CSS}
            name="protocol"
            onChange={setProtocolDirectLineSpeech}
            type="radio"
          />
          &nbsp; Direct Line Speech
        </label>
        {protocolDirectLineSpeech && <small>This protocol is supported since version 4.7.0.</small>}
      </div>
      <div className={APP_SERVICE_EXTENSION_CSS}>
        <label className={LABEL_CSS}>
          <input
            checked={protocolAppServiceExtension || protocolAppServiceExtensionInsecure}
            className={CHECKBOX_CSS}
            name="protocol"
            onChange={setProtocolAppServiceExtension}
            type="radio"
          />
          &nbsp; Direct Line App Service Extension
        </label>
        {protocolAppServiceExtensionFamily && (
          <Fragment>
            <div className={classNames(DOMAIN_CSS + '', 'domain')}>
              <button className="domain__protocol-button" onClick={handleProtocolClick}>
                {directLineDomainURL.protocol}//
              </button>
              <span className="domain__input-box">
                {/* @ts-ignore */}
                <nobr className="domain__doppelganger">
                  {protocolAppServiceExtensionFamily ? directLineDomainHost : ''}
                  {/* @ts-ignore */}
                </nobr>
                <input
                  className="domain__input"
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
        <label className={LABEL_CSS}>
          <input
            checked={protocolTranscript}
            className={CHECKBOX_CSS}
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
};

export default Protocol;
