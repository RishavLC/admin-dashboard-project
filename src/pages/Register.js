import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Card } from 'antd';

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = ({ username, password }) => {
    username = username.trim(); // Remove leading/trailing spaces

    if (!username || !password) {
      alert('Username and password are required');
      return;
    }

    if (localStorage.getItem(`user_${username}`)) {
      alert('User already exists');
    } else {
      localStorage.setItem(`user_${username}`, password);
      alert('Registration successful! Please login.');
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 320 }}>
        <Title level={3} style={{ textAlign: 'center' }}>User Register</Title>
        <Form
          onFinish={handleRegister}
          layout="vertical"
          validateTrigger={['onChange', 'onBlur']}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username is required' }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Password is required' },
              { min: 4, message: 'Password must be at least 4 characters' },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
            <Button type="link" block onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
