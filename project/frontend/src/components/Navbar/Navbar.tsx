import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🎓 StudentCoins
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Início</Link></li>
        <li><Link to="/alunos">Alunos</Link></li>
        <li><Link to="/empresas">Empresas</Link></li>
        <li><Link to="/recompensas">Recompensas</Link></li>
      </ul>
    </nav>
  );
}
