import { Card, Table, DatePicker, Select, Button, message } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reports = () => {
  // ✅ Always define first
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const [dateRange, setDateRange] = useState([]);
  const [category, setCategory] = useState('All');

  const filteredData = bookings.filter(item => {
    const inCategory = category === 'All' || item.category === category;
    const inDateRange =
      !dateRange.length ||
      (dayjs(item.date).isAfter(dayjs(dateRange[0]).subtract(1, 'day')) &&
        dayjs(item.date).isBefore(dayjs(dateRange[1]).add(1, 'day')));
    return inCategory && inDateRange;
  });

  const exportCSV = () => {
    let csv = 'Date,User,Hotel,Category,Amount\n';
    filteredData.forEach(row => {
      csv += `${row.date},${row.username},${row.hotel},${row.category},${row.amount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    message.success('Report exported as CSV!');
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'User', dataIndex: 'username', key: 'username' },
    { title: 'Hotel', dataIndex: 'hotel', key: 'hotel' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Amount ($)', dataIndex: 'amount', key: 'amount' },
  ];

  return (
    <Card title="Reports Dashboard" style={{ margin: 20 }}>
      <div style={{ marginBottom: 20, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Select defaultValue="All" onChange={(value) => setCategory(value)} style={{ width: 200 }}>
          <Option value="All">All Categories</Option>
          <Option value="Hotel">Hotel</Option>
          <Option value="Travel">Travel</Option>
          <Option value="Transport">Transport</Option>
        </Select>
        <Button type="primary" onClick={exportCSV}>Export CSV</Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#1890ff" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.date + record.username + record.hotel}
      />
    </Card>
  );
};

export default Reports;
