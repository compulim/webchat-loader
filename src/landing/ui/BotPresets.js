import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';

import Row from './Row';

import loadBotPreset from '../data/action/loadBotPreset';

const PRESETS = [
  { id: 'mockbot', name: '[Public] MockBot' },
  { id: 'mockbot-ase', name: '[Preview] MockBot ASE' },
  { id: 'dev', name: '[Dev] http://localhost:3978/directline/tokens' }
  // 'mockbot-streaming-extension': '[Public] MockBot with Streaming Extension',
  // 'mockbot-proxy': '[Internal] MockBot Proxy'
];

const BotPreset = ({ children, onLoad, value }) => {
  const handleClick = useCallback(
    event => {
      event.preventDefault();
      onLoad && onLoad(value);
    },
    [onLoad, value]
  );

  return (
    <a href="#" onClick={handleClick}>
      {children}
    </a>
  );
};

const BotPresets = () => {
  const dispatch = useDispatch();
  const handleLoad = useCallback(value => dispatch(loadBotPreset(value)), []);

  return (
    <Row header="Preset">
      {PRESETS.map(({ id, name }) => (
        <div key={id}>
          <BotPreset onLoad={handleLoad} value={id}>
            {name}
          </BotPreset>
        </div>
      ))}
    </Row>
  );
};

export default BotPresets;
