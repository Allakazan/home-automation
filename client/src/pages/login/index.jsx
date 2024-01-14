import { useState } from "react";
import { theme, Form, Input, Checkbox, Button, Flex, Typography } from "antd";
import { UserOutlined, LockOutlined, ApiFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import http from "../../services/http.service";
import { useAuth } from "../../providers/auth.provider";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    remember: yup.boolean(),
  })
  .required();

const { Text, Title } = Typography;

export default function Login() {
  const [loginError, setLoginError] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  const {
    token: { colorTextPlaceholder, colorTextLightSolid, fontSize },
  } = theme.useToken();

  const onSubmit = async ({ email, password, remember }) => {
    try {
      const {
        data: { access_token, refresh_token },
      } = await http.post("/auth/login", {
        email,
        password,
      });

      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      navigate("/", { replace: true });
    } catch (e) {
      setLoginError(true);
      console.error(e);
    }
  };

  return (
    <div>
      <video
        autoPlay
        muted
        loop
        id="loginVideo"
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          minWidth: "100%",
          minHeight: "100%",
          filter: "hue-rotate(200deg) contrast(.95) brightness(1.2)",
        }}
      >
        <source src="./video/login-1.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          padding: 30,
          width: 380,
          backgroundColor: "rgba(0,0,0,.4)",
          backdropFilter: "blur(4px)",
          borderRadius: ".3em",
          right: "15vw",
          top: "calc(50% - calc(380px/2))",
          position: "fixed",
        }}
      >
        <Flex vertical justify="center" align="center">
          <Title
            level={2}
            style={{
              marginBottom: 30,
              marginTop: 0,
              color: colorTextLightSolid,
            }}
          >
            <ApiFilled /> Automate
          </Title>
        </Flex>
        <Flex vertical>
          <Form onFinish={handleSubmit(onSubmit)}>
            <FormItem control={control} name="email">
              <Input
                size="large"
                placeholder="email"
                prefix={
                  <UserOutlined
                    style={{ color: colorTextPlaceholder, fontSize }}
                  />
                }
              />
            </FormItem>
            <FormItem control={control} name="password">
              <Input
                size="large"
                type="password"
                placeholder="password"
                prefix={
                  <LockOutlined
                    style={{ color: colorTextPlaceholder, fontSize }}
                  />
                }
              />
            </FormItem>
            {loginError && (
              <Flex align="center" justify="center">
                <Text type="danger">
                  Please enter a correct email or password.
                </Text>
              </Flex>
            )}
            <Flex align="flex-start" justify="space-between">
              <FormItem
                control={control}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox style={{ color: colorTextLightSolid }}>
                  Keep me logged in
                </Checkbox>
              </FormItem>
              <Button type="link">Forgot password</Button>
            </Flex>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </div>
    </div>
  );
}
