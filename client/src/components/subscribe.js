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

export default function subscribe(WrappedComponent, selectProp, fun) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { data: fun(selectProp(this.props)) };
    }

    async componentDidMount() {
      const data = await fun(selectProp(this.props));
      if (data) this.setState({ data });
      else this.setState({data: {borrowAmount: 0, lendAmount: 0}});
    }

    async componentDidUpdate(prevProps) {
      if (selectProp(this.props) !== selectProp(prevProps)) {
        console.log(selectProp(prevProps), selectProp(this.props));
        const data = await fun(selectProp(this.props));
        if (data) this.setState({ data });
        else this.setState({data: {borrowAmount: 0, lendAmount: 0}});
      }
    }

    render() {
      return <WrappedComponent api={this.state.data} {...this.props} />;
    }
  }
}
