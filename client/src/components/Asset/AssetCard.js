import React, { Component, useState } from 'react';
import { Avatar, Card, Col, Icon, Row, Spin } from 'antd';
import { connect } from 'react-redux';

import ActivateAsset from './ActivateAsset';
import AssetCardBorrowing from './AssetCardBorrowing';
import AssetCardLending from './AssetCardLending';
import hotLoad from '../hotLoad';

const { Meta } = Card;

class CardData extends Component {
  render() {
    return (
      <Row>
        <Col>
          {this.props.user.currency + " "}
          {this.props.prices && this.props.prices[this.props.user.currency]}
        </Col>
        <Col>
          {!this.props.activated &&
            <ActivateAsset
              ticker={this.props.ticker}
              address={this.props.address}
            />
          }
        </Col>
      </Row>
    );
  }
}

const CardDataConnected = connect(({ user }) => ({ user }))(CardData);

const formatBalance = (amt) => {
  if (amt > 0) {
    return (Math.floor((amt / 1000000000000000000) * 10000) / 10000);
  }
}

const formatRate = (rate) => {
  if (rate) return (rate * 100).toFixed(2);
}

const renderSpinner = () => (
  <Spin className="rate-loading" indicator={
    <Icon type="loading" spin />
  }
  />
);

const AssetCard = (props) => {
  const assetRate = props.api.assetRate;
  const lendRate = assetRate && assetRate.supply_rates[0].rate;
  const borrowRate = assetRate && assetRate.borrow_rates[0].rate;
  const loading = (assetRate === undefined) ? true : false;
  return (
    <div onClick={props.onClick}>
      <Card
        title={
          <Meta
            avatar={<Avatar src={props.imageUrl} />}
            title={props.ticker}
            description={props.name}
          />
        }
        style={{ marginTop: 16, ...props.inUseStyle }}
        extra={<CardDataConnected {...props} />}
      >
        {(props.lendBalance > 0) &&
          <AssetCardLending
            {...props}
            cardData={<CardDataConnected {...props} />}
            assetRate={assetRate}
            loading={loading}
            spinner={renderSpinner()}
            lendRate={formatRate(lendRate)}
            lendBalance={formatBalance(props.lendBalance)}
          />
        }
        {(props.borrowBalance > 0) &&
          <AssetCardBorrowing
            {...props}
            cardData={<CardDataConnected {...props} />}
            assetRate={assetRate}
            loading={loading}
            spinner={renderSpinner()}
            borrowRate={formatRate(borrowRate)}
            borrowBalance={formatBalance(props.borrowBalance)}
          />
        }
        {!props.inUse &&
          <div>
            {loading && renderSpinner()}
            {!loading &&
              <div>
                {assetRate &&
                  <Row type="flex" justify="space-between" className="rates">
                    <Col span={8}>
                      <div>Borrow at {formatRate(borrowRate)}% APR</div>
                    </Col>
                    <Col span={6}>
                      <div>Lend at {formatRate(lendRate)}% APR</div>
                    </Col>
                  </Row>
                }
                {!assetRate &&
                  <span>
                    Oops! The data could not be retrieved. Please try again.
                  </span>
                }
              </div>
            }
          </div>
        }
      </Card>
    </div>
  );
}

const AssetCardHotLoaded = hotLoad(
  AssetCard,
  [
    ["assetRate", (props) => [props.address]]
  ]
);

export default AssetCardHotLoaded;
