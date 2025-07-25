import { Card, Row, Col } from 'antd';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'; // Ensure installed: npm install dayjs

const AdminDashboard = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [serviceDistribution, setServiceDistribution] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    console.log("Loaded bookings:", bookings);

    const monthly = {};
    const revenue = {};
    const categoryCount = {};

    bookings.forEach((b) => {
      const rawDate = b.date || b.bookingDate || new Date().toISOString(); // fallback date
      const month = dayjs(rawDate).format('MMM');
      const category = b.category || b.service || 'Other';
      const amount = parseFloat(b.amount || 0);

      // Bookings per month
      monthly[month] = (monthly[month] || 0) + 1;

      // Revenue per category
      revenue[category] = (revenue[category] || 0) + amount;

      // Count per category
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Sorting months (optional)
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const sortedMonthly = monthOrder
      .filter(m => monthly[m])
      .map(m => ({ month: m, bookings: monthly[m] }));

    setBookingsData(sortedMonthly);
    setRevenueData(Object.entries(revenue).map(([service, revenue]) => ({ service, revenue })));
    setServiceDistribution(Object.entries(categoryCount).map(([name, value]) => ({ name, value })));
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Booking Trends">
            <LineChart width={400} height={250} data={bookingsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Revenue per Service">
            <BarChart width={400} height={250} data={revenueData}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Booking Distribution">
            <PieChart width={400} height={250}>
              <Pie
                data={serviceDistribution}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {serviceDistribution.map((_, index) => (
                  <Cell key={index} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
