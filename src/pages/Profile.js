import { Card, Form, Input, Button, List, message } from 'antd';
import { useState } from 'react';

export const Profile = () => {
  const username = localStorage.getItem('username');
  const [password, setPassword] = useState(localStorage.getItem(`user_${username}`) || '');

  const updatePassword = (values) => {
    localStorage.setItem(`user_${username}`, values.password);
    setPassword(values.password);
    message.success('Password updated successfully!');
  };

  // // Example mock booking history
  // const bookings = [
  //   { id: 1, service: 'Hotel Booking', date: '2024-07-15', amount: '$200' },
  //   { id: 2, service: 'Flight Ticket', date: '2024-07-18', amount: '$450' },
  // ];
  const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const bookings = allBookings.filter(b => b.username === username);

  return (
    <Card title={`Profile: ${username}`} style={{ margin: 20 }}>
      <Form onFinish={updatePassword} layout="vertical" initialValues={{ password }}>
        <Form.Item
          label="Update Password"
          name="password"
          rules={[{ required: true, message: 'Please enter a password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit">Update Password</Button>
      </Form>

      <h3 style={{ marginTop: 30 }}>Booking History</h3>
      <List
        bordered
        dataSource={bookings}
        renderItem={item => (
          <List.Item>
            <b>{item.service}</b> - {item.date} - {item.amount}
          </List.Item>
        )}
      />
    </Card>
  );
};
