import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const Services = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h2>Services</h2>
        <p>Manage technician types, categories, and more here.</p>
      </Content>
    </Layout>
  </Layout>
);

export default Services;