import React, { useState, useEffect } from "react";

export function Profile() {
  const username = localStorage.getItem("username") || "User";
  const [newPassword, setNewPassword] = useState("");
  const [bookingHistory, setBookingHistory] = useState([]);

useEffect(() => {
  const storedBooking = localStorage.getItem("bookings"); // ✅ Correct key
  if (storedBooking) {
    const allBookings = JSON.parse(storedBooking);
    const userBookings = allBookings.filter(
      (b) => b.username === username
    );
    setBookingHistory(userBookings); // Only show current user's bookings
  }
}, []);


  const handlePasswordUpdate = () => {
    if (newPassword.trim() === "") {
      alert("Password cannot be empty!");
      return;
    }
    // Simulate password update
    localStorage.setItem("password", newPassword);
    alert("Password updated successfully!");
    setNewPassword(""); // clear input field
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {username}!</h2>

      <div style={{ marginTop: "2rem" }}>
        <h3>Profile: {username}</h3>
        <label>
          <strong>* Update Password</strong>
        </label>
        <br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          style={{ width: "300px", padding: "8px", marginTop: "8px" }}
        />
        <br />
        <button
          onClick={handlePasswordUpdate}
          style={{ marginTop: "10px", padding: "8px 16px" }}
        >
          Update Password
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Booking History</h3>
        {bookingHistory.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
 <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
  <thead>
    <tr>
      <th>Date</th>
      <th>Hotel</th>
      <th>Amount ($)</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    {bookingHistory.map((b, index) => (
      <tr key={index}>
        <td>{b.date}</td>
        <td>{b.hotel}</td>
        <td>{b.amount}</td>
        <td>{b.category}</td>
      </tr>
    ))}
  </tbody>
</table>

        )}
      </div>
    </div>
  );
}
