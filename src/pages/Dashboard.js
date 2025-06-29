import Sidebar from '../components/Sidebar';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Sidebar />
      </Sider>
      <Layout>
        <Content style={{ padding: '20px' }}>
          <h1>Welcome to QuickFixPro Admin Dashboard</h1>
          <p>Here you can manage users, services, and view reports.</p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
