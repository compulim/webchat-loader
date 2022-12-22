import { css } from 'emotion';
import ms from 'ms';
import React, {
  ChangeEvent,
  FocusEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import useFetchSpeechAuthorizationToken from '../data/hooks/useFetchSpeechAuthorizationToken';
import useGenerateSpeechAuthorizationToken from '../data/hooks/useGenerateSpeechAuthorizationToken';
import useSpeechAuthorizationToken from '../data/hooks/useSpeechAuthorizationToken';
import useSavedSpeechSubscriptionKeys from '../data/hooks/useSavedSpeechSubscriptionKeys';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';

import isURL from '../util/isURL';
import Presets from './Presets';
import Row from './Row';
import tryDecodeJWT from '../util/tryDecodeJWT';

import type { ChangeEventHandler, FC } from 'react';

const INPUT_CSS = css({ flex: 1, fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' });
const INPUT_ROW_CSS = css({
  display: 'flex',

  '& > input:invalid': {
    borderColor: 'Red',
    borderStyle: 'solid',
    borderWidth: 1
  }
});
const RED_CSS = css({ color: 'Red' });
const REGION_SELECT_CSS = css({ flex: 1 });
const ROW_CSS = css({ flex: 1 });

const REGIONS: Record<string, string> = {
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
};

const SpeechCredentials: FC = () => {
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
      if (subscriptionKey === '#mockbot') {
        setSubscriptionKey('https://webchat-mockbot.azurewebsites.net/speechservices/token');
        fetchAuthorizationToken();
      } else {
        setAuthorizationToken('');
        setSubscriptionKey(subscriptionKey);
      }
    },
    [fetchAuthorizationToken, setAuthorizationToken, setSubscriptionKey]
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

  const decodedAuthorizationToken = tryDecodeJWT<{ exp: number }>(authorizationToken);
  const timeToExpire = decodedAuthorizationToken && decodedAuthorizationToken.exp * 1000 - Date.now();

  const [, setForceRender] = useState<{}>();

  useEffect(() => {
    if (decodedAuthorizationToken) {
      const timeout = setTimeout(() => setForceRender({}), 60000);

      return () => clearTimeout(timeout);
    }
  }, [decodedAuthorizationToken]);

  return (
    <React.Fragment>
      <Row header="Speech region">
        <div className={ROW_CSS}>
          <div className={INPUT_ROW_CSS}>
            <select
              className={REGION_SELECT_CSS}
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
              onLoad={subscriptionKeyIsURL ? undefined : setRegion}
              texts={useMemo(() => ['West US', 'West US 2', 'East US'], [])}
              values={useMemo(() => ['westus', 'westus2', 'eastus'], [])}
            />
          </div>
        </div>
      </Row>
      <Row header={subscriptionKeyIsURL ? 'Token URL' : 'Speech key'}>
        <div className={ROW_CSS}>
          <div className={INPUT_ROW_CSS}>
            <input
              className={INPUT_CSS}
              disabled={!!authorizationToken}
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
        <div className={ROW_CSS}>
          <div className={INPUT_ROW_CSS}>
            <input
              className={INPUT_CSS}
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
            <div className={RED_CSS}>
              <small>This token has already expired.</small>
            </div>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default SpeechCredentials;
