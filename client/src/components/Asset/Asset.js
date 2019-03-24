import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

import AssetCard from './AssetCard';
import AssetTray from './AssetTray';

const Asset = () => {
  const [open, setOpen] = useState(false);

  return(
    <div>
      <AssetCard onClick={() => setOpen(!open)} />
      <Collapse
        isOpen={open}
      >
        <AssetTray />
      </Collapse>
    </div>
  );
}

export default Asset;
