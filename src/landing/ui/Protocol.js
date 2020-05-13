import { css } from 'glamor';
import React, { useCallback } from 'react';

import Row from './Row';

import isLocalhost from '../util/isLocalhost';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useProtocolAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolREST from '../data/hooks/useProtocolREST';

const DOMAIN_PREFIX = 'https://';
const DOMAIN_PREFIX_INSECURE = 'http://';
const DOMAIN_SUFFIX = '/v3/directline';
const DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION = '/.bot/v3/directline';

const DOMAIN_INPUT_STYLE = { fontSize: 'inherit' };
const DOMAIN_STYLE = { fontSize: '80%' };

const APP_SERVICE_EXTENSION_CSS = css({});
const CHECKBOX_STYLE = { margin: 0 };
const LABEL_CSS = css({
  alignItems: 'center',
  display: 'flex'
});
const RED_CSS = css({ color: 'Red' });

const Protocol = () => {
  const [directLineDomainHost, setDirectLineDomainHost] = useDirectLineDomainHost('');
  const [protocolAppServiceExtension, setProtocolAppServiceExtension] = useProtocolAppServiceExtension();
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
            name="protocol"
            onChange={setProtocolWebSocket}
            style={CHECKBOX_STYLE}
            type="radio"
          />
          &nbsp; Direct Line via Web Socket
        </label>
      </div>
      <div>
        <label className={LABEL_CSS}>
          <input
            checked={protocolREST}
            name="protocol"
            onChange={setProtocolREST}
            style={CHECKBOX_STYLE}
            type="radio"
          />
          &nbsp; Direct Line via REST short-polling
        </label>
        {protocolREST && <small className={RED_CSS}>This protocol is not recommended to use in production.</small>}
      </div>
      <div className={APP_SERVICE_EXTENSION_CSS}>
        <label className={LABEL_CSS}>
          <input
            checked={protocolAppServiceExtension}
            name="protocol"
            onChange={setProtocolAppServiceExtension}
            style={CHECKBOX_STYLE}
            type="radio"
          />
          &nbsp; Direct Line App Service Extension
        </label>
        <div style={DOMAIN_STYLE}>
          {protocolAppServiceExtension && isLocalhost(directLineDomainHost) ? DOMAIN_PREFIX_INSECURE : DOMAIN_PREFIX}
          <input
            disabled={!protocolAppServiceExtension}
            onChange={handleDomainChange}
            required={protocolAppServiceExtension}
            style={DOMAIN_INPUT_STYLE}
            type="text"
            value={protocolAppServiceExtension ? directLineDomainHost : ''}
          />
          {protocolAppServiceExtension ? DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION : DOMAIN_SUFFIX}
        </div>
        {protocolAppServiceExtension && <small>This protocol is not supported on all versions of Web Chat.</small>}
      </div>
    </Row>
  );
};

export default Protocol;
