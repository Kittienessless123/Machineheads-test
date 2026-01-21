import { Button, Flex, Form, Input } from "antd";
import React, { useState } from "react";
import { Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [err, setError] = useState("");

  function loginHandler(): void {}

  return (
    <Flex>
      <Title level={2}>Sign in</Title>
      <Form form={form} name="login" initialValues={{ remember: true }}>
        <Form.Item name="email" rules={[{ required: true, message: "" }]}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              fontSize: 20,
              height: 40,
            }}
            prefix={<UserOutlined />}
            placeholder={"email"}
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "" }]}>
          <Input
            style={{
              fontSize: 20,
              height: 40,
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined />}
            type="password"
            placeholder={"password"}
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            onClick={() => loginHandler()}
            style={{
              fontSize: 20,
              height: 40,
            }}
            block
            type="primary"
          >
            {"Sign in"}
          </Button>
        </Form.Item>
      </Form>
      {/* {err && (
        <div>
          <p>Ошибка: {err}</p>
        </div>
      )} */}
    </Flex>
  );
};
