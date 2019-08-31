import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Row from './Row';

import loadBotPreset from '../data/action/loadBotPreset';

const PRESETS = {
  mockbot: '[Public] MockBot',
  'mockbot-streaming-extension': '[Public] MockBot with Streaming Extension',
  'mockbot-proxy': '[Internal] MockBot Proxy'
};

const BotPreset = ({
  children,
  onLoad,
  value
}) => {
  const handleClick = useCallback(event => {
    event.preventDefault();
    onLoad && onLoad(value)
  }, [onLoad, value]);

  return (
    <a
      href="#"
      onClick={ handleClick }
    >
      { children }
    </a>
  );
};

const BotPresets = () => {
  const dispatch = useDispatch();
  const handleLoad = useCallback(value => dispatch(loadBotPreset(value)), []);

  return (
    <Row header="Preset">
      {
        Object.keys(PRESETS).map(value =>
          <div key={ value }>
            <BotPreset onLoad={ handleLoad } value={ value }>{ PRESETS[value] }</BotPreset>
          </div>
        )
      }
    </Row>
  );
};

export default BotPresets
