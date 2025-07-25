import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, message } from "antd";

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({ username: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const userList = [];
    for (let key in localStorage) {
      if (key.startsWith("user_")) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          userList.push({
            key,
            username: userData.username,
            bookings: userData.bookings || [],
            totalSpent: userData.totalSpent || 0,
          });
        } catch (err) {
          console.warn(`Skipping corrupted user: ${key}`);
        }
      }
    }
    setUsers(userList);
  };

  const showEditModal = (record) => {
    setEditingUser(record);
    setEditedData({ username: record.username });
    setIsModalVisible(true);
  };

  const handleUpdate = () => {
    const oldKey = editingUser.key;
    const newKey = `user_${editedData.username}`;

    const oldData = JSON.parse(localStorage.getItem(oldKey));
    const updatedUser = {
      ...oldData,
      username: editedData.username,
    };

    if (oldKey !== newKey) {
      localStorage.removeItem(oldKey);
    }

    localStorage.setItem(newKey, JSON.stringify(updatedUser));
    message.success("User updated successfully!");

    loadUsers();
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const removeUser = (username) => {
    // Mark as removed
    const removed = JSON.parse(localStorage.getItem("removed_users") || "[]");
    if (!removed.includes(username)) {
      removed.push(username);
      localStorage.setItem("removed_users", JSON.stringify(removed));
    }

    // Delete stored user data
    localStorage.removeItem(`user_${username}`);

    // Optional: Show message and refresh UI
    message.warning(`${username} has been removed by admin.`);
    loadUsers(); // If you have a user list reloader
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Total Bookings",
      dataIndex: "bookings",
      render: (bookings) => bookings?.length || 0,
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              Modal.confirm({
                title: `Are you sure you want to remove ${record.username}?`,
                content: "This action cannot be undone.",
                okText: "Yes, remove",
                okType: "danger",
                cancelText: "Cancel",
                onOk: () => removeUser(record.username),
              });
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Registered Users</h2>
      <Table columns={columns} dataSource={users} pagination={false} />

      <Modal
        title="Edit Username"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          style={{ marginBottom: 10 }}
          value={editedData.username}
          onChange={(e) =>
            setEditedData({ ...editedData, username: e.target.value })
          }
          placeholder="Username"
        />
      </Modal>
    </div>
  );
};

export default User;
