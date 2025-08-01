import './VersionSelector.css';

import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEventHandler,
  type CSSProperties
} from 'react';
import { coerce, compare } from 'semver';
import { fetch } from 'whatwg-fetch';

import useFetchArtifactBundleURL from '../data/hooks/useFetchArtifactBundleURL';
import useFetchArtifactBundleURLReason from '../data/hooks/useFetchArtifactBundleURLReason';
import useFetchArtifactBundleURLStatus from '../data/hooks/useFetchArtifactBundleURLStatus';
import useVersion from '../data/hooks/useVersion';
import Presets from './Presets';
import Row from './Row';

type Version = Readonly<{
  time: string;
  version: string;
}>;

const SELECT_STYLE: Readonly<CSSProperties> = Object.freeze({ width: '100%' });

function scriptExists(url: string): Promise<boolean> {
  return new Promise(resolve => {
    const script = document.createElement('script');

    script.setAttribute('async', 'async');
    script.setAttribute('src', url);

    script.addEventListener('error', () => resolve(false));
    script.addEventListener('load', () => resolve(true));

    document.head.appendChild(script);
  });
}

function toLocalDateTime(date: Date): string {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const VersionSelector = memo(() => {
  const [version, setVersion] = useVersion();
  const [availableVersions, setAvailableVersions] = useState<readonly { time: string; version: string }[]>(
    Object.freeze([])
  );
  const [devReleaseLabel, setDevReleaseLabel] = useState('GitHub "daily"');
  const [cdnLatestLabel, setCDNLatestLabel] = useState('cdn.botframework.com/.../latest');
  const [localhostLabel, setLocalhostLabel] = useState('localhost:5000/webchat*.js and directLine.js');
  const [localhostAvailable, setLocalhostAvailable] = useState(false);
  const [artifactNumber, setArtifactNumber] = useState('');
  const [personalAccessToken, setPersonalAccessToken] = useState('');
  const [showGitHubArtifactPanel, setShowGitHubArtifactPanel] = useState(false);

  useMemo(async () => {
    try {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/versions/botframework-webchat');

      if (!res.ok) {
        return;
      }

      const { versions } = await res.json();

      setAvailableVersions(Object.freeze(versions));
    } catch (err) {
      if (err) {
        console.error(err);

        return alert('Failed to fetch version list from NPMJS. Please check network trace for details.');
      }
    }
  }, [setAvailableVersions]);

  const groupedAvailableVersions = useMemo(
    () =>
      availableVersions.reduce<Map<string, Version[]>>((final, version) => {
        const coercedVersion = coerce(version.version) + '';

        let group = final.get(coercedVersion);

        if (!group) {
          group = [];
          final.set(coercedVersion, group);
        }

        group.push(Object.freeze(version));

        return final;
      }, new Map()),
    [availableVersions]
  );

  console.log({ availableVersions, groupedAvailableVersions: Object.fromEntries(groupedAvailableVersions.entries()) });

  useEffect(() => {
    (async function () {
      const res = await fetch('https://api.github.com/repos/microsoft/BotFramework-WebChat/releases/tags/daily');

      if (!res.ok) {
        return;
      }

      const {
        assets,
        target_commitish: commit
      }: { assets: readonly { name: string; updated_at: string }[]; target_commitish: string } = Object.freeze(
        await res.json()
      );

      const { updated_at: updatedAtISOString } = assets.find(({ name }) => name === 'webchat.js') || { updated_at: '' };
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

      const lastModifiedHeader = res.headers.get('last-modified');

      setCDNLatestLabel(`cdn.botframework.com/.../latest (${toLocalDateTime(new Date(lastModifiedHeader || ''))})`);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      let webChatBundleName;

      if (await scriptExists('http://localhost:5000/webchat-es5.js')) {
        webChatBundleName = 'webchat-es5.js';
      } else if (await scriptExists('http://localhost:5000/webchat.js')) {
        webChatBundleName = 'webchat.js';
      }

      let directLineBundleName;

      if (await scriptExists('http://localhost:5000/directLine.js')) {
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

  const presetVersions = useMemo<Readonly<Record<string, string>>>(
    () =>
      Object.freeze({
        latest: 'latest',
        '4.18.0': '4.18.0',
        '4.17.1': '4.17.1',
        '4.17.0': '4.17.0',
        // '4.16.0': '4.16.0',
        // '4.15.9': '4.15.9',
        // '4.15.8': '4.15.8',
        // '4.15.7': '4.15.7',
        // '4.15.6': '4.15.6',
        // '4.15.5': '4.15.5',
        // '4.15.4': '4.15.4',
        // '4.15.3': '4.15.3',
        // '4.15.2': '4.15.2',
        // '4.15.1': '4.15.1',
        // '4.15.0': '4.15.0',
        // '4.14.2': '4.14.2',
        // '4.14.0': '4.14.0',
        // '4.13.0': '4.13.0',
        // '4.12.1': '4.12.1',
        // '4.12.0': '4.12.0',
        // '4.11.0': '4.11.0',
        // '4.10.1': '4.10.1',
        // '4.10.0': '4.10.0',
        // '4.9.2': '4.9.2',
        // '4.9.1': '4.9.1',
        // '4.9.0': '4.9.0',
        // '4.8.1': '4.8.1',
        // '4.8.0': '4.8.0',
        // '4.7.1': '4.7.1',
        // '4.6.0': '4.6.0',
        // '4.5.2': '4.5.2',
        // '4.4.2': '4.4.2',
        'gh-artifact': 'gh-artifact',
        ...(v3Version ? { v3: v3Version } : {}),
        ...(scorpioVersion ? { scorpio: scorpioVersion } : {}),
        daily: 'dev',
        url: 'url',
        'localhost:5000': localhostAvailable ? 'http://localhost:5000/webchat-es5.js' : ''
      }),
    [availableVersions, localhostAvailable]
  );

  const versionTexts = useMemo(() => Object.freeze(Object.keys(presetVersions)), [presetVersions]);
  const versionValues = useMemo(() => Object.freeze(Object.values(presetVersions)), [presetVersions]);

  const handleVersionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ target: { value } }) => setVersion(value),
    [setVersion]
  );

  const handlePresetChange = useCallback(
    (preset: string) => {
      if (preset === 'gh-artifact') {
        setShowGitHubArtifactPanel(true);
      } else if (preset === 'url') {
        const url = prompt('Enter URL of webchat.js', 'https://');

        url && setVersion(url);
      } else {
        setShowGitHubArtifactPanel(false);
        setVersion(preset);
      }
    },
    [setShowGitHubArtifactPanel, setVersion]
  );

  const handleArtifactNumberChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const match = /^https:\/\/github.com\/microsoft\/BotFramework-WebChat\/suites\/\d+\/artifacts\/(\d+)$/.exec(
        value
      );

      setArtifactNumber(match ? match[1] : value);
    },
    [setArtifactNumber]
  );

  const handlePersonalAccessTokenChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setPersonalAccessToken(value),
    [setPersonalAccessToken]
  );

  const fetchArtifactBundleURL = useFetchArtifactBundleURL();

  const handleDownloadArtifactClick = useCallback(
    () => fetchArtifactBundleURL(+artifactNumber, personalAccessToken),
    [artifactNumber, fetchArtifactBundleURL, personalAccessToken]
  );

  const [fetchArtifactBundleURLReason] = useFetchArtifactBundleURLReason();
  const [fetchArtifactBundleURLStatus] = useFetchArtifactBundleURLStatus();

  const fetchArtifactBundleURLStatusIsIdleDownloaded = fetchArtifactBundleURLStatus === 'idle:downloaded';

  useEffect(() => {
    fetchArtifactBundleURLStatusIsIdleDownloaded && setShowGitHubArtifactPanel(false);
  }, [fetchArtifactBundleURLStatusIsIdleDownloaded, setShowGitHubArtifactPanel]);

  return (
    <Row className="version-selector" header="Version">
      <div>
        <select
          disabled={availableVersions.length < 2}
          onChange={handleVersionChange}
          style={SELECT_STYLE}
          value={version}
        >
          {/^(blob|https?):/u.test(version) && version !== 'http://localhost:5000/webchat-es5.js' && (
            <option value={version}>{version}</option>
          )}
          <option value="https://cdn.botframework.com/botframework-webchat/latest/">{cdnLatestLabel}</option>
          <option value="dev">{devReleaseLabel}</option>
          <option disabled={!localhostAvailable} value="http://localhost:5000/webchat-es5.js">
            {localhostLabel}
            {localhostAvailable ? '' : ' (not available)'}
          </option>
          {Array.from(groupedAvailableVersions.entries())
            .sort(([x], [y]) => compare(x, y))
            .reverse()
            .map(([coercedVersion, versions]) => {
              if (versions.length === 1) {
                const [{ time, version }] = versions;

                return (
                  <option key={version} value={version}>
                    {version} ({new Date(time).toLocaleDateString()})
                  </option>
                );
              } else {
                return (
                  <optgroup key={coercedVersion} label={coercedVersion}>
                    {versions.map(({ time, version }) => (
                      <option key={version} value={version}>
                        {version} ({new Date(time).toLocaleDateString()})
                      </option>
                    ))}
                  </optgroup>
                );
              }
            })}
        </select>
      </div>
      <div>
        <Presets onLoad={handlePresetChange} texts={versionTexts} values={versionValues} />
      </div>
      {showGitHubArtifactPanel && (
        <div className="version-selector__artifact-box">
          <div>
            <label>
              <span className="version-selector__artifact-box-label">Artifact number</span>
              <input
                className="version-selector__artifact-box-input"
                onChange={handleArtifactNumberChange}
                type="text"
                value={artifactNumber}
              />
            </label>
          </div>
          <div>
            <label>
              <span className="version-selector__artifact-box-label">Personal access token</span>
              <input
                className="version-selector__artifact-box-input"
                onChange={handlePersonalAccessTokenChange}
                type="password"
                value={personalAccessToken}
              />
            </label>
          </div>
          <div>
            <button
              disabled={!+artifactNumber || !personalAccessToken || /^busy:/.test(fetchArtifactBundleURLStatus)}
              onClick={handleDownloadArtifactClick}
              type="button"
            >
              {fetchArtifactBundleURLStatus === 'busy:authorize'
                ? 'Authorizing…'
                : fetchArtifactBundleURLStatus === 'busy:download'
                ? 'Downloading…'
                : fetchArtifactBundleURLStatus === 'busy:extract'
                ? 'Extracting…'
                : 'Download artifact'}
            </button>
            {fetchArtifactBundleURLStatus === 'error' && (
              <Fragment>
                &nbsp;<span title={fetchArtifactBundleURLReason}>❌</span>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Row>
  );
});

VersionSelector.displayName = 'VersionSelector';

export default VersionSelector;
