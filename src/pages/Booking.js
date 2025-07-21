import { Card, Form, Input, Select, Button, message } from 'antd';

const { Option } = Select;

const Booking = () => {
  const username = localStorage.getItem('username');

  const onFinish = (values) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      ...values,
      username,
      date: new Date().toISOString().split('T')[0]
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    message.success('Booking successful!');
  };

  return (
    <Card title="Book a Hotel" style={{ margin: 20 }}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="hotel" label="Hotel Name" rules={[{ required: true }]}>
          <Input placeholder="Enter hotel name" />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select Category">
            <Option value="Hotel">Hotel</Option>
            <Option value="Travel">Travel</Option>
            <Option value="Transport">Transport</Option>
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="Amount ($)" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Book Now</Button>
      </Form>
    </Card>
  );
};

export default Booking;
