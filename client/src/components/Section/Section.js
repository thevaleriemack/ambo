import React from 'react';

import Asset from '../Asset/Asset';

const renderAssets = (assets) => {
  return assets.map((asset) => (
    <Asset
      key={asset.ticker}
      {...asset}
    />
  ));
}

const Section = (props) => {
  return(
    <div className="Section" id={props.heading.toString()}>
      <h5>{props.heading}</h5>
      {(props.assets.length < 1) && props.children}
      {renderAssets(props.assets)}
    </div>
  );
}

export default Section;
