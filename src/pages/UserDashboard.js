import { Layout, Menu, Avatar } from 'antd';
import { DashboardOutlined, BookOutlined, ProfileOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Sider, Header, Content } = Layout;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'User');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ color: 'white', textAlign: 'center', padding: '20px 0' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 10 }}>{username}</div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/user-dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/user-dashboard/booking">My Bookings</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/user-dashboard/profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', textAlign: 'center', fontSize: 20 }}>Welcome, {username}</Header>
        <Content style={{ margin: 16 }}><Outlet /></Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
