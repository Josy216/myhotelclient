import axios from "axios";
import { useState, useEffect } from "react";
import "./adminmenu.css";
import { useNavigate } from "react-router-dom";

function Adminmenu() {
  const [menu, setMenu] = useState([]);
  const [deletingId, setDeletingId] = useState(null); // track which item is being deleted
  const navigate = useNavigate();

  // Fetch all menus on mount
  useEffect(() => {
    axios
      .get(`https://backend0fmyhotel.onrender.com/api/getmenu`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load menus");
      });
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await axios.delete(
        `https://backend0fmyhotel.onrender.com/api/deletemenu/${id}`
      );
      alert(res.data.message);

      // Update UI without reload
      setMenu((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete menu item");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="wrapper">
      {menu.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <h4>${item.price}</h4>

          <div className="admin-btn">
            <button onClick={() => navigate("/addmenu")}>Add</button>
            <button onClick={() => navigate(`/editmenu/${item.id}`)}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={deletingId === item.id}
            >
              {deletingId === item.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Adminmenu;
