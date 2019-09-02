import React, { useCallback, useMemo } from 'react';

import useSavedSpeechSubscriptionKeys from '../data/hooks/useSavedSpeechSubscriptionKeys';
import useSpeechRegion from '../data/hooks/useSpeechRegion';
import useSpeechSubscriptionKey from '../data/hooks/useSpeechSubscriptionKey';

import Presets from './Presets';
import Row from './Row';

const ROW_STYLE = { flex: 1 };
const REGION_SELECT_STYLE = { flex: 1 };
const INPUT_ROW_STYLE = { display: 'flex' };
const INPUT_STYLE = { flex: 1, fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' };
const INPUT_STYLE_FOR_MOCK_BOT = { flex: 1, marginRight: '1em' };

const REGIONS = {
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

const SpeechCredential = () => {
  const [region, setRegion] = useSpeechRegion();
  const [subscriptionKey, setSubscriptionKey] = useSpeechSubscriptionKey();
  const [savedSubscriptionKeys, saveSubscriptionKey, removeSavedSubscriptionKey] = useSavedSpeechSubscriptionKeys();

  const handleClearKeyClick = useCallback(() => setSubscriptionKey(''), [setSubscriptionKey]);
  const handleLoadMockBotKey = useCallback(event => {
    event.preventDefault();
    setSubscriptionKey('__mockbot__');
  }, [setSubscriptionKey]);
  const handleRegionChange = useCallback(({ target: { value } }) => setRegion(value), [setRegion]);
  const handleSaveSubscriptionKey = useCallback(() => saveSubscriptionKey(subscriptionKey), [subscriptionKey]);
  const handleSubscriptionKeyChange = useCallback(({ target: { value } }) => setSubscriptionKey(value), [setSubscriptionKey]);
  const handleSubscriptionKeyFocus = useCallback(({ target }) => target.select());

  const pregeneratedToken = subscriptionKey === '__mockbot__';

  return (
    <React.Fragment>
      <Row header="Speech region">
        <div style={ ROW_STYLE }>
          <div style={ INPUT_ROW_STYLE }>
            <select
              disabled={ pregeneratedToken }
              onChange={ handleRegionChange }
              style={ REGION_SELECT_STYLE }
              value={ pregeneratedToken ? '__mockbot__' : region }
            >
              { Object.keys(REGIONS).map(value =>
                <option key={ value } value={ value }>{ REGIONS[value] }</option>
              ) }
              { pregeneratedToken &&
                <option value="__mockbot__">&lt;Key provided by MockBot&gt;</option>
              }
            </select>
          </div>
          <div>
            <small>
              <Presets
                onLoad={ setRegion }
                texts={ useMemo(() => ['West US', 'West US 2', 'East US'], []) }
                values={ useMemo(() => ['westus', 'westus2', 'eastus'], []) }
              />
            </small>
          </div>
        </div>
      </Row>
      <Row header="Speech key">
        <div style={ ROW_STYLE }>
          <div style={ INPUT_ROW_STYLE }>
            <input
              disabled={ pregeneratedToken }
              onChange={ handleSubscriptionKeyChange }
              onFocus={ handleSubscriptionKeyFocus }
              placeholder={ pregeneratedToken ? '<Key provided by MockBot>' : '' }
              style={ INPUT_STYLE }
              value={ pregeneratedToken ? '' : subscriptionKey }
            />
            {
              !!subscriptionKey && <button onClick={ handleClearKeyClick } type="button">Clear</button>
            }
          </div>
          <div>
            <small>
              <a href="#" onClick={ handleLoadMockBotKey }>MockBot</a>&nbsp;
              <Presets
                onDelete={ removeSavedSubscriptionKey }
                onLoad={ setSubscriptionKey }
                onSave={ pregeneratedToken ? undefined : handleSaveSubscriptionKey }
                texts={ useMemo(() => savedSubscriptionKeys.map(key => () => <code>{ (key || '').substr(0, 5) + '…' }</code>), [savedSubscriptionKeys]) }
                values={ savedSubscriptionKeys }
              />
            </small>
          </div>
        </div>
      </Row>
    </React.Fragment>
  );
}

export default SpeechCredential
