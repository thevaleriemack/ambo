import React from 'react';
import { Col, Icon, Row, Spin } from 'antd';

const AssetCardLending = (props) => {
  return (
    <div>
      {props.loading && props.spinner}
      {!props.loading &&
        <div>
          <Row type="flex" justify="space-between" className="rates">
            <Col span={6}>
              <div>Earnings</div>
            </Col>
            <Col span={6}>
              <div>Balance</div>
            </Col>
            <Col span={6}>
              {props.assetRate &&
                <div>Lend at {props.lendRate} APR</div>
              }
              {!props.assetRate &&
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
