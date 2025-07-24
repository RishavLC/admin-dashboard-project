import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Modal, message } from 'antd';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({ username: '', password: '' });

  useEffect(() => {
    const userList = [];
    for (let key in localStorage) {
      if (key.startsWith('user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          userList.push({
            key,
            username: userData.username,
            password: userData.password,
            bookings: userData.bookings || [],
            totalSpent: userData.totalSpent || 0
          });
        } catch (err) {
          console.warn(`Skipping corrupted user: ${key}`);
        }
      }
    }
    setUsers(userList);
  }, []);

  const showEditModal = (record) => {
    setEditingUser(record);
    setEditedData({ username: record.username, password: record.password });
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    const oldKey = editingUser.key;
    const newKey = `user_${editedData.username}`;

    const updatedUser = {
      username: editedData.username,
      password: editedData.password,
      bookings: editingUser.bookings,
      totalSpent: editingUser.totalSpent
    };

    // Delete old key if username changed
    if (oldKey !== newKey) {
      localStorage.removeItem(oldKey);
    }

    // Save updated data
    localStorage.setItem(newKey, JSON.stringify(updatedUser));
    message.success('User updated successfully!');

    // Refresh table
    const updatedUsers = users.map((user) =>
      user.key === oldKey
        ? { ...user, ...updatedUser, key: newKey }
        : user
    );
    setUsers(updatedUsers);

    setIsModalVisible(false);
    setEditingUser(null);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Total Bookings',
      dataIndex: 'bookings',
      render: (bookings) => bookings?.length || 0
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent'
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Button type="link" onClick={() => showEditModal(record)}>
          Edit
        </Button>
      )
    }
  ];

  return (
    <div>
      <h2>Registered Users</h2>
      <Table columns={columns} dataSource={users} pagination={false} />

      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          style={{ marginBottom: 10 }}
          value={editedData.username}
          onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
          placeholder="Username"
        />
        <Input
          value={editedData.password}
          onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
          placeholder="Password"
        />
      </Modal>
    </div>
  );
};

export default User;
