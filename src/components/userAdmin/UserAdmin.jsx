import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";

function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // for overlay confirmation
  const navigate = useNavigate();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://backend0fmyhotel.onrender.com/api/getuser");
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://backend0fmyhotel.onrender.com/api/deleteuser/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data.msg);
      setDeleteId(null); // close overlay
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Delete</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <button onClick={() => navigate(`/edituser/${u.id}`)}>
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => setDeleteId(u.id)}>Delete</button>
              </td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete confirmation overlay */}
      {deleteId && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={() => handleDelete(deleteId)}>Yes</button>
            <button onClick={() => setDeleteId(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default  UserAdmin;
;
