import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';

import { setUserAddress } from '../../store/user';

class AccountAddress extends Component {
  render() {
    return(
      <p className="AccountAddress">
        <span>Your Account</span><br/>
        {this.props.user.address}
        {!this.props.eth.namespaced &&
          <Icon
            className="AccountAddress-close-icon"
            type="close-circle"
            theme="filled" onClick={() => { this.props.setUserAddress(""); }}
          />
        }
      </p>
    );
  }
}

export default connect(({eth, user}) => ({eth, user}), {
  setUserAddress
})(AccountAddress);
