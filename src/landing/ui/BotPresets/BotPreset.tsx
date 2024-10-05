import './BotPreset.css';

import React, { memo, useCallback, type MouseEventHandler, type PropsWithChildren } from 'react';

type BotPreset = PropsWithChildren<
  Readonly<{
    onLoad: (value: string) => void;
    title: string;
    value: string;
  }>
>;

const BotPreset = memo(({ children, onLoad, title, value }: BotPreset) => {
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
});

export default BotPreset;
