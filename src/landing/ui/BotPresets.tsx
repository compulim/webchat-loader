import { css } from 'emotion';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import React, { useCallback } from 'react';

import Row from './Row';

import loadBotPreset from '../data/action/loadBotPreset';

import type { FC, MouseEventHandler, PropsWithChildren } from 'react';

const ROOT_CSS = css({
  '& .bot-presets__preset': {
    appearance: 'none',
    background: 'transparent',
    border: 0,
    color: 'rgb(0, 0, 238)',
    cursor: 'pointer',
    display: 'inline',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0,
    padding: 0,
    textDecoration: 'underline'
  },

  '& .bot-presets__preset:disabled': {
    color: '#CCC',
    cursor: 'inherit',
    textDecoration: 'none'
  }
});

const PRESETS = [
  { id: 'mockbot', name: '[Public] MockBot', title: 'MockBot via Web Socket with speech-enabled.' },
  {
    id: 'mockbot3',
    name: '[Public] MockBot 3 via Web Socket (Preview)',
    title: 'MockBot3 via Direct Line App Service Extension.'
  },
  {
    id: 'mockbot3-dlase',
    name: '[Public] MockBot 3 via Direct Line ASE (Preview)',
    title: 'MockBot3 via Direct Line App Service Extension.'
  },
  { id: 'mockbot-dls', name: '[Public] MockBot (Direct Line Speech)', title: 'MockBot via Direct Line Speech.' },
  // {
  //   id: 'mockbot-ase',
  //   name: '[Public] MockBot App Service Extension',
  //   title: 'MockBot via Direct Line App Service Extension with speech-enabled.'
  // },
  {
    id: 'dev',
    name: '[Dev] http://localhost:3978/directline/tokens',
    title: 'Bot using tokens fetched locally.'
  }
];

type Props = PropsWithChildren<{
  onLoad: (value: string) => void;
  title: string;
  value: string;
}>;

const BotPreset: FC<Props> = ({ children, onLoad, title, value }) => {
  const handleClick = useCallback<MouseEventHandler>(
    event => {
      event.preventDefault();
      onLoad && onLoad(value);
    },
    [onLoad, value]
  );

  return (
    <button className="bot-presets__preset" onClick={handleClick} title={title} type="button">
      {/* @ts-ignore */}
      <nobr>{children}</nobr>
    </button>
  );
};

const BotPresets: FC = () => {
  const dispatch = useDispatch();
  const handleLoad = useCallback<(value: string) => void>(value => dispatch(loadBotPreset(value)), []);

  return (
    <Row className={classNames('bot-presets', ROOT_CSS)} header="Preset">
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
