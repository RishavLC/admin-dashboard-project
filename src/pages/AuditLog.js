import { Card, Input, Table } from 'antd';
import { useState } from 'react';

const mockLogs = [
  { key: 1, date: '2024-07-19', user: 'admin', action: 'Logged In' },
  { key: 2, date: '2024-07-19', user: 'admin', action: 'Updated Settings' },
  { key: 3, date: '2024-07-19', user: 'user1', action: 'Booked Appointment' },
  { key: 4, date: '2024-07-19', user: 'admin', action: 'Deleted Booking' },
  { key: 5, date: '2024-07-18', user: 'user2', action: 'Logged In' },
];

const AuditLog = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

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
        placeholder="Search by action or user"
        onChange={handleSearch}
        style={{ marginBottom: 20, maxWidth: 300 }}
        allowClear
      />
      <Table
        columns={columns}
        dataSource={filteredLogs}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default AuditLog;
