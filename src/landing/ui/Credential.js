import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

import caseInsensitiveCompare from '../util/caseInsensitiveCompare';
import generateDirectLineToken from '../util/generateDirectLineToken';
import Presets from './Presets';
import useStateWithLocalStorage from '../util/useStateWithLocalStorage';
import fetchMockBotDirectLineToken from '../util/fetchMockBotDirectLineToken';

const Credential = ({
  onSecretChange,
  onTokenChange,
  onUserIdChange,
  secret,
  token,
  userId
}) => {
  const handleFocus = useCallback(({ target }) => target.select());
  const handleSecretChange = useCallback(({ target: { value } }) => onSecretChange(value), [onSecretChange, token]);

  const [savedSecrets, setSavedSecrets] = useStateWithLocalStorage([], 'SAVED_SECRETS');

  const [mockBotDirectLineToken, setMockBotDirectLineToken] = useState();
  const savedSecretsIncludeMockBot = useMemo(() => [...(mockBotDirectLineToken ? ['__MOCKBOT__'] : []), ...savedSecrets], [mockBotDirectLineToken, savedSecrets]);

  useEffect(() => {
    fetchMockBotDirectLineToken().then(setMockBotDirectLineToken);
  }, [setMockBotDirectLineToken]);

  const handleDeleteSavedSecret = useCallback(value => setSavedSecrets(savedSecrets.filter(secret => secret !== value), [savedSecrets]));
  const handleLoadSecret = useCallback(value => {
    if (value === '__MOCKBOT__') {
      onTokenChange(mockBotDirectLineToken);
    } else {
      onSecretChange(value);
    }
  });
  const handleSaveSecret = useCallback(() => setSavedSecrets([...savedSecrets.filter(s => s !== secret), secret].sort(caseInsensitiveCompare)), [savedSecrets, secret]);
  const savedRedactedSecrets = useMemo(() => [
    ...(mockBotDirectLineToken ? ['MockBot'] : []),
    ...savedSecrets.map(secret => () => <code>{ (secret || '').substr(0, 5) + '…' }</code>)
  ], [mockBotDirectLineToken, savedSecrets]);

  const handleGenerateTokenClick = useCallback(async () => {
    const { token, userId } = await generateDirectLineToken(secret);

    onTokenChange(token);
    onUserIdChange(userId);
  }, [onTokenChange, onUserIdChange]);

  const handleUseSecretClick = useCallback(() => {
    onTokenChange('');
    onUserIdChange(`r_${ Math.random().toString(36).substr(2) }`);
  }, [onTokenChange, onUserIdChange]);

  return (
    <Fragment>
      <section className="row">
        <label style={ useMemo(() => ({ alignItems: 'flex-start', display: 'flex' })) }>
          <span>{ token ? 'Token' : 'Secret' }</span>
          <div style={ useMemo(() => ({ flex: 1 })) }>
            <div>
              <input
                autoComplete={ token ? 'off' : 'on' }
                name={ token ? 'DIRECT_LINE_TOKEN' : 'DIRECT_LINE_SECRET' }
                onChange={ token ? undefined : handleSecretChange }
                onFocus={ handleFocus }
                readOnly={ !!token }
                required={ true }
                style={ useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em', width: 'calc(100% - 1em)' })) }
                type="text"
                value={ token || secret }
              />
            </div>
            {
              !token &&
                <Presets
                  onDelete={ handleDeleteSavedSecret }
                  onLoad={ handleLoadSecret }
                  onSave={ handleSaveSecret }
                  texts={ savedRedactedSecrets }
                  values={ savedSecretsIncludeMockBot }
                />
            }
          </div>
          {
            token ?
              <button
                onClick={ handleUseSecretClick }
                type="button"
              >
                Use secret
              </button>
            :
              <button
                onClick={ handleGenerateTokenClick }
                type="button"
              >
                Generate token
              </button>
          }
        </label>
      </section>
      <section className="row">
        <label>
          <header>User ID</header>
          <input
            onFocus={ handleFocus }
            readOnly={ true }
            style={ useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace` })) }
            value={ userId }
          />
        </label>
      </section>
    </Fragment>
  );
};

export default Credential
