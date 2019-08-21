import React, { useCallback, useMemo, useState } from 'react';
import Presets from './Presets';

const VersionSelector = ({
  onChange,
  value
}) => {
  const [versions, setVersions] = useState([]);

  useMemo(async () => {
    try {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/versions/botframework-webchat');

      setVersions((await res.json()).versions);
    } catch (err) {
      if (err) {
        return alert('Failed to fetch version list from NPMJS. Please check network trace for details.');
      }
    }
  }, []);

  const v3Version = useMemo(() => (versions || []).map(({ version }) => version).find(version => /-v3\./u.test(version)), [versions]);
  const scorpioVersion = useMemo(() => (versions || []).map(({ version }) => version).find(version => /-ibiza\./u.test(version)), [versions]);

  const presetVersions = useMemo(() => ({
    '4.5.2': '4.5.2',
    '4.5.1': '4.5.1',
    '4.5.0': '4.5.0',
    '4.4.2': '4.4.2',
    '4.3.0': '4.3.0',
    ...v3Version ? { v3: v3Version } : {},
    ...scorpioVersion ? { scorpio: scorpioVersion } : {},
    'localhost:5000': 'localhost'
  }), [versions]);

  return (
    <section className="row">
      <label style={ useMemo(() => ({ alignItems: 'flex-start', display: 'flex' }), []) }>
        <header>Version</header>
        <div style={ useMemo(() => ({ flex: 1 })) }>
          <div>
            <select
              disabled={ versions.length < 2 }
              onChange={ useCallback(({ target: { value } }) => onChange(value), [onChange]) }
              style={ useMemo(() => ({ width: '100%' })) }
              value={ value }
            >
              { (versions || []).map(({ time, version }) =>
                <option key={ version } value={ version }>
                  { version } ({ new Date(time).toLocaleDateString() })
                </option>
              ) }
              <option value="localhost">http://localhost:5000/webchat.js</option>
            </select>
          </div>
          <div>
            <Presets
              onLoad={ onChange }
              texts={ useMemo(() => Object.keys(presetVersions), [presetVersions]) }
              values={ useMemo(() => Object.values(presetVersions), [presetVersions]) }
            />
          </div>
        </div>
      </label>
    </section>
  );
};

export default VersionSelector
