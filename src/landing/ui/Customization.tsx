import { memo } from 'react';

import EditCustomizationButton from './Customization/EditCustomizationButton';
import Row from './Row';

const Customization = memo(() => (
  <Row header="Customization">
    <EditCustomizationButton />
  </Row>
));

Customization.displayName = 'Customization';

export default Customization;
