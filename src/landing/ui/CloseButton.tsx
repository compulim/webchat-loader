import './CloseButton.css';

import { memo } from 'react';

type CloseButtonProps = Readonly<{ onClick: () => void }>;

const CloseButton = memo(({ onClick }: CloseButtonProps) => (
  <button className="close-button" onClick={onClick} type="button">
    &times;
  </button>
));

CloseButton.displayName = 'CloseButton';

export default CloseButton;
