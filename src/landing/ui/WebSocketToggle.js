import React, { useCallback, useMemo } from 'react';

const WebSocketToggle = ({
  onChange,
  value
}) => {
  const handleChange = useCallback(({ target: { checked } }) => onChange(checked), [onChange]);
  const style = useMemo(() => ({ margin: 0 }));

  return (
    <section className="row">
      <label>
        <header>Web Socket</header>
        <input
          checked={ value }
          onChange={ handleChange }
          style={ style }
          type="checkbox"
        />
      </label>
    </section>
  );
}

export default WebSocketToggle
