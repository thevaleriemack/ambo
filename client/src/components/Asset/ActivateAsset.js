import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { activateAsset } from '../../ethereum/assets';

class ActivateAsset extends Component {

  state = { loading: false }

  handleActivate = () => {
    this.setState({ loading: true })
    activateAsset(this.props.address, this.props.user.address)
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return(
      <Button
        key="1"
        type="primary"
        onClick={this.handleActivate}
        disabled={!this.props.account.connected}
        loading={this.state.loading}
      >
        Activate
      </Button>
    );
  }
}

export default connect(
  ({account, eth, user}) => ({account, eth, user}),
  null
)(ActivateAsset);
