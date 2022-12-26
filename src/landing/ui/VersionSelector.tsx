import { fetch } from 'whatwg-fetch';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

/* @ts-ignore */
import coerce from '../../external/semver/functions/coerce';
/* @ts-ignore */
import compare from '../../external/semver/functions/compare';
import Presets from './Presets';
import Row from './Row';
import useVersion from '../data/hooks/useVersion';

import type { ChangeEventHandler, CSSProperties, FC } from 'react';

type Version = {
  time: string;
  version: string;
};

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

const VersionSelector: FC = () => {
  const [version, setVersion] = useVersion();
  const [availableVersions, setAvailableVersions] = useState<readonly { time: string; version: string }[]>(
    Object.freeze([])
  );
  const [devReleaseLabel, setDevReleaseLabel] = useState('GitHub "daily"');
  const [cdnLatestLabel, setCDNLatestLabel] = useState('cdn.botframework.com/.../latest');
  const [localhostLabel, setLocalhostLabel] = useState('localhost:5000/webchat*.js and directLine.js');
  const [localhostAvailable, setLocalhostAvailable] = useState(false);

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

  const groupedAvailableVersions = useMemo(() => {
    // const final: Map<string, Version[]> = new Map();
    let lastGroup: [string, Version[]] | undefined;

    return availableVersions.reduce<Map<string, Version[]>>((final, version) => {
      const coercedVersion = coerce(version.version) + '';

      if (lastGroup && coercedVersion === lastGroup[0]) {
        lastGroup[1].push(version);
      } else {
        lastGroup = [coercedVersion, [version]];
        final.set(coercedVersion, lastGroup[1]);
      }

      return final;
    }, new Map());

    // for (const version of availableVersions) {
    //   const coercedVersion = coerce(version.version);

    //   if (lastGroup && coercedVersion === lastGroup[0]) {
    //     lastGroup[1].push(version);
    //   } else {
    //     lastGroup = [coercedVersion, [version]];
    //     final.set(coercedVersion, lastGroup[1]);
    //   }
    // }

    // return final;
  }, [availableVersions]);

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
        latest: 'https://cdn.botframework.com/botframework-webchat/latest/',
        '4.15.6': '4.15.6',
        '4.15.5': '4.15.5',
        // '4.15.4': '4.15.4',
        // '4.15.3': '4.15.3',
        // '4.15.2': '4.15.2',
        // '4.15.1': '4.15.1',
        // '4.15.0': '4.15.0',
        '4.14.2': '4.14.2',
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
        ...(v3Version ? { v3: v3Version } : {}),
        ...(scorpioVersion ? { scorpio: scorpioVersion } : {}),
        daily: 'dev',
        'localhost:5000': localhostAvailable ? 'http://localhost:5000/' : ''
      }),
    [availableVersions, localhostAvailable]
  );

  const versionTexts = useMemo(() => Object.freeze(Object.keys(presetVersions)), [presetVersions]);
  const versionValues = useMemo(() => Object.freeze(Object.values(presetVersions)), [presetVersions]);

  const handleVersionChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ target: { value } }) => setVersion(value),
    [setVersion]
  );

  return (
    <Row header="Version">
      <div>
        <select
          disabled={availableVersions.length < 2}
          onChange={handleVersionChange}
          style={SELECT_STYLE}
          value={version}
        >
          <option value="https://cdn.botframework.com/botframework-webchat/latest/">{cdnLatestLabel}</option>
          <option value="dev">{devReleaseLabel}</option>
          <option disabled={!localhostAvailable} value="http://localhost:5000/">
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
        <Presets onLoad={setVersion} texts={versionTexts} values={versionValues} />
      </div>
    </Row>
  );
};

export default VersionSelector;
