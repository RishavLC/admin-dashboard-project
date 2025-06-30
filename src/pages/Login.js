import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const Login = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'admin123') {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 300 }}>
        <Title level={3} style={{ textAlign: 'center' }}>Admin Login</Title>
        <Form onFinish={handleLogin} layout="vertical">
          <Form.Item name="username" label="Username" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;