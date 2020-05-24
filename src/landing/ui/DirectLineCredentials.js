import { css } from 'glamor';
import { decode } from 'jsonwebtoken';
import ms from 'ms';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useFetchDirectLineToken from '../data/hooks/useFetchDirectLineToken';
import useGenerateDirectLineToken from '../data/hooks/useGenerateDirectLineToken';
import useProtocolDirectLineAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolDirectLineSpeech from '../data/hooks/useProtocolDirectLineSpeech';
import useProtocolREST from '../data/hooks/useProtocolREST';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useSavedDirectLineSecrets from '../data/hooks/useSavedDirectLineSecrets';

import Presets from './Presets';
import Row from './Row';

const EXPIRED_FOOTNOTE_CSS = css({ color: 'Red' });
const INPUT_ROW_CSS = css({
  display: 'flex',
  flex: 1,
  position: 'relative',

  '& > input:invalid': {
    borderColor: 'Red',
    borderStyle: 'solid',
    borderWidth: 1
  }
});
const SECRET_AND_TOKEN_CSS = css({ flex: 1, fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' });

const Credential = () => {
  const fetchDirectLineToken = useFetchDirectLineToken();
  const generateDirectLineToken = useGenerateDirectLineToken();

  const [protocolDirectLineAppServiceExtension] = useProtocolDirectLineAppServiceExtension();
  const [protocolDirectLineSpeech] = useProtocolDirectLineSpeech();
  const [protocolREST] = useProtocolREST();
  const [protocolWebSocket] = useProtocolWebSocket();
  const [savedSecrets, saveSecret, removeSavedSecret] = useSavedDirectLineSecrets();
  const [secret, setSecret] = useDirectLineSecret();
  const [token, setToken] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const tokenFromURL = /^https?:/.test(secret);

  const savedSecretsTexts = useMemo(
    () => savedSecrets.map(secret => () => <code>{(secret || '').substr(0, 5) + '…'}</code>),
    [savedSecrets]
  );

  const handleClearTokenClick = useCallback(() => setToken(''), [setToken]);
  const handleFocus = useCallback(({ target }) => target.select());
  const handleLoadMockBotToken = useCallback(
    event => {
      event.preventDefault();
      setSecret('https://webchat-mockbot.azurewebsites.net/directline/token');
      fetchDirectLineToken();
    },
    [fetchDirectLineToken, setSecret]
  );
  const handleLoadSecret = useCallback(
    value => {
      setSecret(value);
      setToken('');
    },
    [setSecret]
  );
  const handleSaveSecret = useCallback(() => saveSecret(secret));
  const handleSecretChange = useCallback(({ target: { value } }) => setSecret(value), [setSecret]);
  const handleTokenChange = useCallback(({ target: { value } }) => setToken(value), [setToken]);

  const secretDisabled = !!token || !!protocolDirectLineSpeech;
  const tokenDisabled = !!protocolDirectLineSpeech;
  const decodedToken = decode(token);
  const timeToExpire = decodedToken && decodedToken.exp * 1000 - Date.now();

  const validDirectLineAppServiceExtensionToken =
    !decodedToken || decodedToken.iss === 'https://directlineextension.botframework.com/';
  const validDirectLineToken = !decodedToken || decodedToken.iss === 'https://directline.botframework.com/';

  const [, setForceRender] = useState();

  useEffect(() => {
    if (decodedToken) {
      const timeout = setTimeout(() => setForceRender({}), 60000);

      return () => clearTimeout(timeout);
    }
  }, [decodedToken]);

  return (
    <React.Fragment>
      <Row header={tokenFromURL ? 'Token URL' : 'Secret'}>
        <div className={INPUT_ROW_CSS}>
          <input
            className={SECRET_AND_TOKEN_CSS}
            disabled={secretDisabled}
            onChange={handleSecretChange}
            onFocus={handleFocus}
            placeholder={token ? '<No secret>' : ''}
            required={!secretDisabled}
            title={
              secretDisabled
                ? 'You cannot set secret when token is set.\n\nPlease clear token first.'
                : tokenFromURL
                ? `Will POST to this endpoint for either JSON or text depends on "Content-Type" header.\n\n"{userid}" will be replaced by generated user ID "${userId}".`
                : ''
            }
            type="text"
            value={secret}
          />
          {tokenFromURL ? (
            <button disabled={!!token} onClick={fetchDirectLineToken} type="button">
              Fetch token
            </button>
          ) : (
            <button disabled={!secret || !!token} onClick={generateDirectLineToken} type="button">
              Generate token
            </button>
          )}
        </div>
        <small>
          <a href="#" onClick={handleLoadMockBotToken}>
            MockBot
          </a>
          &nbsp;
          <Presets
            onDelete={removeSavedSecret}
            onLoad={handleLoadSecret}
            onSave={secret && !savedSecrets.includes(secret) ? handleSaveSecret : undefined}
            texts={savedSecretsTexts}
            values={savedSecrets}
          />
        </small>
      </Row>
      <Row header="Token">
        <div className={INPUT_ROW_CSS}>
          <input
            className={SECRET_AND_TOKEN_CSS}
            disabled={tokenDisabled}
            onChange={handleTokenChange}
            onFocus={handleFocus}
            required={tokenFromURL}
            title={decodedToken && JSON.stringify(decodedToken, null, 2)}
            type="text"
            value={token}
          />
          <button disabled={!token} onClick={handleClearTokenClick} type="button">
            Clear
          </button>
        </div>
        {protocolDirectLineAppServiceExtension && !validDirectLineAppServiceExtensionToken && (
          <div className={EXPIRED_FOOTNOTE_CSS}>
            <small>This token is not for Direct Line App Service Extension.</small>
          </div>
        )}
        {(protocolREST || protocolWebSocket) && !validDirectLineToken && (
          <div className={EXPIRED_FOOTNOTE_CSS}>
            <small>This token is not for Direct Line channel.</small>
          </div>
        )}
        {secretDisabled &&
          !tokenDisabled &&
          (timeToExpire > 0 ? (
            <div>
              <small>This token will expire in {ms(timeToExpire, { long: true })}.</small>
            </div>
          ) : (
            <div className={EXPIRED_FOOTNOTE_CSS}>
              <small>This token has already expired.</small>
            </div>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default Credential;
