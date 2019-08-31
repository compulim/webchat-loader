import React, { useCallback, useMemo, useState } from 'react';

import Presets from './Presets';
import Row from './Row';

import useVersion from '../data/hooks/useVersion';

const SELECT_STYLE = { width: '100%' };

const VersionSelector = () => {
  const [version, setVersion] = useVersion();
  const [availableVersions, setAvailableVersions] = useState([]);

  useMemo(async () => {
    try {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/versions/botframework-webchat');

      setAvailableVersions((await res.json()).versions);
    } catch (err) {
      if (err) {
        return alert('Failed to fetch version list from NPMJS. Please check network trace for details.');
      }
    }
  }, []);

  const v3Version = useMemo(() => (availableVersions || []).map(({ version }) => version).find(version => /-v3\./u.test(version)), [availableVersions]);
  const scorpioVersion = useMemo(() => (availableVersions || []).map(({ version }) => version).find(version => /-ibiza\./u.test(version)), [availableVersions]);

  const presetVersions = useMemo(() => ({
    '4.5.2': '4.5.2',
    '4.5.1': '4.5.1',
    '4.5.0': '4.5.0',
    '4.4.2': '4.4.2',
    '4.3.0': '4.3.0',
    ...v3Version ? { v3: v3Version } : {},
    ...scorpioVersion ? { scorpio: scorpioVersion } : {},
    'localhost:5000': 'localhost'
  }), [availableVersions]);

  const versionTexts = useMemo(() => Object.keys(presetVersions), [presetVersions]);
  const versionValues = useMemo(() => Object.values(presetVersions), [presetVersions]);

  const handleVersionChange = useCallback(({ target: { value } }) => setVersion(value), [setVersion]);

  return (
    <Row header="Version">
      <div>
        <select
          disabled={ availableVersions.length < 2 }
          onChange={ handleVersionChange }
          style={ SELECT_STYLE }
          value={ version }
        >
          { (availableVersions || []).map(({ time, version }) =>
            <option key={ version } value={ version }>
              { version } ({ new Date(time).toLocaleDateString() })
            </option>
          ) }
          <option value="localhost">http://localhost:5000/webchat.js</option>
        </select>
      </div>
      <div>
        <small>
          <Presets
            onLoad={ setVersion }
            texts={ versionTexts }
            values={ versionValues }
          />
        </small>
      </div>
    </Row>
  );
};

export default VersionSelector
