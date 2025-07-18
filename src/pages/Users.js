import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Space, List } from 'antd';

// Mock Activity Logs (you can connect this to your real data later)
const getActivityLogs = (username) => [
  `Logged in on ${new Date().toLocaleDateString()}`,
  `Updated profile`,
  `Logged out`,
  `Password changed`
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const storedUsers = Object.keys(localStorage)
      .filter(key => key.startsWith('user_'))
      .map(key => ({
        username: key.replace('user_', ''),
        password: localStorage.getItem(key)
      }));
    setUsers(storedUsers);
  };

  const deleteUser = (username) => {
    localStorage.removeItem(`user_${username}`);
    setUsers(prev => prev.filter(user => user.username !== username));
    message.success(`User ${username} deleted!`);
  };

  const bulkDelete = () => {
    selectedRowKeys.forEach(username => localStorage.removeItem(`user_${username}`));
    setUsers(prev => prev.filter(user => !selectedRowKeys.includes(user.username)));
    setSelectedRowKeys([]);
    message.success('Selected users deleted!');
  };

  const onFinishEdit = ({ password }) => {
    localStorage.setItem(`user_${editingUser.username}`, password);
    setUsers(prev => prev.map(user => user.username === editingUser.username ? { ...user, password } : user));
    setEditingUser(null);
    message.success('User updated!');
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()));
  }, [users, searchText]);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: 'Password',
      dataIndex: 'password',
      render: (text, record) => (
        <Form
          onFinish={(values) => onFinishEdit({ ...values, username: record.username })}
          initialValues={{ password: text }}
          layout="inline"
        >
          <Form.Item name="password" style={{ marginBottom: 0 }}>
            <Input.Password style={{ width: 120 }} />
          </Form.Item>
          <Button htmlType="submit" type="link">Update</Button>
        </Form>
      ),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openActivityModal(record.username)}>Logs</Button>
          <Button danger onClick={() => deleteUser(record.username)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const openActivityModal = (username) => {
    setEditingUser({ username });
    setActivityLogs(getActivityLogs(username));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Management</h2>

      <Input
        placeholder="Search username"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Button danger onClick={bulkDelete} disabled={!selectedRowKeys.length} style={{ marginLeft: 16 }}>
        Delete Selected
      </Button>

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="username"
        pagination={{ pageSize: 5 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
      />

      <Modal
        open={!!editingUser?.username && activityLogs.length > 0}
        onCancel={() => setEditingUser(null)}
        footer={null}
        title={`Activity Logs - ${editingUser?.username}`}
      >
        <List
          dataSource={activityLogs}
          renderItem={(log, index) => <List.Item key={index}>{log}</List.Item>}
        />
      </Modal>
    </div>
  );
};

export default Users;
