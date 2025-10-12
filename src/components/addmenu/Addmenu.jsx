import React, { useState } from 'react'
import "./addmenu.css"
import { useNavigate } from 'react-router-dom';
function Addmenu() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "" 
  })
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {...form, price:Number(form.price)}
    fetch("https://backend0fmyhotel.onrender.com/api/addmenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      alert(data.message)
      setForm({title: "",
      description: "",
      price: "",
      image: "" })
      navigate("/admin");

    }).catch(err => {
      console.log(err);
      alert("Error adding menu")
    })
  }
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
      <button type="submit">Add Menu</button>
    </form>
  );
}

export default Addmenu
