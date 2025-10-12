import React, { useEffect, useState } from "react";
import axios from "axios";
import "./order.css"; // optional styling

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://backend0fmyhotel.onrender.com/api/order")
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
      })
      .finally(() => setLoading(false));
  }, []);

  // 🕒 Helper: format timestamp as "2 hours ago", "Yesterday", etc.
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays === 1) return "yesterday";
    return `${diffDays} days ago`;
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading orders...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="orders-container">
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Phone</th>
              <th>Menu Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Ordered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.user_name}</td>
                <td>{o.user_phone}</td>
                <td>{o.menu_title}</td>
                <td>${Number(o.menu_price).toFixed(2)}</td>
                <td>{o.quantity}</td>
                <td>${Number(o.total_price).toFixed(2)}</td>
                <td>{timeAgo(o.order_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
