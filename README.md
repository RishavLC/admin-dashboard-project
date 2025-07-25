# 🏨 Booking System App

A complete **role-based booking system** built with **React**, supporting both **Admin** and **User** functionality — with support for **configuration**, **audit logs**, **user management**, and **local persistence using localStorage**.

---

## 🚀 Features

### 👤 User
- Register/Login functionality
- Book hotels or items
- View system configuration
- View personal profile

### 🛠️ Admin
- View and manage registered users
- Remove (soft delete) users
- Configure global system settings
- View detailed audit logs of user actions

---

## 🔐 Authentication & Role Management

- Uses `localStorage` to store:
  - `auth` → whether the user is logged in
  - `username`, `role` → who is logged in
- Routing is protected and role-based:
  - Admin has access to `/admin-dashboard`
  - User has access to `/user-dashboard`

---

## 🧩 Configuration Management

Admin can set up global configuration values through a form:
- Company Name
- Max Bookings Per Day
- Enable/Disable Notifications
- Booking Window (days)
- Theme (Light, Dark, Corporate Blue)
- Payment Settings (Gateway selection)

Stored as JSON in `localStorage` under `booking_config`.

Users can **view** (but not edit) these settings via the User Dashboard.

---

## 📝 Audit Log

- Tracks all major actions (booking, login, logout, deletions).
- Admin can view logs in a table format.
- Stored in `localStorage` as `audit_logs`.

---

## 💾 Data Storage (LocalStorage)
---------------------------------------------------------
| Key                        | Description              |
|----------------------------|--------------------------|
| `user_<username>`          | Stores user info         |
| `removed_users`            | List of removed users    |
| `audit_logs`               | User action history      |
| `booking_config`           | Admin system settings    |
| `user_bookings_<username>` | User booking history     |
| `auth`, `username`, `role` | Logged-in session info   |

---------------------------------------------------------

## 🧱 Built With

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Ant Design](https://ant.design/)
- [@rjsf/core](https://github.com/rjsf-team/react-jsonschema-form) — For dynamic forms
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 📂 Project Structure


----------------------------------------------------------------------

## 🛣️ Routes

| Path                          | Access | Description              |
|------                         |--------|-------------             |
| `/`                           | Public | Login Page               |
| `/register`                   | Public | Register Page            |
| `/admin-dashboard`            | Admin  | Admin Panel              |
| `/admin-dashboard/config`     | Admin  | Configuration Settings   |
| `/admin-dashboard/logs`       | Admin  | Audit Log                |
| `/user-dashboard`             | User   | User Panel               |
| `/user-dashboard/profile`     | User   | View Profile             |
| `/user-dashboard/view-config` | User   | View System Configuration|

-----------------------------------------------------------------------

## 🔮 Future Improvements

- Add Firebase or MongoDB backend
- Email-based registration/login
- File/image uploads for bookings
- Booking calendar or charts
- PDF or Excel export of logs

---

## 📷 Screenshots

> You can include images here by uploading to the `assets/` folder or embedding live screenshots of your running app.

---


## ✅ Requirements

To run this Booking System project smoothly, make sure you have the following installed on your system:

### 🛠️ System Requirements

- **Node.js** (v16 or higher recommended)  
  👉 [Download Node.js](https://nodejs.org)

- **npm** (Node Package Manager - comes with Node.js)  
  👉 Used to install packages and run the project

- **Code Editor** (e.g., VS Code)  
  👉 [Download VS Code](https://code.visualstudio.com/)

- **Modern Browser** (e.g., Chrome, Edge)  
  👉 Required to view and test the frontend

- **Packages**
  👉 npm install antd react-router-dom @rjsf/core @rjsf/validator-ajv8 @ant-design/icons


## 🧑‍💻 Author

**Rishav Shrestha**

Feel free to fork, contribute, and modify. ❤️

---

## 📄 License

This project is open-source and free to use.

