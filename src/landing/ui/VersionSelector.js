import React, { useMemo, useState } from 'react';

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

  const style = useMemo(() => ({ fontSize: '80%', marginRight: '.5em' }));

  const presetVersions = {
    '4.5.0': '4.5.0',
    '4.4.2': '4.4.2',
    '4.4.1': '4.4.1',
    '4.3.0': '4.3.0',
    '4.2.0': '4.2.0',
    '4.1.0': '4.1.0',
    v3: (versions || []).map(({ version }) => version).find(version => /-v3\./.test(version)),
    scorpio: (versions || []).map(({ version }) => version).find(version => /-ibiza\./.test(version)),
    'localhost:5000': 'localhost'
  };

  return (
    <section className="row">
      <label style={{
        alignItems: 'flex-start',
        display: 'flex'
      }}>
        <header>Version</header>
        <div>
          <div>
            <select
              disabled={ versions.length < 2 }
              onChange={ ({ target: { value } }) => onChange(value) }
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
            {
              Object.keys(presetVersions).map(name =>
                <a
                  href="#"
                  key={ name }
                  onClick={ evt => {
                    evt.preventDefault();
                    onChange(presetVersions[name]);
                  } }
                  style={ style }
                >
                  { name }
                </a>
              )
            }
          </div>
        </div>
      </label>
    </section>
  );
};

export default VersionSelector
