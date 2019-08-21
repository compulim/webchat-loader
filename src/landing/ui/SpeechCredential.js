import React, { useCallback, useMemo } from 'react';

import Presets from './Presets';
import useStateWithLocalStorage from '../util/useStateWithLocalStorage';

const SpeechCredential = ({
  onSpeechKeyChange,
  onSpeechRegionChange,
  speechKey,
  speechRegion
}) => {
  const handleKeyChange = useCallback(({ target: { value } }) => onSpeechKeyChange(value), [onSpeechKeyChange]);
  const handleKeyFocus = useCallback(({ target }) => target.select());
  const handleRegionChange = useCallback(({ target: { value } }) => onSpeechRegionChange(value), [onSpeechRegionChange]);
  const style = useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' }));
  const [savedKeys, setSavedKeys] = useStateWithLocalStorage([], 'SAVED_SPEECH_KEYS');

  return (
    <React.Fragment>
      <section className="row">
        <label style={ useMemo(() => ({
          alignItems: 'flex-start',
          display: 'flex'
        }), []) }>
          <header>Speech key</header>
          <div>
            <div>
              <input
                onChange={ handleKeyChange }
                onFocus={ handleKeyFocus }
                style={ style }
                value={ speechKey }
              />
            </div>
            <div>
              <Presets
                onDelete={ useCallback(value => setSavedKeys(savedKeys.filter(key => key !== value), [savedKeys])) }
                onLoad={ useCallback(value => onSpeechKeyChange(value), [onSpeechKeyChange]) }
                onSave={ useCallback(() => setSavedKeys([...savedKeys.filter(key => key !== speechKey), speechKey].sort()), [savedKeys, speechKey]) }
                texts={ useMemo(() => savedKeys.map(key => () => <code>{ key.substr(0, 5) + '…' }</code>), [savedKeys]) }
                values={ savedKeys }
              />
            </div>
          </div>
        </label>
      </section>
      <section className="row">
        <label style={ useMemo(() => ({
          alignItems: 'flex-start',
          display: 'flex'
        }), []) }>
          <header>Speech region</header>
          <div>
            <div>
              <input
                onChange={ handleRegionChange }
                style={ style }
                value={ speechRegion }
              />
            </div>
            <div>
              <Presets
                onLoad={ onSpeechRegionChange }
                texts={ useMemo(() => ['West US', 'West US 2', 'East US'], []) }
                values={ useMemo(() => ['westus', 'westus2', 'eastus'], []) }
              />
            </div>
          </div>
        </label>
      </section>
    </React.Fragment>
  );
}

export default SpeechCredential
