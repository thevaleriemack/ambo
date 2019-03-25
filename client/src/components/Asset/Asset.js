import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';

import AssetCard from './AssetCard';
import AssetTray from './AssetTray';

class Asset extends Component {

  state = { trayOpen: false }

  setTrayOpen = (trayOpen) => {
    this.setState({trayOpen})
  }

  render() {
    return(
      <div>
        <AssetCard
          {...this.props}
          onClick={() => this.setTrayOpen(!this.state.trayOpen)}
          imageUrl={this.props.assets.images[this.props.lookup]}
        />
        <Collapse
          isOpen={this.state.trayOpen}
        >
          <AssetTray />
        </Collapse>
      </div>
    );
  }
}

export default connect(({assets}) => ({assets}), null)(Asset);
