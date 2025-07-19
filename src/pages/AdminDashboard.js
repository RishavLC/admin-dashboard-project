import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Sider, Header, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ color: 'white', margin: 16, fontWeight: 'bold', textAlign: 'center' }}>Admin</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}><Link to="/admin-dashboard">Dashboard</Link></Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}><Link to="/admin-dashboard/users">Users</Link></Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}><Link to="/admin-dashboard/config">Configuration</Link></Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}><Link to="/admin-dashboard/reports">Reports</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', textAlign: 'center', fontSize: 20 }}>Admin Dashboard</Header>
        <Content style={{ margin: '16px' }}><Outlet /></Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
