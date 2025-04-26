import { Outlet } from "react-router-dom";
import CustomerHeader from "../components/customer/CustomerHeader";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
};

const footerStyle = {
  textAlign: "center",
};
const layoutStyle = {
  with: "100vw",
  height: "100vh",
};

const GuestLayout = () => {
  return (
    <Layout style={layoutStyle}>
      {/* header */}
      <Header style={headerStyle}>
        <CustomerHeader />
      </Header>
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

export default GuestLayout;
