import { Card, Input, Table } from 'antd';
import { useState, useEffect } from 'react';

const AuditLog = () => {
  const [searchText, setSearchText] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('auditLogs')) || [];
    setLogs(storedLogs);
  }, []);

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchText.toLowerCase()) ||
    log.action.toLowerCase().includes(searchText.toLowerCase())
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
