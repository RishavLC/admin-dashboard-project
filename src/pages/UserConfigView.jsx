import { Card, Descriptions } from 'antd';
import { useEffect, useState } from 'react';

const UserConfigView = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("booking_config");
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  if (!config) return <p>No configuration available yet.</p>;

  return (
    <Card title={`Welcome to ${config.companyName}`} style={{ margin: 20 }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Max Bookings Per Day">{config.maxDailyBookings}</Descriptions.Item>
        <Descriptions.Item label="Booking Window">{config.bookingWindowDays} days</Descriptions.Item>
        <Descriptions.Item label="Theme">{config.theme}</Descriptions.Item>
        <Descriptions.Item label="Online Payments">
          {config.paymentSettings?.enableOnlinePayments ? "Enabled" : "Disabled"}
        </Descriptions.Item>
        {config.paymentSettings?.enableOnlinePayments && (
          <Descriptions.Item label="Payment Gateway">{config.paymentSettings?.paymentGateway}</Descriptions.Item>
        )}
      </Descriptions>
    </Card>
  );
};

export default UserConfigView;
