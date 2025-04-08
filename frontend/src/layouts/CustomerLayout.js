import CustomerHeader from "../components/customer/CustomerHeader";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120
};

const footerStyle = {
  textAlign: "center"
};
const layoutStyle = {
  with: "100vw",
  height: "100vh",
};

const CustomerLayout = () => {
  return (
    <Layout style={layoutStyle}>
      {/* header */}
      <Header style={headerStyle}>
        <CustomerHeader />
      </Header>
      <Content style={contentStyle}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <h1>Welcome to the Customer Layout</h1>
          <p>This is the content area.</p>
        </div>
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
