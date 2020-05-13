import { css } from 'glamor';
import React, { useCallback } from 'react';

import Row from './Row';

import isLocalhost from '../util/isLocalhost';
import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useAppServiceExtensionEnabled from '../data/hooks/useAppServiceExtensionEnabled';
import useWebSocketEnabled from '../data/hooks/useWebSocketEnabled';

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

const Protocol = () => {
  const [appServiceExtensionEnabled, setAppServiceExtensionEnabled] = useAppServiceExtensionEnabled();
  const [directLineDomainHost, setDirectLineDomainHost] = useDirectLineDomainHost('');
  const [webSocketEnabled, setWebSocketEnabled] = useWebSocketEnabled();

  const handleAppServiceExtensionChange = useCallback(
    ({ target: { checked } }) => setAppServiceExtensionEnabled(checked),
    [useAppServiceExtensionEnabled]
  );
  const handleDomainChange = useCallback(({ target: { value } }) => setDirectLineDomainHost(value || ''), [
    setDirectLineDomainHost
  ]);
  const handleWebSocketChange = useCallback(({ target: { checked } }) => setWebSocketEnabled(checked), [
    useWebSocketEnabled
  ]);

  return (
    <Row header="Protocol">
      <div>
        <label className={LABEL_CSS}>
          <input checked={webSocketEnabled} onChange={handleWebSocketChange} style={CHECKBOX_STYLE} type="checkbox" />
          &nbsp; Web Socket
        </label>
      </div>
      <div className={APP_SERVICE_EXTENSION_CSS}>
        <label className={LABEL_CSS}>
          <input
            checked={appServiceExtensionEnabled}
            disabled={!webSocketEnabled}
            onChange={handleAppServiceExtensionChange}
            style={CHECKBOX_STYLE}
            type="checkbox"
          />
          &nbsp; App Service Extension
        </label>
        <div style={DOMAIN_STYLE}>
          {appServiceExtensionEnabled && isLocalhost(directLineDomainHost) ? DOMAIN_PREFIX_INSECURE : DOMAIN_PREFIX}
          <input
            disabled={!appServiceExtensionEnabled}
            onChange={handleDomainChange}
            required={appServiceExtensionEnabled}
            style={DOMAIN_INPUT_STYLE}
            type="text"
            value={appServiceExtensionEnabled ? directLineDomainHost : ''}
          />
          {appServiceExtensionEnabled ? DOMAIN_SUFFIX_FOR_APP_SERVICE_EXTENSION : DOMAIN_SUFFIX}
        </div>
      </div>
    </Row>
  );
};

export default Protocol;
