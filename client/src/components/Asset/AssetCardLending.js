import React from 'react';
import { Avatar, Card, Col, Icon, Row, Spin } from 'antd';

const { Meta } = Card;

const AssetCardLending = (props) => {
  const assetRate = props.assetRate;
  const lendRate = props.lendRate;
  const loading = (assetRate === undefined) ? true : false;
  const inUse = props.inUse;
  return (
    <div>
      {loading &&
        <Spin
          className="rate-loading"
          indicator={<Icon type="loading" spin />}
        />
      }
      {!loading &&
        <div>
          <Row type="flex" justify="space-between" className="rates">
            <Col span={6}>
              <div>Earnings</div>
            </Col>
            <Col span={6}>
              <div>Balance</div>
            </Col>
            <Col span={6}>
              {assetRate &&
                <div>Lend at {lendRate} APR</div>
              }
              {!assetRate &&
                <div>
                  --
                </div>
              }
            </Col>
          </Row>
        </div>
      }
    </div>
  );
}

export default AssetCardLending;
