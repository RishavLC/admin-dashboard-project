import { Layout, Menu, Card, Row, Col, Statistic, Button, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, BookOutlined, DashboardOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const UserDashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'User');
  }, []);

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Mock data
  const recentBookings = 3;
  const totalSpent = 4500;
  const lastBooking = "Hotel Paradise, 2024-07-20";

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" collapsible>
        <div style={{ color: 'white', textAlign: 'center', margin: 20 }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 10 }}>{username}</div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<ProfileOutlined />} onClick={() => navigate('/user-dashboard/profile')}>
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />} onClick={() => navigate('/user-dashboard/booking')}>
            Book Now
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
          User Dashboard
        </Header>
        <Content style={{ margin: 20 }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Recent Bookings">
                <Statistic value={recentBookings} suffix="bookings" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Spent">
                <Statistic value={totalSpent} prefix="$" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Last Booking">
                <p>{lastBooking}</p>
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: 20 }} title="Quick Actions">
            <Button type="primary" style={{ marginRight: 10 }} onClick={() => navigate('/user-dashboard/booking')}>
              Book Hotel
            </Button>
            <Button onClick={() => navigate('/user-dashboard/profile')}>
              View Profile
            </Button>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
