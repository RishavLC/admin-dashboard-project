export const Profile = ({ setIsAuthenticated }) => {
  const username = localStorage.getItem('username');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Profile</h2>
      <p>Welcome, <strong>{username}</strong>! This is your profile page.</p>
      hiii Thisisss
    </div>
  );
};