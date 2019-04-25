import React, { Component } from 'react';
import { Button, Form, InputNumber } from 'antd';
import { connect } from 'react-redux';

// import { repay } from '../../ethereum/compound';

import './Compound.css';
import { walletBalance } from '../hotLoad';

class Repay extends Component {

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
    }
  }

  render() {
    
    let validateStatus = "";
    let error = "";
    let disabled = false;
    if (!this.valid()) {
      validateStatus = "error";
      error = "Insufficient funds";
      disabled = true;
    }

    return(
      <Form>
        <Form.Item
          validateStatus={validateStatus}
          help={error}
        >
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
            disabled={disabled}
            onClick={this.handleConfirm}
            loading={this.state.loading}
            className="Lend-button"
          >
            Confirm Repayment
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({eth, user})=>({eth, user}), null)(Repay);
