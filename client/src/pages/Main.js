import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../components/Section/Section';
import SectionEmpty from '../components/Section/SectionEmpty';
import { getAllAssets, getAssetImages } from '../store/assets';
import { setUserLocale } from '../store/user';

import './Main.css';

import emptyStateCopy from '../data/emptyStateCopy.json';

class Main extends Component {
  componentDidMount() {
    this.props.setUserLocale();
    this.props.getAllAssets();
    this.props.getAssetImages();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-lg-6">
            <div>Main</div>
            <Section
              heading="Borrowing"
              assets={[]}
            >
              <SectionEmpty
                title="Borrowing"
                heading={emptyStateCopy.borrow.heading}
                body={emptyStateCopy.borrow.body}
              />
            </Section>
            <Section
              heading="Lending"
              assets={[]}
            >
              <SectionEmpty
                title="Lending"
                heading={emptyStateCopy.lend.heading}
                body={emptyStateCopy.lend.body}
              />
            </Section>
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

export default connect(({assets, user}) => ({assets, user}), {
  setUserLocale,
  getAllAssets,
  getAssetImages
})(Main);
