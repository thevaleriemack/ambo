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
  setUserBorrowingList,
  setUserLendingList,
  setUserLocale,
  setUserUnusedList
} from '../store/user';

import emptyStateCopy from '../data/emptyStateCopy.json';
import './Main.css';
import { getBorrowBalance, getLendBalance } from '../ethereum/compound';

const binarySearch = (arr, data, attr, lo, hi) => {
  if (lo === hi) return lo;

  const mid = Math.floor((hi + lo) / 2);
  if (data[attr] > arr[mid][attr]) {
    return binarySearch(arr, data, attr, mid + 1, hi);
  } else if (data[attr] < arr[mid][attr]) {
    return binarySearch(arr, data, attr, lo, mid);
  } else {
    return mid;
  }
}

class Main extends Component {

  componentDidMount() {
    this.props.setUserLocale();
    this.props.getAllAssets();
    this.props.getAssetImages();
    this.checkNamespace()
      .then(() => {
        if (this.props.eth.namespaced) {
          ethereumListener(() => {
            this.updateCredentials()
              .then(() => {
                this.props.getAllAssets(this.props.eth.networkId);
                this.sortAssets(this.props.user.address);
              });
          });
        }
      });
  }

  checkNamespace = async () => {
    if ((window.web3 !== undefined) ||
        (window.ethereum !== undefined)
    ) {
      await this.props.updateNamespaceStatus(true);
    } else {
      await this.props.updateNamespaceStatus(false);
    }
  }

  updateCredentials = async () => {
    let addr = getAddress();
    if (addr !== this.props.user.address) {
      await this.props.setUserAddress(addr);
    }
    let id = getNetworkId();
    if (id !== this.props.eth.networkId) {
      await this.props.setEthNetwork(id);
    }
  }

  sortAssets = (addr) => {
    let borrowing = [];
    let lending = [];
    let unused = [];

    const sorted = this.props.assets.all.map(async (asset) => {
      const borrowBalance = await getBorrowBalance(
        this.props.eth.networkId, addr, asset.address
      );
      if (borrowBalance !== null) {
        const data = {...asset, borrowBalance, lendBalance: 0}
        const i = binarySearch(borrowing, data, "ticker", 0, borrowing.length);
        borrowing.splice(i, 0, data);
      } else {
        const lendBalance = await getLendBalance(
          this.props.eth.networkId, addr, asset.address
        );
        if (lendBalance !== null) {
          const data = {...asset, borrowBalance: 0, lendBalance};
          const i = binarySearch(lending, data, "ticker", 0, lending.length);
          lending.splice(i, 0, data);
        } else {
          const data = {...asset, borrowBalance: 0, lendBalance: 0};
          const i = binarySearch(unused, data, "ticker", 0, unused.length);
          unused.splice(i, 0, data);
        }
      }
    });

    Promise.all(sorted).then(() => {
      this.props.setUserBorrowingList(borrowing);
      this.props.setUserLendingList(lending);
      this.props.setUserUnusedList(unused);
    });
  }

  getAssets = (list) => {
    return (this.props.account.connected)
           ? list
           : [];
  }

  getAvailableAssets = () => {
    return (!this.props.account.connected)
           ? this.props.assets.all
           : this.props.user.unusedList;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-lg-8">
            <Account />
            <Section
              heading="Borrowing"
              assets={this.getAssets(this.props.user.borrowingList)}
            >
              <SectionEmpty
                title="Borrowing"
                heading={emptyStateCopy.borrow.heading}
                body={emptyStateCopy.borrow.body}
              />
            </Section>
            <Section
              heading="Lending"
              assets={this.getAssets(this.props.user.lendingList)}
            >
              <SectionEmpty
                title="Lending"
                heading={emptyStateCopy.lend.heading}
                body={emptyStateCopy.lend.body}
              />
            </Section>
            <Section
              heading="Available Assets"
              assets={this.getAvailableAssets()}
            />
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default connect(
  ({account, assets, eth, user}) => ({account, assets, eth, user}), {
  setEthNetwork,
  setUserAddress,
  setUserBorrowingList,
  setUserLendingList,
  setUserLocale,
  setUserUnusedList,
  getAllAssets,
  getAssetImages,
  updateNamespaceStatus
})(Main);
