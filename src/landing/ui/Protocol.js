import { css } from 'emotion';
import classNames from 'classnames';
import React, { useCallback } from 'react';

import Row from './Row';

import isLocalhost from '../util/isLocalhost';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useProtocolAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolDirectLineSpeech from '../data/hooks/useProtocolDirectLineSpeech';
import useProtocolREST from '../data/hooks/useProtocolREST';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';

const DOMAIN_PREFIX = 'https://';
const DOMAIN_PREFIX_INSECURE = 'http://';
const DOMAIN_SUFFIX = '/v3/directline';
const DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION = '/.bot/v3/directline';

const DOMAIN_CSS = css({
  '&.domain': {
    fontSize: '80%',

    '& .domain__input': {
      backgroundColor: '#EEE',
      border: 0,
      fontFamily: 'inherit',
      fontSize: 'inherit',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    },

    '& .domain__input-box': {
      margin: 1,
      position: 'relative'
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

const Protocol = () => {
  const [directLineDomainHost, setDirectLineDomainHost] = useDirectLineDomainHost('');
  const [protocolAppServiceExtension, setProtocolAppServiceExtension] = useProtocolAppServiceExtension();
  const [protocolDirectLineSpeech, setProtocolDirectLineSpeech] = useProtocolDirectLineSpeech();
  const [protocolREST, setProtocolREST] = useProtocolREST();
  const [protocolWebSocket, setProtocolWebSocket] = useProtocolWebSocket();

  const handleDomainChange = useCallback(({ target: { value } }) => setDirectLineDomainHost(value || ''), [
    setDirectLineDomainHost
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
            checked={protocolAppServiceExtension}
            className={CHECKBOX_CSS}
            name="protocol"
            onChange={setProtocolAppServiceExtension}
            type="radio"
          />
          &nbsp; Direct Line App Service Extension
        </label>
        {protocolAppServiceExtension && (
          <div className={classNames(DOMAIN_CSS + '', 'domain')}>
            {protocolAppServiceExtension && isLocalhost(directLineDomainHost) ? DOMAIN_PREFIX_INSECURE : DOMAIN_PREFIX}
            <span className="domain__input-box">
              <nobr className="domain__doppelganger">{protocolAppServiceExtension ? directLineDomainHost : ''}</nobr>
              <input
                className="domain__input"
                disabled={!protocolAppServiceExtension}
                onChange={handleDomainChange}
                required={protocolAppServiceExtension}
                type="text"
                value={protocolAppServiceExtension ? directLineDomainHost : ''}
              />
            </span>
            {protocolAppServiceExtension ? DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION : DOMAIN_SUFFIX}
          </div>
        )}
        {protocolAppServiceExtension && <small>This protocol is not supported on all versions of Web Chat.</small>}
      </div>
    </Row>
  );
};

export default Protocol;
