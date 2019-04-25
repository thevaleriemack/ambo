import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';

import AssetCard from './AssetCard';
import AssetTray from './AssetTray';
import { assetActivated } from '../../ethereum/assets';

import './Asset.css';

const styles = {
  "WETH": {backgroundColor: "#5E6FA5"},
  "REP": {backgroundColor: "#9C82F5"},
  "DAI": {backgroundColor: "#FBBA03"},
  "ZRX": {backgroundColor: "#CCC"},
  "BAT": {backgroundColor: "#FF5001"}
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
