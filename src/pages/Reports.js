import { Card, DatePicker, Select, Button, Table, message } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const bookings = [
  { date: '2025-07-15', category: 'Deluxe Room', revenue: 180 },
  { date: '2025-07-16', category: 'Suite', revenue: 250 },
  { date: '2025-07-17', category: 'Conference Hall', revenue: 500 },
  { date: '2025-07-18', category: 'Deluxe Room', revenue: 190 },
  { date: '2025-07-19', category: 'Suite', revenue: 260 },
  { date: '2025-07-20', category: 'Conference Hall', revenue: 550 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState([]);
  const [category, setCategory] = useState('All');

  const filtered = bookings.filter((item) => {
    const inCategory = category === 'All' || item.category === category;
    const inDateRange =
      !dateRange.length ||
      (dayjs(item.date).isAfter(dayjs(dateRange[0]).subtract(1, 'day')) &&
        dayjs(item.date).isBefore(dayjs(dateRange[1]).add(1, 'day')));
    return inCategory && inDateRange;
  });

  const exportCSV = () => {
    let csv = 'Date,Category,Revenue\n';
    filtered.forEach(row => {
      csv += `${row.date},${row.category},${row.revenue}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'booking_report.csv';
    link.click();
    URL.revokeObjectURL(link.href);
    message.success('Exported report as CSV');
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Revenue ($)', dataIndex: 'revenue', key: 'revenue' }
  ];

  return (
    <Card title="Booking Reports" style={{ margin: 20 }}>
      <div style={{ marginBottom: 20, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Select defaultValue="All" onChange={(value) => setCategory(value)} style={{ width: 200 }}>
          <Option value="All">All Categories</Option>
          <Option value="Deluxe Room">Deluxe Room</Option>
          <Option value="Suite">Suite</Option>
          <Option value="Conference Hall">Conference Hall</Option>
        </Select>
        <Button type="primary" onClick={exportCSV}>Export CSV</Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={filtered}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#1890ff" />
        </LineChart>
      </ResponsiveContainer>

      <Table style={{ marginTop: 20 }} columns={columns} dataSource={filtered} pagination={{ pageSize: 5 }} rowKey="date" />
    </Card>
  );
};

export default Reports;
