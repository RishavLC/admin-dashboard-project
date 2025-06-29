import { Menu } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Menu
      mode="vertical"
      theme="dark"
      onClick={(e) => navigate(e.key)}
      items={[
        { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '/users', icon: <UserOutlined />, label: 'Users' },
        { key: '/services', icon: <SettingOutlined />, label: 'Services' },
        { key: '/reports', icon: <FileTextOutlined />, label: 'Reports' },
        { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
      ]}
    />
  );
};

export default Sidebar;
