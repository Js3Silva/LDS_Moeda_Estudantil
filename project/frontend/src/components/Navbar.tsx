import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#004b9b] to-[#0077ff] flex items-center justify-between px-8 py-3 text-white sticky top-0 z-10 shadow-md">
      {/* Logo */}
      <div className="font-semibold text-xl tracking-wide cursor-pointer">
        🎓 Stuwards
      </div>

      {/* Botão de menu (mobile) */}
      <button
        className="md:hidden text-3xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      {/* Links */}
      <ul
        className={`flex flex-col md:flex-row md:items-center md:static absolute md:bg-transparent bg-[#0057c2] md:w-auto w-full right-0 top-[60px] transition-all duration-300 ease-in-out overflow-hidden 
        ${menuOpen ? "max-h-56 py-4" : "max-h-0 md:max-h-none"}`}
      >
        <li className="md:ml-8 text-center my-2 md:my-0">
          <Link
            to="/"
            className="text-[#e8f0ff] font-medium hover:text-white hover:border-b-2 border-white pb-1 transition-all"
          >
            Início
          </Link>
        </li>
        <li className="md:ml-8 text-center my-2 md:my-0">
          <Link
            to="/alunos"
            className="text-[#e8f0ff] font-medium hover:text-white hover:border-b-2 border-white pb-1 transition-all"
          >
            Alunos
          </Link>
        </li>
        <li className="md:ml-8 text-center my-2 md:my-0">
          <Link
            to="/empresas"
            className="text-[#e8f0ff] font-medium hover:text-white hover:border-b-2 border-white pb-1 transition-all"
          >
            Empresas
          </Link>
        </li>
        <li className="md:ml-8 text-center my-2 md:my-0">
          <Link
            to="/recompensas"
            className="text-[#e8f0ff] font-medium hover:text-white hover:border-b-2 border-white pb-1 transition-all"
          >
            Recompensas
          </Link>
        </li>
      </ul>
    </nav>
  );
}
