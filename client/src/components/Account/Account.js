import React, { Component } from 'react';
import {
  Badge,
  Button,
  PageHeader,
  Tag
} from 'antd';
import { connect } from 'react-redux';

import AccountAddress from './AccountAddress';
import AccountAddressForm from './AccountAddressForm';
import AccountBalances from './AccountBalances';
import { connectProvider } from '../../ethereum';
import { setAccountConnected } from '../../store/account';
import { updateEnabledStatus } from '../../store/eth';
import { setUserAddress } from '../../store/user';

import logo from '../../images/logo.png';
import './Account.css';

class Account extends Component {

  handleConnect = async () => {
    if (this.props.eth.namespaced) {
      const connected = await connectProvider();
      this.props.updateEnabledStatus(connected);
      this.props.setAccountConnected(connected);
    }
  }

  renderNetworkTag = () => {
    if ((this.props.eth.networkId !== "1") &&
      (this.props.eth.networkId !== "")) {
      return <Tag color="blue">{this.props.eth.networkName}</Tag>;
    } else {
      return null;
    }
  }

  renderAddress = () => {
    if (this.props.eth.namespaced) {

      if (this.props.eth.enabled) {
        return <AccountAddress />;
      } else {
        return (
          <Button key="1" type="primary" onClick={this.handleConnect}>
            Connect Wallet
          </Button>
        );
      }

    } else {

      if (this.props.account.connected) {
        return <AccountAddress />;
      } else {
        return (
          <AccountAddressForm
            setUserAddress={this.props.setUserAddress}
            setAccountConnected={this.props.setAccountConnected}
          />
        );
      }

    }
  }

  render() {
    return (
      <div>
        <PageHeader
          className="Account-PageHeader"
          title={
            <h1>
              Ambo<img id="Account-logo" src={logo} alt="Ambo" />
            </h1>
          }
          tags={this.renderNetworkTag()}
          extra={this.renderAddress()}
          footer={
            <Badge
              count={this.props.user.currency}
              style={{ backgroundColor: '#1890FF' }}
            />
          }
        >
          <div className="wrap">
            <div className="content padding">
              Finance for the 21st Century
            </div>
            {((this.props.user.address !== "") &&
              this.props.account.connected) && <AccountBalances />}
          </div>
        </PageHeader>
      </div>
    );
  }
}

export default connect(
  ({ account, eth, user }) => ({ account, eth, user }),
  {
    setAccountConnected,
    setUserAddress,
    updateEnabledStatus
  }
)(Account);
