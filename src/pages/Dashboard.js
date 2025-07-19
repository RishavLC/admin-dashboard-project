import { Card, Row, Col } from 'antd';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const bookingsData = [
  { month: 'Jan', bookings: 120 },
  { month: 'Feb', bookings: 200 },
  { month: 'Mar', bookings: 180 },
  { month: 'Apr', bookings: 250 },
];

const revenueData = [
  { service: 'Hotel', revenue: 5000 },
  { service: 'Flight', revenue: 7000 },
  { service: 'Tour', revenue: 3000 },
];

const serviceDistribution = [
  { name: 'Hotel', value: 40 },
  { name: 'Flight', value: 35 },
  { name: 'Tour', value: 25 },
];

const Dashboard = () => (
  <div>
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Booking Trends">
          <LineChart width={400} height={250} data={bookingsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
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
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </Card>
      </Col>
    </Row>
    <Row gutter={16} style={{ marginTop: 20 }}>
      <Col span={12}>
        <Card title="Booking Distribution">
          <PieChart width={400} height={250}>
            <Pie data={serviceDistribution} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
              {serviceDistribution.map((_, index) => (
                <Cell key={index} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>
      </Col>
    </Row>
  </div>
);

export default Dashboard;
