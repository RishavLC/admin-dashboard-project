import { Layout, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => (
  <Sider breakpoint="lg" collapsedWidth="0">
    <div style={{ color: 'white', margin: '16px', fontSize: '22px', textAlign: 'center' }}>Admin Panel</div>
    <Menu theme="dark" mode="inline">
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/config">Configuration</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FileTextOutlined />}>
        <Link to="/reports">Reports</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<></>}>
        <Link to="/admin-dashboard/audit-log">Audit Log</Link>
      </Menu.Item>

    </Menu>
  </Sider>
);

export default Sidebar;
