import React, { useCallback, useMemo } from 'react';

const SpeechCredential = ({
  onSpeechKeyChange,
  speechKey
}) => {
  const handleChange = useCallback(({ target: { value } }) => onSpeechKeyChange(value), [onSpeechKeyChange]);
  const handleFocus = useCallback(({ target }) => target.select());
  const style = useMemo(() => ({ fontFamily: `Consolas, 'Courier New', monospace`, marginRight: '1em' }));

  return (
    <section className="row">
      <label>
        <header>Speech key</header>
        <input
          onChange={ handleChange }
          onFocus={ handleFocus }
          style={ style }
          value={ speechKey }
        />
      </label>
    </section>
  );
}

export default SpeechCredential
