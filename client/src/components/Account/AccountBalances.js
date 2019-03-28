import React, { Component } from 'react';
import {
  Col,
  Row,
  Statistic
} from 'antd';
import { connect } from 'react-redux';

import hotLoad, { accountData } from '../hotLoad';

class AccountBalances extends Component {

  convertToFiat = (amt) => {
    const ETH = this.props.assets.all.filter((a) => a.lookup === "ETH");
    const amount = ETH[0].prices[this.props.user.currency] * amt;

    if (amount && amount !== 0) {
      const parts = String(amount).split(".");
      return parts[0] + "." + parts[1].slice(0, 2);
    }
    return "--";
  }

  renderValue = (obj, key) => {
    if (obj) return this.convertToFiat(obj[key]);
    return "";
  }

  renderAvailable = () => {
    if (this.props.api) {
      const reqLendAmount = this.props.api.borrowAmount * 1.5;
      const available = this.props.api.lendAmount - reqLendAmount;
      return this.convertToFiat(available);
    }
  }

  render() {
    return (
      <div className="extraContent">
        <Row>
          <Col span={8}>
            <Statistic
              title="Borrowing"
              value={this.renderValue(this.props.api, "borrowAmount")}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Lending"
              value={this.renderValue(this.props.api, "lendAmount")}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Available"
              value={this.renderAvailable()}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const AccountBalancesHotLoaded = hotLoad(
  AccountBalances,
  (props) => [props.user.address],
  accountData
);

export default connect(
  ({ assets, user }) => ({ assets, user })
)(AccountBalancesHotLoaded);
