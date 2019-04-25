import React from 'react';
import { Col, Icon, Row, Spin } from 'antd';

const AssetCardBorrowing = (props) => {
  return (
    <div>
      {props.loading && props.spinner}
      {!props.loading &&
        <div>
          <Row type="flex" justify="space-between" className="rates">
            <Col span={4}>
                {props.assetRate &&
                  <div>Borrow at {props.borrowRate} APR</div>
                }
                {!props.assetRate &&
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
