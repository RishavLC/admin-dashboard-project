import { Card, Row, Col } from 'antd';
import { UserOutlined, LineChartOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';

const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>Dashboard Overview</h2>
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ background: '#e6f7ff' }} hoverable title="Users" extra={<UserOutlined style={{ fontSize: '24px' }} />}>
          Manage all users and accounts.
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ background: '#f9f0ff' }} hoverable title="Analytics" extra={<LineChartOutlined style={{ fontSize: '24px' }} />}>
          View reports and user activities.
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ background: '#fffbe6' }} hoverable title="Configuration" extra={<SettingOutlined style={{ fontSize: '24px' }} />}>
          Change system settings.
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ background: '#fff1f0' }} hoverable title="Reports" extra={<FileTextOutlined style={{ fontSize: '24px' }} />}>
          Generate and export reports.
        </Card>
      </Col>
    </Row>
  </div>
);

export default Dashboard;
