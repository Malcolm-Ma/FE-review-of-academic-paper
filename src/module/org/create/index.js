/**
 * @file create org
 * @author Mingze Ma
 */

import { Button, Form, Input, message } from 'antd';
import React from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import actions from "src/actions";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await actions.createOrg({
        ...values
      });
      message.success("Create conference successfully!");
      navigate('/');
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Container sx={{pt: 3}}>
      <Typography variant="h4" sx={{pb: 5}}>
        Create Conference
      </Typography>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['name']}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['email']}
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['description']}
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={['user_id_list']}
          label="Initial Users"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};
