import React, { Component } from 'react';
import {
  Col,
  Row,
  Statistic
} from 'antd';
import { connect } from 'react-redux';

class AssetBalance extends Component {

  convertToFiat = (amt) => {
    const ETH = this.props.assets.all.filter((a) => a.lookup === "ETH");
    const amount = ETH[0].prices[this.props.user.currency] * amt;

    if (amount && amount !== 0) {
      const parts = String(amount).split(".");
      return parts[0] + "." + parts[1].slice(0, 2);
    }
    return "--";
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

export default connect(
  ({ assets, user }) => ({ assets, user })
)(AssetBalance);
