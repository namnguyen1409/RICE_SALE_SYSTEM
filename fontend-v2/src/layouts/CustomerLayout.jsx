import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomerHeader from "../components/customer/CustomerHeader";
import { Button, FloatButton, Layout } from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axiosPublic from "../utils/axiosPublic";
import store from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const { Header, Footer, Content } = Layout;

const headerStyle = { textAlign: "center" };
const contentStyle = { textAlign: "center", minHeight: 120 };
const footerStyle = { textAlign: "center" };
const layoutStyle = { width: "100vw", height: "100vh" };

const CustomerLayout = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const userRoles = user?.roles || [];

  const hasAccess = allowedRoles
    ? userRoles.some((role) => allowedRoles.includes(role))
    : true;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <CustomerHeader />
      </Header>
      {userRoles.includes("ROLE_ADMIN") && (
        <FloatButton.Group
          trigger="hover"
          type="primary"
          icon={<MenuOutlined />}
          style={{ insetInlineEnd: 24 }}
        >
          <FloatButton
            icon={<UserOutlined />}
            tooltip={<span>Quản lý người dùng</span>}
            onClick={() => navigate("/users")}
          />
          <FloatButton
            icon={<ProfileOutlined />}
            tooltip={<span>Thông tin cá nhân</span>}
            onClick={() => navigate("/profile")}
          />
        </FloatButton.Group>
      )}

      {userRoles.includes("ROLE_USER") && (
        <FloatButton
          type="primary"
          icon={<LogoutOutlined />}
          style={{ insetInlineEnd: 124 }}
          tooltip={<span>Đăng xuất</span>}
          onClick={() => {
            // Handle logout logic here
            axiosPublic.post("/auth/logout", {
              token: token,
            });
            store.dispatch(logout());
            message.success("Đăng xuất thành công!");
            navigate("/login");
          }}
        />
      )}

      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>
        <div style={{ padding: 24 }}>
          <p>Footer Content</p>
        </div>
      </Footer>
    </Layout>
  );
};

export default CustomerLayout;
