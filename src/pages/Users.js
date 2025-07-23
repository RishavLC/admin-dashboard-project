import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  List,
  Popconfirm
} from 'antd';

// Mock Activity Logs
const getActivityLogs = (username) => [
  `Logged in on ${new Date().toLocaleDateString()}`,
  `Updated profile`,
  `Logged out`
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [logModalUser, setLogModalUser] = useState(null);
  const [editPasswordUser, setEditPasswordUser] = useState(null);
  const [passwordForm] = Form.useForm();

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
    Modal.confirm({
      title: 'Confirm Bulk Deletion',
      content: `Are you sure you want to delete selected users?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        selectedRowKeys.forEach(username => localStorage.removeItem(`user_${username}`));
        setUsers(prev => prev.filter(user => !selectedRowKeys.includes(user.username)));
        setSelectedRowKeys([]);
        message.success('Selected users deleted!');
      }
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [users, searchText]);

  const openActivityModal = (username) => {
    setLogModalUser(username);
    setActivityLogs(getActivityLogs(username));
  };

  const openEditPasswordModal = (user) => {
    setEditPasswordUser(user);
    passwordForm.setFieldsValue({ newPassword: '' });
  };

  const handlePasswordUpdate = () => {
    passwordForm.validateFields().then(values => {
      localStorage.setItem(`user_${editPasswordUser.username}`, values.newPassword);
      message.success(`Password updated for ${editPasswordUser.username}`);
      setEditPasswordUser(null);
      loadUsers();
    });
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username)
    },
    {
      title: 'Password',
      dataIndex: 'password',
      render: () => '••••••••' // Hide actual password
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openEditPasswordModal(record)}>Edit Password</Button>
          <Button onClick={() => openActivityModal(record.username)}>Logs</Button>
          <Popconfirm
            title={`Delete user "${record.username}"?`}
            onConfirm={() => deleteUser(record.username)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Management</h2>

      <Input
        placeholder="Search username"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />

      <Button
        danger
        onClick={bulkDelete}
        disabled={!selectedRowKeys.length}
        style={{ marginLeft: 16 }}
      >
        Delete Selected
      </Button>

      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="username"
        pagination={{ pageSize: 5 }}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys
        }}
      />

      {/* Activity Logs Modal */}
      <Modal
        open={!!logModalUser}
        onCancel={() => setLogModalUser(null)}
        footer={null}
        title={`Activity Logs - ${logModalUser}`}
      >
        <List
          dataSource={activityLogs}
          renderItem={(log, index) => <List.Item key={index}>{log}</List.Item>}
        />
      </Modal>

      {/* Edit Password Modal */}
      <Modal
        open={!!editPasswordUser}
        onCancel={() => setEditPasswordUser(null)}
        onOk={handlePasswordUpdate}
        title={`Update Password - ${editPasswordUser?.username}`}
        okText="Update Password"
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter a new password' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
