import React, { memo } from 'react';

import Row from './Row';
import StyleOptions from './Customization/StyleOptions';

const Customization = () => (
  <Row header="Customization">
    <StyleOptions />
  </Row>
);

export default memo(Customization);
