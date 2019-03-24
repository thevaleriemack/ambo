import React from 'react';

const AssetCard = (props) => {
  return (
    <div onClick={props.onClick}>
      <p>{props.name}</p>
    </div>
  );
}

export default AssetCard;
