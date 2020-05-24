import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';

import Row from './Row';

import loadBotPreset from '../data/action/loadBotPreset';

const PRESETS = [
  { id: 'mockbot', name: '[Public] MockBot', title: 'MockBot via Web Socket with speech-enabled.' },
  { id: 'mockbot2', name: '[Public] MockBot 2 (Preview)', title: 'MockBot2 via Direct Line App Service Extension.' },
  { id: 'mockbot-dls', name: '[Public] MockBot (Direct Line Speech)', title: 'MockBot via Direct Line Speech.' },
  {
    id: 'mockbot-ase',
    name: '[Public] MockBot App Service Extension',
    title: 'MockBot via Direct Line App Service Extension with speech-enabled.'
  },
  {
    id: 'dev',
    name: '[Dev] http://localhost:3978/directline/tokens',
    title: 'Bot using tokens fetched locally.'
  }
];

const BotPreset = ({ children, onLoad, title, value }) => {
  const handleClick = useCallback(
    event => {
      event.preventDefault();
      onLoad && onLoad(value);
    },
    [onLoad, value]
  );

  return (
    <a href="#" onClick={handleClick} title={title}>
      <nobr>{children}</nobr>
    </a>
  );
};

const BotPresets = () => {
  const dispatch = useDispatch();
  const handleLoad = useCallback(value => dispatch(loadBotPreset(value)), []);

  return (
    <Row header="Preset">
      {PRESETS.map(({ id, name, title }) => (
        <div key={id}>
          <BotPreset title={title} onLoad={handleLoad} value={id}>
            {name}
          </BotPreset>
        </div>
      ))}
    </Row>
  );
};

export default BotPresets;
