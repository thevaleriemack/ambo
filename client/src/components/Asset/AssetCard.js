import React, { Component, useState } from 'react';
import { Avatar, Card, Col, List, Row, Skeleton } from 'antd';
import { connect } from 'react-redux';

import ActivateAsset from './ActivateAsset';

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

const AssetCard = (props) => {
  const [loading, setLoading] = useState(false);
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
        loading={loading}
        extra={<CardDataConnected {...props} />}
      >
      </Card>
    </div>
  );
}

export default AssetCard;
