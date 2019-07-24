import React, { useCallback } from 'react';

const ExperimentSelector = ({
  onChange,
  value
}) => {
  const handleChange = useCallback(({ target: { value } }) => onChange(value));

  return (
    <section className="row">
      <label>
        <header>Experiment</header>
        <select
          onChange={ handleChange }
          value={ value }
        >
          <option value="">No experiments</option>
          <option value="remove">Remove content URL</option>
          <option value="placeholder">Replace content URL with a placeholder image</option>
          <option value="403">Replace content URL with one return 403</option>
        </select>
      </label>
    </section>
  );
}

export default ExperimentSelector
