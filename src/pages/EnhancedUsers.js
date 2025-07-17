// pages/EnhancedUsers.js
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const EnhancedUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const deleteUser = (username) => {
    const filteredUsers = users.filter(user => user.username !== username);
    saveUsers(filteredUsers);
    message.success('User deleted successfully!');
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalOpen(true);
  };

  const handleUpdate = (values) => {
    const updatedUsers = users.map(user => 
      user.username === editingUser.username ? { ...user, ...values } : user
    );
    saveUsers(updatedUsers);
    setIsModalOpen(false);
    setEditingUser(null);
    message.success('User updated successfully!');
  };

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button onClick={() => openEditModal(record)} style={{ marginRight: '8px' }}>Edit</Button>
          <Button danger onClick={() => deleteUser(record.username)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Enhanced User Management</h2>
      <Table dataSource={users} columns={columns} rowKey="username" pagination={{ pageSize: 5 }} />

      <Modal
        title={`Edit User: ${editingUser?.username}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}> 
            <Select>
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Update User</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default EnhancedUsers;
