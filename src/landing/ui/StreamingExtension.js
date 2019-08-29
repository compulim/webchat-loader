import React, { useCallback, useMemo } from 'react';

const StreamingExtensionToggle = ({
  disabled,
  onChange,
  value
}) => {
  const handleChange = useCallback(({ target: { checked } }) => onChange(checked), [onChange]);
  const style = useMemo(() => ({ margin: 0 }));

  return (
    <section className="row">
      <label>
        <header>Streaming</header>
        <input
          checked={ value }
          disabled={ disabled }
          onChange={ handleChange }
          style={ style }
          type="checkbox"
        />
        <br />
        <small>Internal preview</small>
      </label>
    </section>
  );
}

export default StreamingExtensionToggle
