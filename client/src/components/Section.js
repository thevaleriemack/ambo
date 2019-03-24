import React, { Component } from 'react';

import Asset from './Asset/Asset';

const Section = (props) => {
  return(
    <div>
      <h1>{props.heading}</h1>
      <Asset />
    </div>
  );
}

export default Section;
