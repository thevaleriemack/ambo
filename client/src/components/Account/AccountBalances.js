import React, { Component } from 'react';
import { 
  Col,
  Row,
  Statistic
} from 'antd';
import { connect } from 'react-redux';

import subscribe, { accountData } from '../subscribe';

class AccountBalances extends Component {

  convertToFiat = (amt) => {
    const ETH = this.props.assets.all.filter((a) => a.lookup === "ETH");
    const amount = ETH[0].prices[this.props.user.currency] * amt;
    
    if (amount && amount !== 0) {
      const parts = String(amount).split(".");
      return parts[0] + "." + parts[1].slice(0,2);
    }
    return 0;
  }

  render() {
    return(
      <div className="extraContent">
        <Row>
          <Col span={8}>
            <Statistic
              title="Borrowing"
              prefix="$"
              value={this.convertToFiat(this.props.api.borrowAmount)}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Lending"
              prefix="$"
              value={this.convertToFiat(this.props.api.lendAmount)}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Available"
              prefix="$"
              value={this.convertToFiat(0)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

// TODO: other changes should force a balance check or use polling

const AccountBalancesSubscribed = subscribe(
  AccountBalances,
  (props) => props.user.address,
  accountData
);

export default connect(
  ({assets, user}) => ({assets, user})
)(AccountBalancesSubscribed);
