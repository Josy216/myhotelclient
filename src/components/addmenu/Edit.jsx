import React, { useEffect, useState } from "react";
import "./addmenu.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`https://backend0fmyhotel.onrender.com/api/getmenu/${id}`)
      .then((res) => {
        setForm(res.data); // since backend returns one object, not an array
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load menu item");
      });
  }, [id]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price) };
    fetch(`https://backend0fmyhotel.onrender.com/api/editmenu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        alert("Error editing menu");
      });
  };

  return (
    <form className="addmenu" onSubmit={handleSubmit}>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Enter title"
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Enter description"
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
        placeholder="Enter price"
      />
      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        required
        placeholder="Enter Image url"
      />
      <button type="submit">Edit Menu</button>
    </form>
  );
}

export default Edit;
