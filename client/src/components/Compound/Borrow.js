import React, { Component } from 'react';
import { Button, Form, InputNumber } from 'antd';
import { connect } from 'react-redux';

import { borrow } from '../../ethereum/compound';

import './Compound.css';

class Borrow extends Component {

  state = {
    amount: 0,
    loading: false
  }

  convertAmount = (amt) => {
    return this.state.amount * (10**18);
  }

  valid = () => {
    const amount = this.convertAmount(this.state.amount);
    return (amount <= this.props.limit);
  }

  handleChange = (value) => {
    this.setState({
      amount: value
    });
  }

  handleConfirm = () => {
    if (this.valid()) {
      this.setState({ loading: true });
      const amount = this.convertAmount(this.state.amount);
      borrow(
        this.props.eth.networkId,
        this.props.user.address,
        this.props.assetAddress,
        amount.toString()
      )
      .then(() => {
        this.setState({ loading: false });
      });
    }
  }

  componentDidUpdate(prevProps) {
    // if it has increased, we know it worked
    // if this has the lending tag, add to lending section
  }

  render() {
  

    return(
      <Form>
        <Form.Item>
          <InputNumber
            min={0.0001}
            max={this.props.limit}
            step={0.0001}
            onChange={this.handleChange}
            className="Lend-input"
          />
        </Form.Item>
        <Form.Item>
          <Button
            key="1"
            type="primary"
            disabled={true}
            onClick={this.handleConfirm}
            loading={this.state.loading}
            className="Lend-button"
          >
            Confirm Borrow
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({eth, user})=>({eth, user}), null)(Borrow);
