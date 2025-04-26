import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import {jwtDecode} from "jwt-decode";
import axiosPublic from "../utils/axiosPublic";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await axiosPublic.post("/auth/login", values);

      const { token, isAuthenticated } = response.data.data;

      if (isAuthenticated) {
        const decoded = jwtDecode(token);
        const user = {
          id: decoded.sub,
          roles: decoded.scope.split(" ").filter((s) => s.startsWith("ROLE_")),
          permissions: decoded.scope.split(" ").filter((s) => !s.startsWith("ROLE_")),
          exp: decoded.exp
        };
        dispatch(loginSuccess({ user, token }));

        message.success("Đăng nhập thành công!");
        navigate("/profile");
      } else {
        message.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      message.error("Sai tài khoản hoặc mật khẩu.");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h2>Đăng nhập</h2>
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Đăng nhập
          </Button>
        </Form.Item>

        {/* redirect to register */}
        <Form.Item>
          <Button
            type="link"
            onClick={() => navigate("/register")}
            style={{ width: "100%" }}
          >
            Chưa có tài khoản? Đăng ký ngay!
          </Button>
        </Form.Item>

      </Form>
    </div>
  );
};

export default Login;
