import './BotPresets.css';

import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import loadBotPreset from '../data/action/loadBotPreset';
import BotPreset from './BotPresets/BotPreset';
import Row from './Row';

const PRESETS: Readonly<{ id: string; name: string; title: string }[]> = Object.freeze([
  { id: 'mockbot', name: '[Public] MockBot', title: 'MockBot via Direct Line Web Socket.' },
  {
    id: 'mockbot-ase',
    name: '[Public] MockBot (Direct Line ASE)',
    title: 'MockBot via Direct Line App Service Extension.'
  },
  { id: 'mockbot-dls', name: '[Public] MockBot (Direct Line Speech)', title: 'MockBot via Direct Line Speech.' },
  {
    id: 'echobot',
    name: '[Public] EchoBot',
    title: 'EchoBot via Direct Line Web Socket.'
  },
  {
    id: 'echobot-dlase',
    name: '[Public] EchoBot (Direct Line ASE)',
    title: 'EchoBot via Direct Line App Service Extension.'
  },
  {
    id: 'echobot-dls',
    name: '[Public] EchoBot (Direct Line Speech)',
    title: 'EchoBot via Direct Line Speech.'
  },
  {
    id: 'relaybot',
    name: '[Preview] Relay Bot',
    title: 'Relay to any bot with a Direct Line token.'
  },
  {
    id: 'dev',
    name: '[Dev] http://localhost:3978/directline/tokens',
    title: 'Bot using tokens fetched locally.'
  }
]);

const BotPresets = memo(() => {
  const dispatch = useDispatch();
  const handleLoad = useCallback<(value: string) => void>(value => dispatch(loadBotPreset(value)), []);

  return (
    <Row className="bot-presets" header="Preset">
      {PRESETS.map(({ id, name, title }) => (
        <div key={id}>
          <BotPreset title={title} onLoad={handleLoad} value={id}>
            {name}
          </BotPreset>
        </div>
      ))}
    </Row>
  );
});

export default BotPresets;
