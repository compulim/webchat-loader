import './SpeechCredentials.css';

import ms from 'ms';
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  Fragment,
  type MouseEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { looseObject, number, safeParse } from 'valibot';

import useFetchSpeechAuthorizationToken from '../data/hooks/useFetchSpeechAuthorizationToken';
import useGenerateSpeechAuthorizationToken from '../data/hooks/useGenerateSpeechAuthorizationToken';
import useSavedSpeechSubscriptionKeys from '../data/hooks/useSavedSpeechSubscriptionKeys';
import useSpeechAuthorizationToken from '../data/hooks/useSpeechAuthorizationToken';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';
import isURL from '../util/isURL';
import tryDecodeJWT from '../util/tryDecodeJWT';
import Presets from './Presets';
import Row from './Row';

const REGIONS: Readonly<Record<string, string>> = Object.freeze({
  browser: 'Browser',
  westus: 'West US',
  westus2: 'West US 2',
  eastus: 'East US',
  eastus2: 'East US 2',
  centralus: 'Central US',
  northcentralus: 'North Central US',
  southcentralus: 'South Central US',
  centralindia: 'Central India',
  eastasia: 'East Asia',
  southeastasia: 'Southeast Asia',
  japaneast: 'Japan East',
  koreacentral: 'Korea Central',
  australiaeast: 'Australia East',
  canadacentral: 'Canada Central',
  northeurope: 'North Europe',
  westeurope: 'West Europe',
  uksouth: 'UK South',
  francecentral: 'France Central'
});

