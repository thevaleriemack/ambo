import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAll } from '../store/assets';
import Section from '../components/Section';

import './Main.css';

class Main extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <div>Main</div>
            <Section
              heading="Borrowing"
              assets={[]}
            />
            <Section
              heading="Lending"
              assets={[]}
            />
            <Section
              heading="Available Assets"
              assets={this.props.assets.all}
            />
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default connect(({assets}) => ({assets}), {
  getAll
})(Main);
