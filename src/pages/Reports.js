import { Card, DatePicker, Select, Button, Table, message } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock report data
const mockData = [
  { date: '2024-07-15', category: 'Hotel', revenue: 1200 },
  { date: '2024-07-16', category: 'Travel', revenue: 900 },
  { date: '2024-07-17', category: 'Hotel', revenue: 1500 },
  { date: '2024-07-18', category: 'Transport', revenue: 800 },
  { date: '2024-07-19', category: 'Hotel', revenue: 2000 },
  { date: '2024-07-20', category: 'Travel', revenue: 1000 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState([]);
  const [category, setCategory] = useState('All');

  // Filter data
  const filteredData = mockData.filter((item) => {
    const inCategory = category === 'All' || item.category === category;
    const inDateRange =
      !dateRange.length ||
      (dayjs(item.date).isAfter(dayjs(dateRange[0]).subtract(1, 'day')) &&
        dayjs(item.date).isBefore(dayjs(dateRange[1]).add(1, 'day')));
    return inCategory && inDateRange;
  });

  // CSV Export Handler
  const exportCSV = () => {
    let csv = 'Date,Category,Revenue\n';
    filteredData.forEach(row => {
      csv += `${row.date},${row.category},${row.revenue}\n`;
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
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Revenue ($)', dataIndex: 'revenue', key: 'revenue' },
  ];

  return (
    <Card title="Reports Dashboard" style={{ margin: 20 }}>
      {/* Filters */}
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

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#1890ff" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* Table */}
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="date"
      />
    </Card>
  );
};

export default Reports;
