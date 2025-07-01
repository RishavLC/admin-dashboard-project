import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const AdminDashboard = ({ setIsAuthenticated }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar setIsAuthenticated={setIsAuthenticated} /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome, Admin. Manage your system here.</p>
      </Content>
    </Layout>
  </Layout>
);

export default AdminDashboard;