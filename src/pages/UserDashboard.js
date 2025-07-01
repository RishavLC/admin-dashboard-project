import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const UserDashboard = ({ setIsAuthenticated }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar setIsAuthenticated={setIsAuthenticated} /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h1>User Dashboard</h1>
        <p>Welcome! This is your user dashboard.</p>
      </Content>
    </Layout>
  </Layout>
);

export default UserDashboard;