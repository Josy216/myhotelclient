import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Only render children if token exists
  if (!token) return null;

  return <>{children}</>; // <-- correctly renders children components
}

export default Protected;
