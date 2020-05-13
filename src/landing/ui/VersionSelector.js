import { fetch } from 'whatwg-fetch';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Presets from './Presets';
import Row from './Row';

import useVersion from '../data/hooks/useVersion';

const SELECT_STYLE = { width: '100%' };

const VersionSelector = () => {
  const [version, setVersion] = useVersion();
  const [availableVersions, setAvailableVersions] = useState([]);
  const [devReleaseLabel, setDevReleaseLabel] = useState('GitHub "daily"');

  useMemo(async () => {
    try {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/versions/botframework-webchat');

      setAvailableVersions((await res.json()).versions);
    } catch (err) {
      if (err) {
        console.error(err);

        return alert('Failed to fetch version list from NPMJS. Please check network trace for details.');
      }
    }
  }, []);

  useEffect(() => {
    (async function () {
      const res = await fetch('https://api.github.com/repos/microsoft/BotFramework-WebChat/releases/tags/daily');

      if (!res.ok) {
        return;
      }

      const { assets, target_commitish: commit } = await res.json();
      const { updated_at: updatedAtISOString } = assets.find(({ name }) => name === 'webchat.js');
      const updatedAt = new Date(updatedAtISOString);

      setDevReleaseLabel(
        `GitHub "daily" ${commit.substr(
          0,
          7
        )} at ${updatedAt.toLocaleDateString()} ${updatedAt.toLocaleTimeString()}`
      );
    })();
  }, [devReleaseLabel, setDevReleaseLabel]);

  const v3Version = useMemo(
    () => (availableVersions || []).map(({ version }) => version).find(version => /-v3\./u.test(version)),
    [availableVersions]
  );
  const scorpioVersion = useMemo(
    () => (availableVersions || []).map(({ version }) => version).find(version => /-ibiza\./u.test(version)),
    [availableVersions]
  );

  const presetVersions = useMemo(
    () => ({
      'GitHub': 'dev',
      '4.8.1': '4.8.1',
      '4.8.0': '4.8.0',
      '4.7.1': '4.7.1',
      '4.6.0': '4.6.0',
      // '4.5.2': '4.5.2',
      // '4.4.2': '4.4.2',
      ...(v3Version ? { v3: v3Version } : {}),
      ...(scorpioVersion ? { scorpio: scorpioVersion } : {}),
      'localhost:5000': 'http://localhost:5000/'
    }),
    [availableVersions]
  );

  const versionTexts = useMemo(() => Object.keys(presetVersions), [presetVersions]);
  const versionValues = useMemo(() => Object.values(presetVersions), [presetVersions]);

  const handleVersionChange = useCallback(({ target: { value } }) => setVersion(value), [setVersion]);

  return (
    <Row header="Version">
      <div>
        <select
          disabled={availableVersions.length < 2}
          onChange={handleVersionChange}
          style={SELECT_STYLE}
          value={version}
        >
          <option value="dev">{devReleaseLabel}</option>
          <option value="http://localhost:5000/">http://localhost:5000/webchat.js</option>
          {(availableVersions || []).map(({ time, version }) => (
            <option key={version} value={version}>
              {version} ({new Date(time).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>
      <div>
        <small>
          <Presets onLoad={setVersion} texts={versionTexts} values={versionValues} />
        </small>
      </div>
    </Row>
  );
};

export default VersionSelector;
