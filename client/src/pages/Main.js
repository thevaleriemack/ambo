import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Jumbotron } from 'reactstrap';

import Section from '../components/Section';
import { getAllAssets, getAssetImages } from '../store/assets';
import { setUserLocale } from '../store/user';

import './Main.css';

import emptyStateCopy from '../data/emptyStateCopy.json';

const EmptyState = (props) => {
  return(
    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-4">{props.heading}</h1>
        <p className="lead">{props.body}</p>
      </Container>
    </Jumbotron>
  );
}

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
              <EmptyState
                heading={emptyStateCopy.borrow.heading}
                body={emptyStateCopy.borrow.body}
              />
            </Section>
            <Section
              heading="Lending"
              assets={[]}
            >
              <EmptyState
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
