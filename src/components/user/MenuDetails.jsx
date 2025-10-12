import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./details.css";

function MenuDetails() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // ✅ Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`https://backend0fmyhotel.onrender.com/api/getmenu/${id}`)
      .then((res) => {
        setMenu(res.data.menu || res.data);
      })
      .catch((err) => {
        setError("Failed to load menu item");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleOrder = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!user) {
      setError("Please log in to place an order.");
      return;
    }

    try {
      const response = await axios.post("https://backend0fmyhotel.onrender.com/api/order", {
        user_id: user.id, // ✅ automatically from localStorage
        menu_id: id,
        quantity,
      });

      setMessage(response.data.message || "Order placed successfully ✅");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to place order ❌");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  if (!menu) return <p style={{ textAlign: "center" }}>No menu found.</p>;

  return (
    <div className="menu-details">
      <img src={menu.image} alt={menu.title} />
      <div className="menu-content">
        <h2>{menu.title}</h2>
        <p>{menu.description}</p>
        <h3>Price: ${menu.price}</h3>

        <form onSubmit={handleOrder} className="order-form">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />

          <button type="submit">Place Order</button>
        </form>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default MenuDetails;
