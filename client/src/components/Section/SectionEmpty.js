import React from 'react';
import { PageHeader, Typography } from 'antd';
import { Jumbotron } from 'reactstrap';

import borrowIcon from '../../images/borrow.png';
import lendIcon from '../../images/lend.png';
import people1 from '../../images/people1.jpg';
import people2 from '../../images/people2.jpg';
import './Section.css';

const SectionEmpty = (props) => {

  const icon = (props.title === "Lending") ? lendIcon : borrowIcon;
  const graphic = (props.title === "Borrowing") ? people1 : people2;

  return (
    <Jumbotron fluid>
      <PageHeader
        title={props.heading}
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="wrap">
          <div className="content">
            <div className="content">
              <Typography.Paragraph>
                {props.body}
              </Typography.Paragraph>
              <p className="contentLink">
                <a href="#Available%20Assets">
                  <img
                    src={icon}
                    alt="start"
                    className="SectionEmpty-icon"
                  />
                  Start {props.title} Now
              </a>
              </p>
            </div>
          </div>
          <div className="extraContent">
            <img
              src={graphic}
              alt="content"
              className="SectionEmpty-logo"
            />
          </div>
        </div>
      </PageHeader>
    </Jumbotron>
  );
}

export default SectionEmpty;
