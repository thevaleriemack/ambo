import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';

import AssetCard from './AssetCard';
import AssetTray from './AssetTray';
import { assetActivated } from '../../ethereum/assets';
import { setUserActivatedList } from '../../store/user';

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
    return(
      <div>
        <AssetCard
          {...this.props}
          activated={this.isActivated()}
          onClick={() => this.setTrayOpen(!this.state.trayOpen)}
          imageUrl={this.props.assets.images[this.props.lookup]}
        />
        <Collapse
          isOpen={this.state.trayOpen}
        >
        {this.props.account.connected &&
          <AssetTray
            {...this.props}
            activated={this.isActivated()}
          />
        }
        </Collapse>
      </div>
    );
  }
}

export default connect(
  ({account, assets, user}) => ({account, assets, user}),
  { setUserActivatedList }
)(Asset);
