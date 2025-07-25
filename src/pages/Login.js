import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Card, Select } from "antd";
import logAction from "../utils/logAction"; // adjust path if needed
const { Title } = Typography;
const { Option } = Select;

const Login = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = ({ username, password, role }) => {
    const removedUsers = JSON.parse(
      localStorage.getItem("removed_users") || "[]"
    );
    if (removedUsers.includes(username)) {
      alert("Admin removed you.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const userData = localStorage.getItem(`user_${username}`);
      const isAdmin =
        role === "admin" && username === "admin" && password === "admin123";

      let isUser = false;

      if (role === "user" && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          isUser = parsedUser.password === password;
        } catch (err) {
          console.error("Invalid user data in localStorage");
        }
      }

      if (isAdmin || isUser) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        setIsAuthenticated(true);

        // ✅ log action after successful login
        logAction(username, "Logged In");

        navigate(role === "admin" ? "/admin-dashboard" : "/user-dashboard");
      } else {
        alert("Invalid credentials");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 320 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form
          onFinish={handleLogin}
          layout="vertical"
          validateTrigger={["onChange", "onBlur"]}
        >
          <Form.Item
            name="role"
            label="Login As"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
            <Button type="link" block onClick={() => navigate("/register")}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
