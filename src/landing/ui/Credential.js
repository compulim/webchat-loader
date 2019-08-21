import React, { Fragment, useCallback, useMemo, useState } from 'react';

import caseInsensitiveCompare from '../util/caseInsensitiveCompare';
import generateDirectLineToken from '../util/generateDirectLineToken';
import Presets from './Presets';
import tryParseJSON from '../util/tryParseJSON';
import useStateWithLocalStorage from '../util/useStateWithLocalStorage';

const Credential = ({
  onSecretChange,
  onTokenChange,
  onUserIdChange,
  secret,
  token,
  userId
}) => {
  useMemo(async () => {
    const { token, userId } = await generateDirectLineToken(secret);
    // const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
    // const { token, userID } = await res.json();
  }, [secret]);

  const handleFocus = useCallback(({ target }) => target.select());
  const handleSecretChange = useCallback(({ target: { value } }) => onSecretChange(value), [onSecretChange, token]);

  const [savedSecrets, setSavedSecrets] = useStateWithLocalStorage([], 'SAVED_SECRETS');

  const handleDeleteSavedSecret = useCallback(value => setSavedSecrets(savedSecrets.filter(secret => secret !== value), [savedSecrets]));
  const handleSaveSecret = useCallback(() => setSavedSecrets([...savedSecrets.filter(s => s !== secret), secret].sort(caseInsensitiveCompare)), [savedSecrets, secret]);
  const savedRedactedSecrets = useMemo(() => savedSecrets.map(secret => () => <code>{ (secret || '').substr(0, 5) + '…' }</code>, [savedSecrets]));

  return (
    <Fragment>
      <section className="row">
        <label style={ useMemo(() => ({ alignItems: 'flex-start', display: 'flex' })) }>
          <span>{ token ? 'Token' : 'Secret' }</span>
          <div>
            <div>
              <input
                autoComplete={ token ? 'off' : 'on' }
                name={ token ? 'DIRECT_LINE_TOKEN' : 'DIRECT_LINE_SECRET' }
                onChange={ token ? undefined : handleSecretChange }
                onFocus={ handleFocus }
                readOnly={ !!token }
                required={ true }
                style={ useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' })) }
                type="text"
                value={ token || secret }
              />
            </div>
            {
              !token &&
                <Presets
                  onDelete={ handleDeleteSavedSecret }
                  onLoad={ onSecretChange }
                  onSave={ handleSaveSecret }
                  texts={ savedRedactedSecrets }
                  values={ savedSecrets }
                />
            }
          </div>
          {
            token ?
              <button
                onClick={ () => {
                  onTokenChange('');
                  onUserIdChange(`r_${ Math.random().toString(36).substr(2) }`);
                } }
                type="button"
              >
                Use secret
              </button>
            :
              <button
                onClick={ async () => {
                  const { token, userId } = await generateDirectLineToken(secret);

                  onTokenChange(token);
                  onUserIdChange(userId);
                } }
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
