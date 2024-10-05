import './Presets.css';

import { memo, useCallback, type MouseEventHandler } from 'react';
import Preset from './Presets/Preset';

type PresetsProps = Readonly<{
  onDelete?: (value: string) => void;
  onLoad?: (value: string) => void;
  onSave?: () => void;
  texts: readonly (string | (() => string))[];
  values: readonly string[];
}>;

const Presets = memo(({ onDelete, onLoad, onSave, texts, values }: PresetsProps) => {
  const handleSaveClick = useCallback<MouseEventHandler>(
    event => {
      event.preventDefault();
      onSave?.();
    },
    [onSave]
  );

  return (
    <small className="presets">
      {values.map((value, index) => (
        <Preset key={value} onDelete={onDelete} onLoad={onLoad} text={texts[index] || value} value={value} />
      ))}
      {!!onSave && (
        <button className="presets__save-preset" onClick={handleSaveClick} type="button">
          Save
        </button>
      )}
    </small>
  );
});

Presets.displayName = 'Presets';

export default Presets;
