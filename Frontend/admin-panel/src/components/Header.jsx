import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Si usas Firebase Auth, aquí puedes cerrar sesión:
    // import { signOut } from "firebase/auth";
    // signOut(auth);

    // Redirige al inicio (login o landing page)
    navigate("/");
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Sports.com</h1>
        <p>Main Administrator</p>
      </div>
      <div className="header-right">
        <button onClick={handleLogout}>Log out</button>
      </div>
    </header>
  );
}

export default Header;
