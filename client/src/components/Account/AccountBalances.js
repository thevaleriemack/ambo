import React, { Component } from 'react';
import {
  Col,
  Row,
  Statistic
} from 'antd';
import { connect } from 'react-redux';

import hotLoad from '../hotLoad';

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

  renderAvailable = (borrow, lend) => {
      const reqLendAmount = borrow * 1.5;
      const available = lend - reqLendAmount;
      return this.convertToFiat(available);
  }

  render() {
    const borrowAmount = this.props.api.accountData && this.props.api.accountData.borrowAmount;
    const lendAmount = this.props.api.accountData && this.props.api.accountData.lendAmount;
    return (
      <div className="extraContent">
        <Row>
          <Col span={8}>
            <Statistic
              title="Borrowing"
              value={this.convertToFiat(borrowAmount)}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Lending"
              value={this.convertToFiat(lendAmount)}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Available"
              value={this.renderAvailable(borrowAmount, lendAmount)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const AccountBalancesHotLoaded = hotLoad(
  AccountBalances,
  [
    ["accountData", (props) => [props.user.address]]
  ]
);

export default connect(
  ({ assets, user }) => ({ assets, user })
)(AccountBalancesHotLoaded);
