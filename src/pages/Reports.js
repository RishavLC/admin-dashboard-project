import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const Reports = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h2>Reports</h2>
        <p>Generate booking, usage, and revenue reports.</p>
      </Content>
    </Layout>
  </Layout>
);

export default Reports;