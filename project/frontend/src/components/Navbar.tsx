import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [userType, setUserType] = useState<string | null>(null);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSaldo = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setSaldo(0);
        return;
      }

      const response = await fetch("http://localhost:8080/api/saldo", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        console.error("Erro ao buscar saldo: status", response.status);
        setSaldo(0);
        return;
      }

      const data = (await response.json()) as { saldo?: number };
      setSaldo(typeof data.saldo === "number" ? data.saldo : 0);
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);
      setSaldo(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const tipo = localStorage.getItem("userType"); // 'professor', 'aluno', 'admin', 'empresa'
    setUserType(tipo);

    if (tipo === "aluno" || tipo === "professor" || tipo === "admin") {
      fetchSaldo();
    }
  }, [fetchSaldo]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/home" className="text-2xl font-bold hover:text-yellow-300 transition">
        Stuwards
      </Link>

      {/* Menu */}
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/home" className="hover:text-yellow-300 transition">
            Início
          </Link>
        </li>

        {/* Professor */}
        {userType === "professor" && (
          <>
            <li>
              <Link to="/alunos" className="hover:text-yellow-300 transition">
                Alunos
              </Link>
            </li>
            <li>
              <Link to="/extrato" className="hover:text-yellow-300 transition">
                {loading ? "Saldo: ..." : `Saldo: ${saldo ?? 0} moedas`}
              </Link>
            </li>
          </>
        )}

        {/* Aluno */}
        {userType === "aluno" && (
          <li>
            <Link to="/extrato" className="hover:text-yellow-300 transition">
              {loading ? "Saldo: ..." : `Saldo: ${saldo ?? 0} moedas`}
            </Link>
          </li>
        )}

        {/* Admin */}
        {userType === "admin" && (
          <>
            <li>
              <Link to="/alunos" className="hover:text-yellow-300 transition">
                Alunos
              </Link>
            </li>
            <li>
              <Link to="/empresas" className="hover:text-yellow-300 transition">
                Empresas
              </Link>
            </li>
            <li>
              <Link to="/professores" className="hover:text-yellow-300 transition">
                Professores
              </Link>
            </li>
          </>
        )}

        {/* Empresa */}
        {userType === "empresa" && (
          <li>
            <Link to="/cadastro-beneficios" className="hover:text-yellow-300 transition">
              Cadastro de Benefícios
            </Link>
          </li>
        )}
        {/* Logout */}
        {userType && (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 p-2 rounded hover:bg-blue-700 transition"
              title="Logout"
            >
              <span className="material-symbols-outlined">
                logout
              </span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
