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

export const walletBalance = async (address, ticker, networkId) => {
  const url = `/account/${address}/${ticker}`;
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

export default function hotLoad(WrappedComponent, selectProp, fun) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { data: null };
    }

    async componentDidMount() {
      const data = await fun(...selectProp(this.props));
      this.setState({ data });
    }

    async componentDidUpdate(prevProps) {
      const prev = selectProp(prevProps);
      const curr = selectProp(this.props);
      for (let i = 0; i < prev.length; i++) {
        if (prev[i] !== curr[i]) {
          const data = await fun(...selectProp(this.props));
          this.setState({ data });
          return;
        }
      }
    }

    render() {
      return <WrappedComponent api={this.state.data} {...this.props} />;
    }
  }
}
