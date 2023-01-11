import React, { useCallback, useEffect, useState } from 'react';

import type { KeyboardEventHandler } from 'react';

const KEY_LOG_LENGTH = 10;

const KeyLogs = () => {
  const [keyLog, setRawKeyLog] = useState<readonly Readonly<Set<string>>[]>(Object.freeze([]));

  const setKeyLog = useCallback(
    (setter: Parameters<typeof setRawKeyLog>[0]) => {
      if (typeof setter === 'function') {
        setRawKeyLog(keyLog => Object.freeze([...setter(keyLog)].slice(-KEY_LOG_LENGTH)));
      } else {
        setRawKeyLog(Object.freeze([...setter]).slice(-KEY_LOG_LENGTH));
      }
    },
    [setRawKeyLog]
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<Window>>(
    ({ altKey, ctrlKey, key, repeat, shiftKey }) => {
      if (key === 'Alt' || key === 'Control' || key === 'Shift') {
        return;
      }

      if (repeat) {
        return setKeyLog(keyLog => {
          const nextKeyLog = [...keyLog];

          nextKeyLog[nextKeyLog.length - 1]?.add?.('…');

          return nextKeyLog;
        });
      }

      const entry = new Set<string>();

      ctrlKey && entry.add('CTRL');
      altKey && entry.add('ALT');
      shiftKey && entry.add('SHIFT');

      switch (key) {
        case 'ArrowDown':
          key = '↓';
          break;

        case 'ArrowLeft':
          key = '←';
          break;

        case 'ArrowRight':
          key = '→';
          break;

        case 'ArrowUp':
          key = '↑';
          break;

        case 'ContextMenu':
          key = 'Context Menu';
          break;

        case 'PageUp':
          key = 'Page Up';
          break;

        case 'PageDown':
          key = 'Page Down';
          break;
      }

      setKeyLog(keyLog => Object.freeze([...keyLog, Object.freeze(entry.add(key))]));
    },
    [setKeyLog]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any, { capture: true });

    return () => window.removeEventListener('keydown', handleKeyDown as any, { capture: true });
  }, [handleKeyDown]);

  return (
    <div id="key-logs">
      {keyLog.map(keys =>
        keys.size ? (
          <div className="key-logs__entry">
            {Array.from(keys).map((key, index) =>
              key === '…' ? (
                <kbd className="key-logs__key key-logs__key--repeat">&hellip;</kbd>
              ) : (
                <kbd className="key-logs__key" key={index}>
                  {key === ' ' ? 'SPACE' : key}
                </kbd>
              )
            )}
          </div>
        ) : null
      )}
    </div>
  );
};

export default KeyLogs;
