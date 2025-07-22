import { Layout, Menu, Card, Statistic, List, Avatar } from 'antd';
import {
  DashboardOutlined, BookOutlined, ProfileOutlined,
  LogoutOutlined, UserOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    let userData = null;
    try {
      const storedUser = localStorage.getItem(`user_${username}`);
      if (storedUser) {
        userData = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
    }
    setUser(userData);  // ✅ you missed this line
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <div style={{ color: 'white', textAlign: 'center', padding: '20px 0' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 10 }}>{user.username}</div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/user-dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/user-dashboard/bookings">My Bookings</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/profile">My Profile</Link>
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
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BookOutlined />} />}
                    title={item.hotel}
                    description={`Date: ${item.date} | Amount: $${item.amount}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
