import React from 'react';
import { Col, Row, Statistic } from 'antd';

const AssetCardLending = (props) => {
  const fiatValue = (props.prices && props.prices[props.user.currency]) * props.lendBalance;
  return (
    <div>
      {props.loading && props.spinner}
      {!props.loading &&
        <div>
          <Row type="flex" justify="space-between" className="rates">
            <Col span={6}>
              <Statistic
                title="Value"
                value={fiatValue && fiatValue.toFixed(2)}
                suffix={props.user.currency}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Balance"
                value={String(props.lendBalance)}
                suffix={props.ticker}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="APR"
                value={props.assetRate && props.lendRate}
                suffix="%"
              />
            </Col>
          </Row>
        </div>
      }
    </div>
  );
}

export default AssetCardLending;
