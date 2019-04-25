import React from 'react';
import { Avatar, Card, Col, Icon, Row, Spin } from 'antd';

const { Meta } = Card;

const AssetCardBorrowing = (props) => {
  const assetRate = props.assetRate;
  const borrowRate = props.borrowRate;
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
            <Col span={4}>
                {assetRate &&
                  <div>Borrow at {borrowRate} APR</div>
                }
                {!assetRate &&
                  <div>
                    --
                  </div>
                }
              </Col>
              <Col span={4}>
                <div>Interest</div>
              </Col>
              <Col span={4}>
                <div>Balance</div>
              </Col>
            </Row>
        </div>
      }
    </div>
  );
}

export default AssetCardBorrowing;
