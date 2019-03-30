import React, { Component, useState } from 'react';
import { Avatar, Card, Col, Empty, Row, Skeleton } from 'antd';
import { connect } from 'react-redux';

import ActivateAsset from './ActivateAsset';
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

const renderRate = (rate) => {
  if (rate) return (rate * 100).toFixed(2) + "%";
}

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
        style={{ marginTop: 16 }}
        extra={<CardDataConnected {...props} />}
      >
      {loading && <Skeleton paragraph={{ rows: 1 }} />}
      {!loading &&
        <div>
          {assetRate &&
            <Row type="flex" justify="space-between" className="rates">
              <Col span={6}>
                <div>Borrow at {renderRate(borrowRate)} APR</div>
              </Col>
              <Col span={6}>
                <div>Lend at {renderRate(lendRate)} APR</div>
              </Col>
            </Row>
          }
          {!assetRate &&
            <Empty
              image={""}
              description={
                <span>
                  Oops! The data could not be retrieved. Please try again.
                </span>
              }
            />
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
