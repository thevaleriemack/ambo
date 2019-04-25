import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { connect } from 'react-redux';

import AssetTrayBorrowing from './AssetTrayBorrowing';
import AssetTrayLending from './AssetTrayLending';
import Borrow from '../Compound/Borrow';
import Lend from '../Compound/Lend';
import hotLoad from '../hotLoad';

class AssetTray extends Component {

  formatBalance = (amt) => {
    if ((amt !== undefined) && (amt !== null)) {
      const amount = amt.toString();
      let p1 = amount.slice(0, -18);
      let p2 = amount.slice(-18).slice(0, 4);
      return p1 + "." + p2;
    }
  }

  renderWalletBalance = () => (
    <Col
      className="gutter-row"
      span={8}
      style={{textAlign: "center"}}
    >
      <div className="gutter-box">
        Your Wallet Balance
      </div>
      <div>
        {this.formatBalance(this.props.api.walletBalance)}
      </div>
    </Col>
  )

  render() {
    return (
      <Row gutter={16}>
        {(this.props.lendBalance > 0) &&
          <AssetTrayLending
            walletBalance={this.renderWalletBalance(this.props.api.walletBalance)}
            {...this.props}
          />
        }
        {(this.props.borrowBalance > 0) &&
          <AssetTrayBorrowing
            walletBalance={this.renderWalletBalance(this.props.api.walletBalance)}
            {...this.props}
          />
        }
        {!this.props.inUse &&
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
            {this.renderWalletBalance(this.props.api.walletBalance)}
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
        }
      </Row>
    );
  }
}

const AssetTrayHotLoaded = hotLoad(
  AssetTray,
  [
    ["walletBalance", (props) => [
      props.user.address, props.ticker, props.eth.networkId
    ]]
  ]
);

export default connect(
  ({ account, eth, user }) => ({ account, eth, user }),
  null
)(AssetTrayHotLoaded);
