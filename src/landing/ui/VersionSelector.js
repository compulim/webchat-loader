import { fetch } from 'whatwg-fetch';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Presets from './Presets';
import Row from './Row';

import useVersion from '../data/hooks/useVersion';

const SELECT_STYLE = { width: '100%' };

async function exists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', mode: 'no-cors', timeout: 500 });

    return res.ok;
  } catch (err) {
    return false;
  }
}

function toLocalDateTime(date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const VersionSelector = () => {
  const [version, setVersion] = useVersion();
  const [availableVersions, setAvailableVersions] = useState([]);
  const [devReleaseLabel, setDevReleaseLabel] = useState('GitHub "daily"');
  const [cdnLatestLabel, setCDNLatestLabel] = useState('cdn.botframework.com/.../latest');
  const [localhostLabel, setLocalhostLabel] = useState('localhost:5000/webchat*.js and directLine.js');
  const [localhostAvailable, setLocalhostAvailable] = useState(false);

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

      setDevReleaseLabel(`GitHub "daily" ${commit.substr(0, 7)} (${toLocalDateTime(updatedAt)})`);
    })();
  }, [devReleaseLabel, setDevReleaseLabel]);

  useEffect(() => {
    (async function () {
      const res = await fetch('https://cdn.botframework.com/botframework-webchat/latest/webchat-es5.js', {
        method: 'HEAD'
      });

      if (!res.ok) {
        return;
      }

      const {
        headers: {
          map: { 'last-modified': lastModifiedHeader }
        }
      } = res;

      setCDNLatestLabel(`cdn.botframework.com/.../latest (${toLocalDateTime(new Date(lastModifiedHeader))})`);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      let webChatBundleName;

      if (await exists('http://localhost:5000/webchat-es5.js')) {
        webChatBundleName = 'webchat-es5.js';
      } else if (await exists('http://localhost:5000/webchat.js')) {
        webChatBundleName = 'webchat.js';
      }

      let directLineBundleName;

      if (await exists('http://localhost:5000/directLine.js')) {
        directLineBundleName = 'directLine.js';
      }

      if (webChatBundleName) {
        if (directLineBundleName) {
          setLocalhostLabel(`localhost:5000/${webChatBundleName} and ${directLineBundleName}`);
        } else {
          setLocalhostLabel(`localhost:5000/${webChatBundleName}`);
        }

        setLocalhostAvailable(true);
      } else {
        setLocalhostAvailable(false);
      }
    })();
  }, []);

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
      daily: 'dev',
      latest: 'https://cdn.botframework.com/botframework-webchat/latest/',
      '4.9.0': '4.9.0',
      '4.8.1': '4.8.1',
      '4.8.0': '4.8.0',
      '4.7.1': '4.7.1',
      // '4.6.0': '4.6.0',
      // '4.5.2': '4.5.2',
      // '4.4.2': '4.4.2',
      ...(v3Version ? { v3: v3Version } : {}),
      ...(scorpioVersion ? { scorpio: scorpioVersion } : {}),
      ...(localhostAvailable ? { 'localhost:5000': 'http://localhost:5000/' } : {})
    }),
    [availableVersions, localhostAvailable]
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
          <option value="https://cdn.botframework.com/botframework-webchat/latest/">{cdnLatestLabel}</option>
          <option disabled={!localhostAvailable} value="http://localhost:5000/">
            {localhostLabel}
            {localhostAvailable ? '' : ' (not available)'}
          </option>
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
