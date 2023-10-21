import { css } from 'emotion';
import ms from 'ms';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Presets from './Presets';
import Row from './Row';
import tryDecodeJWT from '../util/tryDecodeJWT';
import useDirectLineSecret from '../data/hooks/useDirectLineSecret';
import useDirectLineToken from '../data/hooks/useDirectLineToken';
import useDirectLineUserId from '../data/hooks/useDirectLineUserId';
import useFetchDirectLineToken from '../data/hooks/useFetchDirectLineToken';
import useGenerateDirectLineToken from '../data/hooks/useGenerateDirectLineToken';
import useProtocolDirectLineAppServiceExtension from '../data/hooks/useProtocolAppServiceExtension';
import useProtocolDirectLineAppServiceExtensionInsecure from '../data/hooks/useProtocolAppServiceExtensionInsecure';
import useProtocolDirectLineSpeech from '../data/hooks/useProtocolDirectLineSpeech';
import useProtocolREST from '../data/hooks/useProtocolREST';
import useProtocolTranscript from '../data/hooks/useProtocolTranscript';
import useProtocolWebSocket from '../data/hooks/useProtocolWebSocket';
import useRefreshToken from '../data/hooks/useRefreshToken';
import useSavedDirectLineSecrets from '../data/hooks/useSavedDirectLineSecrets';

import type { ChangeEventHandler, FC, FocusEventHandler } from 'react';

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

const REFRESH_TOKEN_BUTTON_CSS = css({
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 0,
  color: 'rgba(0, 0, 238)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  padding: 0,
  textDecoration: 'underline'
});

const SECRET_AND_TOKEN_CSS = css({ flex: 1, fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' });

const DirectLineCredential: FC = () => {
  const fetchDirectLineToken = useFetchDirectLineToken();
  const generateDirectLineToken = useGenerateDirectLineToken();

  const [protocolDirectLineAppServiceExtension] = useProtocolDirectLineAppServiceExtension();
  const [protocolDirectLineAppServiceExtensionInsecure] = useProtocolDirectLineAppServiceExtensionInsecure();
  const [protocolDirectLineSpeech] = useProtocolDirectLineSpeech();
  const [protocolREST] = useProtocolREST();
  const [protocolTranscript] = useProtocolTranscript();
  const [protocolWebSocket] = useProtocolWebSocket();
  const [savedSecrets, saveSecret, removeSavedSecret] = useSavedDirectLineSecrets();
  const [secret, setSecret] = useDirectLineSecret();
  const [token, setToken] = useDirectLineToken();
  const [userId] = useDirectLineUserId();
  const refreshToken = useRefreshToken();
  const tokenFromURL = /^https?:/.test(secret);

  const savedSecretsTexts = useMemo<readonly (string | (() => string))[]>(
    () =>
      Object.freeze([
        'MockBot',
        'MockBot3',
        'Relay Bot',
        ...savedSecrets.map(secret => () => (secret || '').substr(0, 5) + '…')
      ]),
    [savedSecrets]
  );

  const handleClearSecretClick = useCallback<() => void>(() => setSecret(''), [setSecret]);
  const handleClearTokenClick = useCallback<() => void>(() => setToken(''), [setToken]);
  const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>(({ target }) => target.select(), []);
  const handleLoadSecret = useCallback<(value: string) => void>(
    value => {
      if (value === '#mockbot') {
        setSecret('https://webchat-mockbot.azurewebsites.net/directline/token');
        fetchDirectLineToken();
      } else if (value === '#mockbot3') {
        setSecret('https://webchat-mockbot3.azurewebsites.net/api/token/directline');
        fetchDirectLineToken();
      } else if (value === '#relay-bot') {
        setSecret('https://webchat-relaybot.azurewebsites.net/api/token/directline');
        fetchDirectLineToken();
      } else {
        setSecret(value);
        setToken('');
      }
    },
    [fetchDirectLineToken, setSecret, setToken]
  );
  const handleSaveSecret = useCallback<() => void>(() => saveSecret(secret), [saveSecret]);
  const handleSecretChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setSecret(value),
    [setSecret]
  );
  const handleTokenChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setToken(value),
    [setToken]
  );

  const secretDisabled = !!token || !!protocolDirectLineSpeech || !!protocolTranscript;
  const tokenDisabled = !!protocolDirectLineSpeech || !!protocolTranscript;
  const decodedToken = tryDecodeJWT<{ exp: number; iss: string }>(token);
  const timeToExpire = decodedToken && decodedToken.exp * 1000 - Date.now();

  const validDirectLineAppServiceExtensionToken =
    !decodedToken || decodedToken.iss === 'https://directlineextension.botframework.com/';
  const validDirectLineToken = !decodedToken || decodedToken.iss === 'https://directline.botframework.com/';

  const [, setForceRender] = useState<{}>();

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
          <button disabled={!secret || !!token} onClick={handleClearSecretClick} type="button">
            &times;
          </button>
          &nbsp;
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
        <Presets
          onDelete={removeSavedSecret}
          onLoad={handleLoadSecret}
          onSave={secret && !savedSecrets.includes(secret) ? handleSaveSecret : undefined}
          texts={savedSecretsTexts}
          values={useMemo(() => ['#mockbot', '#mockbot3', '#relay-bot', ...savedSecrets], [savedSecrets])}
        />
      </Row>
      <Row header="Token">
        <div className={INPUT_ROW_CSS}>
          <input
            className={SECRET_AND_TOKEN_CSS}
            disabled={tokenDisabled}
            onChange={handleTokenChange}
            onFocus={handleFocus}
            placeholder={tokenFromURL ? '<Click "Fetch token">' : ''}
            required={tokenFromURL || !secret}
            title={decodedToken && JSON.stringify(decodedToken, null, 2)}
            type="text"
            value={token}
          />
          <button disabled={!token} onClick={handleClearTokenClick} type="button">
            Clear
          </button>
        </div>
        {(protocolDirectLineAppServiceExtension || protocolDirectLineAppServiceExtensionInsecure) &&
          !validDirectLineAppServiceExtensionToken && (
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
          (!decodedToken ? (
            <div className={EXPIRED_FOOTNOTE_CSS}>
              <small>This token is not a valid JSON Web Token.</small>
            </div>
          ) : timeToExpire && timeToExpire > 0 ? (
            <div>
              <small>
                This token will expire in {ms(timeToExpire, { long: true })}.{' '}
                <button
                  className={REFRESH_TOKEN_BUTTON_CSS}
                  onClick={refreshToken}
                  title="Auto refresh when expire in 20 minutes"
                  type="button"
                >
                  Refresh now
                </button>
              </small>
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

export default DirectLineCredential;
