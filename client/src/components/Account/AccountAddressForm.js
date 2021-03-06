import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';

const AccountAddressForm = (props) => {
  
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  const handleSubmit = () => {
    const address = input.trim();
    if (address !== "") {
      props.setUserAddress(address);
      props.setAccountConnected(true);
    } else {
      message.error("Invalid public key address");
    }
  }

  return(
    <Form layout="inline">
      <Form.Item>
        <Input
          placeholder="Enter Public Key Address"
          allowClear
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>Connect</Button>
      </Form.Item>
    </Form>
  );
}

export default AccountAddressForm;
