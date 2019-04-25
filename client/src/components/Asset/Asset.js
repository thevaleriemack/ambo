import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';

import AssetCard from './AssetCard';
import AssetTray from './AssetTray';
import { assetActivated } from '../../ethereum/assets';

import './Asset.css';

const styles = {
  "WETH": {backgroundColor: "rgba(148, 174, 255, 1)"},
  "REP": {backgroundColor: "#9C82F5"},
  "DAI": {backgroundColor: "rgba(255, 214, 99, 1)"},
  "ZRX": {backgroundColor: "rgba(204, 204, 204, 1)"},
  "BAT": {backgroundColor: "rgba(255, 80, 1, 0.7)"}
}

class Asset extends Component {

  state = { trayOpen: false }

  setTrayOpen = (trayOpen) => {
    if (this.props.account.connected) {
      this.setState({trayOpen});
    }
  }

  isActivated = () => {
    return assetActivated(this.props.address, this.props.user.address);
  }

  render() {
    const inUse = ((this.props.lendBalance > 0)
                   || (this.props.borrowBalance > 0));
    const inUseStyle = (inUse) ? styles[this.props.ticker] : null;
    return(
      <div>
        <AssetCard
          {...this.props}
          activated={this.isActivated()}
          onClick={() => this.setTrayOpen(!this.state.trayOpen)}
          imageUrl={this.props.assets.images[this.props.lookup]}
          inUse={inUse}
          inUseStyle={inUseStyle}
        />
        <Collapse
          isOpen={this.state.trayOpen}
        >
        {this.props.account.connected &&
          <AssetTray
            {...this.props}
            activated={this.isActivated()}
            inUse={inUse}
            inUseStyle={inUseStyle}
          />
        }
        </Collapse>
      </div>
    );
  }
}

export default connect(
  ({account, assets, user}) => ({account, assets, user}),
  null
)(Asset);
