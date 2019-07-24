import React, { Fragment, useCallback, useMemo, useState } from 'react';

import caseInsensitiveCompare from '../util/caseInsensitiveCompare';
import generateDirectLineToken from '../util/generateDirectLineToken';
import tryParseJSON from '../util/tryParseJSON';

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
  const presetStyle = useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' }));
  const [savedSecretsString, setSavedSecretsString] = useState(window.localStorage.getItem('SAVED_SECRETS'));
  const savedSecrets = useMemo(() => (tryParseJSON(savedSecretsString) || []).sort(caseInsensitiveCompare), [savedSecretsString]);
  const setSavedSecrets = useCallback(secrets => setSavedSecretsString(JSON.stringify(secrets)), [setSavedSecretsString]);
  const userIdStyle = useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace` }));

  useMemo(() => window.localStorage.setItem('SAVED_SECRETS', savedSecretsString), [savedSecretsString]);

  return (
    <Fragment>
      <section className="row">
        <label style={{
          alignItems: 'flex-start',
          display: 'flex'
        }}>
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
                style={ presetStyle }
                type="text"
                value={ token || secret }
              />
            </div>
            {
              !token &&
                <div>
                  {
                    savedSecrets.map(secret =>
                      <Fragment key={ secret }>
                        <a
                          href="#"
                          onClick={ event => {
                            event.preventDefault();
                            onSecretChange(secret);
                          } }
                        >
                          <small><code>{ secret.substr(0, 5) }&hellip;</code></small>
                        </a>
                        <a
                          href="#"
                          onClick={ event => {
                            event.preventDefault();
                            setSavedSecrets(savedSecrets.filter(s => s !== secret));
                          } }
                        >
                          <small>[&times;]</small>
                        </a>
                        &nbsp;
                      </Fragment>
                    )
                  }
                  <a
                    href="#"
                    onClick={ event => {
                      event.preventDefault();
                      savedSecrets.includes(secret) || setSavedSecrets([...savedSecrets, secret]);
                    } }
                  >
                    <small>Save</small>
                  </a>
                </div>
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
            style={ userIdStyle }
            value={ userId }
          />
        </label>
      </section>
    </Fragment>
  );
};

export default Credential
