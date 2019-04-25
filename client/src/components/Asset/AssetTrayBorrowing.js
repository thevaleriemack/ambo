import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';

import Borrow from '../Compound/Borrow';
import Repay from '../Compound/Repay';
import hotLoad from '../hotLoad';

class AssetTrayBorrowing extends Component {

  render() {
    return (
      <div>
        <Col className="gutter-row" span={8}>
          <div className="gutter-box">Borrow Coming Soon</div>
          {this.props.account.connected &&
            <Borrow
              limit={this.props.api.walletBalance}
              assetAddress={this.props.address}
              assetTicker={this.props.ticker}
            />
          }
        </Col>
        {this.props.walletBalance}
        <Col className="gutter-row" span={8}>
          <div className="gutter-box">Lend</div>
          {this.props.account.connected &&
            <Repay />
          }
        </Col>
      </div>
    );
  }
}

export default AssetTrayBorrowing;
