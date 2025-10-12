import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";

function User() {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  // Get all menus
  useEffect(() => {
    axios
      .get("https://backend0fmyhotel.onrender.com/api/getmenu")
      .then((res) => {
        setMenu(res.data.menus || res.data); // adjust depending on your backend response
      })
      .catch((err) => {
        console.log("Error fetching menus:", err);
      });
  }, []);

  return (
    <div className="wrapper">
      {menu.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <h4>${item.price}</h4>

          <button onClick={() => navigate(`/menu/${item.id}`)} style={{background:'green'}}>Details</button>
        </div>
      ))}
    </div>
  );
}

export default User;
