import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../components/Section';

import './Main.css';

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <div>Main</div>
            <Section heading="Borrowing" />
            <Section heading="Lending" />
            <Section heading="Other Assets" />
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default Main;
