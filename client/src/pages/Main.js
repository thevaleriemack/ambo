import React, { Component } from 'react';
import { connect } from 'react-redux';

import Account from '../components/Account/Account';
import Section from '../components/Section/Section';
import SectionEmpty from '../components/Section/SectionEmpty';
import {
  ethereumListener,
  getAddress,
  getNetworkId
} from '../ethereum';
import { getAllAssets, getAssetImages } from '../store/assets';
import { setEthNetwork, updateNamespaceStatus } from '../store/eth';
import {
  setUserAddress,
  setUserLocale
} from '../store/user';

import emptyStateCopy from '../data/emptyStateCopy.json';
import './Main.css';

class Main extends Component {


  componentDidMount() {
    this.props.setUserLocale();
    this.props.getAllAssets();
    this.props.getAssetImages();
    this.checkNamespace()
      .then(() => {
        if (this.props.eth.namespaced) {
          ethereumListener(() => {
            if (this.props.eth.enabled) this.updateCredentials();
          });
        }
      });
  }

  checkNamespace = async () => {
    if ((window.web3 !== undefined) || (window.ethereum !== undefined)) {
      await this.props.updateNamespaceStatus(true);
    } else {
      await this.props.updateNamespaceStatus(false);
    }
  }

  updateCredentials = () => {
    let addr = getAddress();
    if (addr !== this.props.user.address) {
      this.props.setUserAddress(addr);
    }
    let id = getNetworkId();
    if (id !== this.props.eth.networkId) {
      this.props.setEthNetwork(id);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-lg-6">
            <Account />
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

export default connect(({assets, eth, user}) => ({assets, eth, user}), {
  setEthNetwork,
  setUserAddress,
  setUserLocale,
  getAllAssets,
  getAssetImages,
  updateNamespaceStatus
})(Main);
