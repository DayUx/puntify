import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  Typography,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Text, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Veuillez renseigner votre pseudo!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Pseudo"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez renseigner votre mot de passe!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mot de passe"
            />
          </Form.Item>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Se connecter
            </Button>
            <Content
              style={{
                width: "100%",
              }}
            >
              <Text>Ou </Text>
              <Link onClick={() => navigate("/register")}>inscrivez vous!</Link>
            </Content>
          </Content>
        </Form>
      </Card>
    </Layout>
  );
};

export default Login;
