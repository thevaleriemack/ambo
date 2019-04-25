import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';

import Lend from '../Compound/Lend';
import Withdraw from '../Compound/Withdraw';
import hotLoad from '../hotLoad';

class AssetTrayLending extends Component {

  render() {
    return (
      <div>
          <Col className="gutter-row" span={8}>
          <div className="gutter-box">Withdraw</div>
            {this.props.account.connected &&
              <Withdraw />
            }
          </Col>
          {this.props.walletBalance}
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">Lend</div>
            {this.props.account.connected &&
              <Lend
                limit={this.props.api.walletBalance}
                assetAddress={this.props.address}
                assetTicker={this.props.ticker}
              />
            }
          </Col>
      </div>
    );
  }
}

export default AssetTrayLending;
