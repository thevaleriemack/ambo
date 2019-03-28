import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';

import Borrow from '../Compound/Borrow';
import Lend from '../Compound/Lend';
import hotLoad, { walletBalance } from '../hotLoad';

class AssetTray extends Component {

  renderBalance = (amt) => {
    if ((amt !== undefined) && (amt !== null)) {
      const amount = amt.toString();
      let p1 = amount.slice(0, -18);
      let p2 = amount.slice(-18).slice(0, 4);
      return p1 + "." + p2;
    }
  }

  render() {
    return (
      <div>
        <Row gutter={16}>
        <Col className="gutter-row" span={8}>
            <div className="gutter-box">Borrow</div>
            {this.props.account.connected &&
              <Borrow
                limit={this.props.api}
                assetAddress={this.props.address}
                assetTicker={this.props.ticker}
              />
            }
          </Col>
          <Col
            className="gutter-row"
            span={8}
            style={{textAlign: "center"}}
          >
            <div className="gutter-box">
              Your Wallet Balance
            </div>
            <div>
              {this.renderBalance(this.props.api)}
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">Lend</div>
            {this.props.account.connected &&
              <Lend
                limit={this.props.api}
                assetAddress={this.props.address}
                assetTicker={this.props.ticker}
              />
            }
          </Col>
        </Row>
      </div>
    );
  }
}

const AssetTrayHotLoaded = hotLoad(
  AssetTray,
  (props) => [props.user.address, props.ticker, props.eth.networkId],
  walletBalance
);

export default connect(
  ({ account, eth, user }) => ({ account, eth, user }),
  null
)(AssetTrayHotLoaded);
