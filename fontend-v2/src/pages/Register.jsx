import React from "react";
import { Form, Input, Button, message, DatePicker, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import axiosPublic from "../utils/axiosPublic";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axiosPublic.post("/auth/register", values);
      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      message.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px", margin: "auto" }}>
      <h2>Đăng ký</h2>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
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

        <Form.Item
          label="Họ"
          name="firstName"
          rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="lastName"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          valuePropName="checked"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Đăng ký
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={() => navigate("/login")}>
            Đã có tài khoản? Đăng nhập
          </Button>
        </Form.Item>


      </Form>
    </div>
  );
};

export default Register;