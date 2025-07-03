import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome, User</h2>
      <Button onClick={() => navigate('/contact')}>Go to Contact</Button>
      <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
    </div>
  );
};

export default UserDashboard;
