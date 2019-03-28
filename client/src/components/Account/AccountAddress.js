import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

import { setAccountConnected } from '../../store/account';
import { setUserAddress } from '../../store/user';

class AccountAddress extends Component {

  handleClear = () => {
    this.props.setUserAddress("");
    this.props.setAccountConnected(false);
  }

  render() {
    return(
      <p className="AccountAddress">
        <span>Your Account</span><br/>
        {this.props.user.address}
        {!this.props.eth.namespaced &&
          <Icon
            className="AccountAddress-close-icon"
            type="close-circle"
            theme="filled"
            onClick={this.handleClear}
          />
        }
      </p>
    );
  }
}

export default connect(({eth, user}) => ({eth, user}), {
  setAccountConnected,
  setUserAddress
})(AccountAddress);
