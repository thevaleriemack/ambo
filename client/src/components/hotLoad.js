import React, { Component } from 'react';
import axios from '../axiosConfig';

export const accountData = async (address) => {
  const url = `/compound/account/${address}`;
  const data = await axios.get(url, {
    params: {
      units: "eth"
    }
  })
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return resp && resp.data;
    });
  return data;
}

export const assetRate = async (assetAddress) => {
  const url = `/compound/market/${assetAddress}`;

  const currentTime = Math.floor(Date.now()/1000);

  const minBlockTime = currentTime - 86400; // subtracting 24 hours
  const maxBlockTime = currentTime;
  const buckets = 1;

  const data = await axios.get(url, {
    params: {
      minBlockTime,
      maxBlockTime,
      buckets
    }
  })
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return resp && resp.data;
    });
  
  return (data) ? data : null;
}

export const walletBalance = async (address, ticker, networkId) => {
  const url = `/account/${address}/${ticker}`;

  if (!networkId) networkId = 1;
  const data = await axios.get(url, {
    params: {
      networkId
    }
  })
    .catch((err) => {
      console.error(err);
    })
    .then((resp) => {
      return resp && resp.data;
    });
  return data;
}

const funNames = {
  "accountData": accountData,
  "assetRate": assetRate,
  "walletBalance": walletBalance
}

export default function hotLoad(WrappedComponent, funList) {

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { loaded: false };
    }

    componentDidMount() {
      funList.forEach(async arr => {
        await this.updateState(arr);
      });
      this.setState({ loaded: true });
    }

    componentDidUpdate(prevProps) {
      funList.forEach(async arr => {
        const propsSelector = arr[1];
        const prev = propsSelector(prevProps);
        const curr = propsSelector(this.props);
        for (let i = 0; i < prev.length; i++) {
          if (prev[i] !== curr[i]) {
            await this.updateState(arr);
            return;
          }
        }
      });
    }

    updateState = async (arr) => {
      const funName = arr[0];
      const propsSelector = arr[1];
      const fun = funNames[funName];
      const data = await fun(...propsSelector(this.props));
      this.setState({ [funName]: data });
    }

    render() {
      return (
        this.state.loaded &&
        <WrappedComponent api={this.state} {...this.props} />
      );
    }
  }
}
