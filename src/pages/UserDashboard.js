import { Card, Row, Col, Statistic, Button } from 'antd';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || 'User');
  }, []);

  // Example of mock data (bookings and revenue)
  const recentBookings = 3;
  const totalSpent = 4500;

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {username}!</h2>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card>
            <Statistic title="Recent Bookings" value={recentBookings} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Total Spent ($)" value={totalSpent} prefix="$" />
          </Card>
        </Col>
      </Row>
      <Button type="primary" style={{ marginTop: 20 }} href="/profile">
        Go to Profile
      </Button>
    </div>
  );
};

export default UserDashboard;
