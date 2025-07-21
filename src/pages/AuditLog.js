import { Card, Input, Table } from 'antd';
import { useState } from 'react';

const mockLogs = [
  { key: 1, date: '2025-07-19', user: 'admin', action: 'Logged In' },
  { key: 2, date: '2025-07-19', user: 'admin', action: 'Updated Configuration Settings' },
  { key: 3, date: '2025-07-18', user: 'customer1', action: 'Booked: Deluxe Room' },
  { key: 4, date: '2025-07-18', user: 'admin', action: 'Cancelled Booking: Room 203' },
  { key: 5, date: '2025-07-17', user: 'customer2', action: 'Payment Successful via Stripe' },
];

const AuditLog = () => {
  const [searchText, setSearchText] = useState('');

  const filteredLogs = mockLogs.filter(log =>
    log.action.toLowerCase().includes(searchText.toLowerCase()) ||
    log.user.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Action', dataIndex: 'action', key: 'action' }
  ];

  return (
    <Card title="Audit Log" style={{ margin: 20 }}>
      <Input.Search
        placeholder="Search by user or action"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20, maxWidth: 300 }}
        allowClear
      />
      <Table columns={columns} dataSource={filteredLogs} pagination={{ pageSize: 5 }} />
    </Card>
  );
};

export default AuditLog;
