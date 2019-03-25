import React, { useState } from 'react';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

export default function AssetCard(props) {
  const [loading, setLoading] = useState(false);
  return (
    <div onClick={props.onClick}>
      <Card style={{ marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src={props.imageUrl} />}
          title={props.ticker}
          description={props.name}
        />
      </Card>
    </div>
  );
}
