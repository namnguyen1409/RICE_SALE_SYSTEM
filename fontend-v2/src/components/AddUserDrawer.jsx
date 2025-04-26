import React, { useState } from "react";
import { Button, Drawer, Form, Input, Select, Switch, DatePicker, message, Spin } from "antd";
import axiosInstance from "../utils/axiosInstance";

const AddUserDrawer = ({ visible, onClose, onUserAdded, roles }) => {
  const [loading, setLoading] = useState(false);
  const [revokedPermissions, setRevokedPermissions] = useState([]);

  const handleAddUser = async (values) => {
    setLoading(true);
    try {
      await axiosInstance.post("/users/create", values);
      message.success("Người dùng đã được thêm thành công!");
      onUserAdded();
      onClose();
    } catch (err) {
      message.error("Lỗi khi thêm người dùng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Thêm người dùng mới"
      open={visible}
      onClose={onClose}
      width={480}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form layout="vertical" onFinish={handleAddUser}>
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

          <Form.Item label="Quyền" name="roleList">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}

              options={
                
                roles.map((role) => ({
                  label: role.name,
                  value: role.name,
                }))
              }
              
              onChange={(value) => {
                setRevokedPermissions([]);
                roles.forEach((role) => {

                  if (value.includes(role.name)) {
                    setRevokedPermissions((prev) => [
                      ...prev,
                      ...role.permissions,
                    ]);
                    console.log(role.permissions);
                  }
                })
              }}

              placeholder="Chọn quyền"
            />
          </Form.Item>

          <Form.Item label="Quyền bị thu hồi" name="revokedPermissionList">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              options={
                revokedPermissions.map((permission) => ({
                  label: permission.name,
                  value: permission.name,
                }))
              }
              placeholder="Chọn quyền bị thu hồi"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Thêm người dùng
          </Button>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default AddUserDrawer;