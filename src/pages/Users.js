import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Example: collect users from localStorage
    const storedUsers = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => ({
        username: key.replace('user_', ''),
        password: localStorage.getItem(key)
      }));
    setUsers(storedUsers);
  }, []);

  const deleteUser = (username) => {
    localStorage.removeItem(`user_${username}`);
    setUsers(prev => prev.filter(user => user.username !== username));
    message.success('User deleted!');
  };

  const onFinishEdit = ({ password }) => {
    localStorage.setItem(`user_${editingUser.username}`, password);
    setUsers(prev => prev.map(user => user.username === editingUser.username ? { ...user, password } : user));
    setEditingUser(null);
    message.success('User updated!');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Management</h2>
      <Table
        dataSource={users}
        columns={[
          { title: 'Username', dataIndex: 'username', key: 'username' },
          {
            title: 'Action',
            render: (_, record) => (
              <>
                <Button onClick={() => setEditingUser(record)} style={{ marginRight: '8px' }}>Edit</Button>
                <Button danger onClick={() => deleteUser(record.username)}>Delete</Button>
              </>
            )
          }
        ]}
        rowKey="username"
      />

      <Modal
        title={`Edit User: ${editingUser?.username}`}
        open={!!editingUser}
        onCancel={() => setEditingUser(null)}
        footer={null}
      >
        <Form onFinish={onFinishEdit} initialValues={{ password: editingUser?.password }}>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