const SpeechCredentials = memo(() => {
  const [authorizationToken, setAuthorizationToken] = useSpeechAuthorizationToken();
  const [region, setRegion] = useSpeechRegion();
  const [savedSubscriptionKeys, saveSubscriptionKey, removeSavedSubscriptionKey] = useSavedSpeechSubscriptionKeys();
  const [subscriptionKey, setSubscriptionKey] = useSpeechSubscriptionKey();
  const fetchAuthorizationToken = useFetchSpeechAuthorizationToken();
  const generateAuthorizationToken = useGenerateSpeechAuthorizationToken();

  const handleClearSubscriptionKeyClick = useCallback(() => {
    setSubscriptionKey('');
  }, [setSubscriptionKey]);
  const handleLoadSubscriptionKey = useCallback<(subscriptionKey: string) => void>(
    subscriptionKey => {
      if (region === 'browser') {
        return;
      }

      if (subscriptionKey === '#mockbot') {
        setSubscriptionKey('https://webchat-mockbot.azurewebsites.net/speechservices/token');
        fetchAuthorizationToken();
      } else {
        setAuthorizationToken('');
        setSubscriptionKey(subscriptionKey);
      }
    },
    [fetchAuthorizationToken, region, setAuthorizationToken, setSubscriptionKey]
  );

  const handleAuthorizationTokenChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setAuthorizationToken(value),
    [setAuthorizationToken]
  );
  const handleAuthorizationTokenFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target }) => target.select(),
    []
  );
  const handleClearAuthorizationTokenClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    () => setAuthorizationToken(''),
    [setAuthorizationToken]
  );
  const handleRegionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ target: { value } }) => setRegion(value),
    [setRegion]
  );
  const handleSaveSubscriptionKey = useCallback<() => void>(
    () => saveSubscriptionKey(subscriptionKey),
    [subscriptionKey]
  );
  const handleSubscriptionKeyChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setSubscriptionKey(value),
    [setSubscriptionKey]
  );
  const handleSubscriptionKeyFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target }) => target.select(),
    []
  );
  const subscriptionKeyIsURL = isURL(subscriptionKey);

  const handleLoadRegion = useCallback<(region: string) => void>(
    region => {
      if (region === 'browser' || !subscriptionKeyIsURL) {
        setRegion(region);
      }
    },
    [setRegion, subscriptionKeyIsURL]
  );

  const decodedAuthorizationTokenResult = safeParse(
    looseObject({ exp: number() }),
    tryDecodeJWT(authorizationToken.includes('aad#') ? authorizationToken.split('#')[2] : authorizationToken)
  );

  const decodedAuthorizationToken = decodedAuthorizationTokenResult.success
    ? decodedAuthorizationTokenResult.output
    : undefined;

  const timeToExpire = decodedAuthorizationToken && decodedAuthorizationToken.exp * 1000 - Date.now();

  const [, setForceRender] = useState<{}>();

  useEffect(() => {
    if (decodedAuthorizationToken) {
      const timeout = setTimeout(() => setForceRender({}), 60000);

      return () => clearTimeout(timeout);
    }
  }, [decodedAuthorizationToken]);

  return (
    <Fragment>
      <Row header="Speech region">
        <div className="speech-credentials__row">
          <div className="speech-credentials__input-row">
            <select
              className="speech-credentials__region-select"
              disabled={subscriptionKeyIsURL}
              onChange={handleRegionChange}
              title={subscriptionKeyIsURL ? 'Clear token URL to select region.' : undefined}
              value={region}
            >
              {Object.keys(REGIONS).map(value => (
                <option key={value} value={value}>
                  {REGIONS[value]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Presets
              onLoad={handleLoadRegion}
              texts={useMemo(() => Object.freeze(['West US', 'West US 2', 'East US', 'Browser']), [])}
              values={useMemo(() => Object.freeze(['westus', 'westus2', 'eastus', 'browser']), [])}
            />
          </div>
        </div>
      </Row>
      <Row header={subscriptionKeyIsURL ? 'Token URL' : 'Speech key'}>
        <div className="speech-credentials__row">
          <div className="speech-credentials__input-row">
            <input
              className="speech-credentials__input"
              disabled={!!authorizationToken || region === 'browser'}
              onChange={handleSubscriptionKeyChange}
              onFocus={handleSubscriptionKeyFocus}
              title={
                authorizationToken
                  ? 'You cannot set subscription key when authorization token is set.\n\nPlease clear authorization token first.'
                  : subscriptionKeyIsURL
                  ? `Will POST to this endpoint for either JSON or text depends on "Content-Type" header.`
                  : undefined
              }
              value={subscriptionKey}
            />
            <button
              disabled={!subscriptionKey || !!authorizationToken}
              onClick={handleClearSubscriptionKeyClick}
              type="button"
            >
              &times;
            </button>
            &nbsp;
            {subscriptionKeyIsURL ? (
              <button disabled={!!authorizationToken} onClick={fetchAuthorizationToken} type="button">
                Fetch token
              </button>
            ) : (
              <button
                disabled={!subscriptionKey || !!authorizationToken}
                onClick={generateAuthorizationToken}
                type="button"
              >
                Generate token
              </button>
            )}
          </div>
          <div>
            <Presets
              onDelete={removeSavedSubscriptionKey}
              onLoad={handleLoadSubscriptionKey}
              onSave={
                subscriptionKey && !savedSubscriptionKeys.includes(subscriptionKey)
                  ? handleSaveSubscriptionKey
                  : undefined
              }
              texts={useMemo(
                () => ['MockBot', ...savedSubscriptionKeys.map(key => () => (key || '').substr(0, 5) + '…')],
                [savedSubscriptionKeys]
              )}
              values={['#mockbot', ...savedSubscriptionKeys]}
            />
          </div>
        </div>
      </Row>
      <Row header="Speech token">
        <div className="speech-credentials__row">
          <div className="speech-credentials__input-row">
            <input
              className="speech-credentials__input"
              disabled={region === 'browser'}
              onChange={handleAuthorizationTokenChange}
              onFocus={handleAuthorizationTokenFocus}
              required={subscriptionKeyIsURL}
              title={decodedAuthorizationToken ? JSON.stringify(decodedAuthorizationToken, null, 2) : undefined}
              value={authorizationToken}
            />
            <button disabled={!authorizationToken} onClick={handleClearAuthorizationTokenClick} type="button">
              Clear
            </button>
          </div>
        </div>
        {!!authorizationToken &&
          (timeToExpire && timeToExpire > 0 ? (
            <div>
              <small>This token will expire in {ms(timeToExpire, { long: true })}.</small>
            </div>
          ) : (
            <div className="speech-credentials--red">
              <small>This token has already expired.</small>
            </div>
          ))}
      </Row>
    </Fragment>
  );
});

SpeechCredentials.displayName = 'SpeechCredentials';

export default SpeechCredentials;
