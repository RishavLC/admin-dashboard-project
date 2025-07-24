import { Layout, Menu, Card, Statistic, List, Avatar, message } from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
  const username = localStorage.getItem('username');
  if (!username) {
    message.error('User not logged in!');
    navigate('/login');
    return;
  }
  const interval = setInterval(() => {
    const user = JSON.parse(localStorage.getItem(`user_${username}`));
    if (user) setUser(user);
  }, 1000); // refresh every second

  return () => clearInterval(interval);
}, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const selectedKey = (() => {
    if (location.pathname.includes('/booking')) return '2';
    if (location.pathname.includes('/profile')) return '3';
    return '1';
  })();

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ color: 'white', textAlign: 'center', padding: '20px 0' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 10 }}>{user.username}</div>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
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
        <Header style={{ background: '#fff', textAlign: 'center', fontSize: 20 }}>
          Welcome, {user.username}!
        </Header>

        <Content style={{ margin: 16 }}>
          {location.pathname === '/user-dashboard' ? (
            <>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Card style={{ flex: 1 }}>
                  <Statistic title="Total Bookings" value={user.bookings?.length || 0} />
                </Card>
                <Card style={{ flex: 1 }}>
                  <Statistic title="Total Spent" value={user.totalSpent || 0} prefix="$" />
                </Card>
              </div>

              <Card style={{ marginTop: 24 }} title="Recent Bookings">
                <List
                  itemLayout="horizontal"
                  dataSource={user.bookings || []}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<BookOutlined />} />}
                        title={item.hotel}
                        description={`Date: ${item.date} | Amount: $${item.amount}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
