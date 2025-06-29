import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const Settings = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h2>Settings</h2>
        <p>Admin preferences, permissions, and configurations.</p>
      </Content>
    </Layout>
  </Layout>
);

export default Settings;