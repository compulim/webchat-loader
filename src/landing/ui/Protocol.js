import { css } from 'glamor';
import React, { useCallback } from 'react';

import Row from './Row';

import useDirectLineDomainHost from '../data/hooks/useDirectLineDomainHost';
import useStreamingExtensionEnabled from '../data/hooks/useStreamingExtensionEnabled';
import useWebSocketEnabled from '../data/hooks/useWebSocketEnabled';

const DOMAIN_PREFIX = 'https://';
const DOMAIN_SUFFIX = '/v3/directline';
const DOMAIN_SUFFIX_FOR_STREAMING_EXTENSION = '/.bot/v3/directline';

const DOMAIN_INPUT_STYLE = { fontSize: 'inherit' };
const DOMAIN_STYLE = { fontSize: '80%' };

const CHECKBOX_STYLE = { margin: 0 };
const LABEL_CSS = css({
  alignItems: 'center',
  display: 'flex'
});

const STREAMING_EXTENSION_CSS = css({
});

const Protocol = () => {
  const [directLineDomainHost, setDirectLineDomainHost] = useDirectLineDomainHost();
  const [streamingExtensionEnabled, setStreamingExtensionEnabled] = useStreamingExtensionEnabled();
  const [webSocketEnabled, setWebSocketEnabled] = useWebSocketEnabled();

  const handleDomainChange = useCallback(({ target: { value } }) => setDirectLineDomainHost(value), [setDirectLineDomainHost]);
  const handleStreamingExtensionChange = useCallback(({ target: { checked } }) => setStreamingExtensionEnabled(checked), [useStreamingExtensionEnabled]);
  const handleWebSocketChange = useCallback(({ target: { checked } }) => setWebSocketEnabled(checked), [useWebSocketEnabled]);

  return (
    <Row header="Protocol">
      <div>
        <label className={ LABEL_CSS }>
          <input
            checked={ webSocketEnabled }
            onChange={ handleWebSocketChange }
            style={ CHECKBOX_STYLE }
            type="checkbox"
          />
          &nbsp;
          Web Socket
        </label>
      </div>
      <div className={ STREAMING_EXTENSION_CSS }>
        <label className={ LABEL_CSS }>
          <input
            checked={ streamingExtensionEnabled }
            disabled={ !webSocketEnabled }
            onChange={ handleStreamingExtensionChange }
            style={ CHECKBOX_STYLE }
            type="checkbox"
          />
          &nbsp;
          Streaming Extension
        </label>
        <div style={ DOMAIN_STYLE }>
          { DOMAIN_PREFIX }
          <input
            disabled={ !streamingExtensionEnabled }
            onChange={ handleDomainChange }
            required={ streamingExtensionEnabled }
            style={ DOMAIN_INPUT_STYLE }
            type="text"
            value={ streamingExtensionEnabled ? directLineDomainHost : '' }
          />
          { streamingExtensionEnabled ? DOMAIN_SUFFIX_FOR_STREAMING_EXTENSION : DOMAIN_SUFFIX }
        </div>
      </div>
    </Row>
  );
}

export default Protocol
