import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          JocodeHotel
        </Link>

        <nav className="desktop-nav">
          <Link to="/admin">Admin</Link>
          <Link to="/addmenu">Add Menu</Link>
          <Link to="/users">Users</Link>
          <Link to="/orders">Order</Link>
        </nav>

        <div className="user-section">
          {user ? (
            <div className="user-info">
              <span>{user.name}</span>
              <img
                src={user.image}
                alt={user.name}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/40x40/007bff/ffffff?text=U")
                }
              />
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          )}
        </div>

        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <nav>
          <Link to="/admin" onClick={closeMobileMenu}>
            Admin
          </Link>
          <Link to="/addmenu" onClick={closeMobileMenu}>
            Add Menu
          </Link>
          <Link to="/users" onClick={closeMobileMenu}>
            Users
          </Link>
        </nav>
        <div className="mobile-auth">
          {user ? (
            <>
              <div className="user-details">
                <img
                  src={user.image}
                  alt={user.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/50x50/007bff/ffffff?text=U")
                  }
                />
                <span>{user.name}</span>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={closeMobileMenu}>
              <button>Sign In</button>
            </Link>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
}

export default Header;
