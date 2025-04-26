import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Switch,
  Card,
  Spin,
  Popconfirm,
} from "antd";
import axiosInstance from "../utils/axiosInstance";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [changePassword, setChangePassword] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUser(response.data.data);
        form.setFieldsValue(response.data.data);
        setLoading(false);
      } catch (error) {
        message.error("Không thể lấy thông tin người dùng.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [form]);

  const handleUpdate = async (values) => {
    try {
      await axiosInstance.put("/profile", values);
      message.success("Cập nhật thông tin thành công!");
    } catch (error) {
      const res = error.response;
      if (res?.status === 400 && res.data?.data) {
        const apiErrors = res.data.data;
        const fieldErrors = Object.entries(apiErrors).map(([field, msg]) => ({
          name: field,
          errors: [msg],
        }));
        form.setFields(fieldErrors);
      } else {
        message.error("Cập nhật thất bại.");
      }
    }
  };

  return (
    <>
      {changePassword && (
        <Card
          title="Đổi mật khẩu"
          style={{
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            position: "absolute",
            top: 100,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "50px",
          }}
        >
          <Form
            layout="vertical"
            onFinish={async (values) => {
              try {
                await axiosInstance.put("/profile/password", values);
                message.success("Đổi mật khẩu thành công!");
                setChangePassword(false);
              } catch (error) {
                message.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
              }
            }}
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="oldPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu mới phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="confirmNewPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Xác nhận
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => setChangePassword(false)}
                style={{ width: "100%" }}
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
      <div style={{ padding: "50px", maxWidth: "700px", margin: "auto" }}>
        <Card
          title="Thông tin người dùng"
          style={{
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Spin tip="Đang tải..." size="large" />
            </div>
          ) : (
            <Form
              form={form}
              onFinish={handleUpdate}
              layout="vertical"
              initialValues={user}
            >
              <Form.Item
                label="Họ"
                name="firstName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
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
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày sinh!" },
                ]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="gender"
                valuePropName="checked"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
              >
                <Switch checkedChildren="Nam" unCheckedChildren="Nữ" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Cập nhật
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => setChangePassword(!changePassword)}
                  style={{ width: "100%" }}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
              <Form.Item>
                <Popconfirm
                  title="Xoá người dùng"
                  description="Bạn có chắc chắn muốn xoá tai khoan không?"
                  onConfirm={async () => {
                    try {
                      await axiosInstance.delete(`/profile`);
                      message.success("Xoá người dùng thành công!");
                      store.dispatch(logout());
                      window.location.href = "/login";
                    } catch (err) {
                      console.table(err);
                      message.error(
                        "Lỗi không thể xoá người dùng " +
                          err.response.data.message
                      );
                    }
                  }}
                  style={{ marginLeft: 8 }}
                >
                  <Button danger>Xoá tai khoản</Button>
                </Popconfirm>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
};

export default Profile;
