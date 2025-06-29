import { Layout, Table } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

const data = [
  { key: '1', name: 'John Doe', email: 'john@example.com', role: 'Technician' },
  { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
];

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Role', dataIndex: 'role' },
];

const Users = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider><Sidebar /></Sider>
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h2>User Management</h2>
        <Table dataSource={data} columns={columns} />
      </Content>
    </Layout>
  </Layout>
);

export default Users;