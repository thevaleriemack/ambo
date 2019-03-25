import React, { Component } from 'react';

import Asset from './Asset/Asset';

const renderAssets = (assets) => {
  return assets.map((asset) => (
    <Asset
      key={asset.ticker}
      name={asset.name}
      ticker={asset.ticker}
      imageUrl={asset.imageUrl}
    />
  ))
}

const Section = (props) => {
  return(
    <div>
      <h1>{props.heading}</h1>
      {props.children}
      {renderAssets(props.assets)}
    </div>
  );
}

export default Section;
