import React from 'react';
import { PageHeader, Typography } from 'antd';
import { Jumbotron } from 'reactstrap';

import './Section.css';

const { Paragraph } = Typography;

export default function SectionEmpty(props) {
  return (
    <Jumbotron fluid>
      <PageHeader
        title={props.heading}
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="wrap">
          <div className="content">
            <div className="content">
              <Paragraph>{props.body}</Paragraph>
              <p className="contentLink">
                <a>
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                    alt="start"
                  />
                  Start {props.title} Now
              </a>
                <a>
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                    alt="learn"
                  />
                  Learn More
              </a>
              </p>
            </div>
          </div>
          <div className="extraContent">
            <img
              src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
              alt="content"
            />
          </div>
        </div>
      </PageHeader>
    </Jumbotron>
  );
}
