import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const Dashboard = ({ setIsAuthenticated }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar setIsAuthenticated={setIsAuthenticated} /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h1>Welcome to QuickFixPro Admin Dashboard</h1>
        <p>Monitor services, users, and reports here.</p>
      </Content>
    </Layout>
  </Layout>
);

export default Dashboard;