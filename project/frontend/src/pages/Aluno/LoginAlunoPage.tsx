import React, { useState } from "react";
import { alunoService } from "../../services/alunoService";
import "./LoginAlunoPage.css";

export default function LoginAlunoPage() {
  const [modo, setModo] = useState<"inicio" | "aluno">("inicio");
  const [form, setForm] = useState({
    email: "",
    senha: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await alunoService.login(form);

      if (response.id) {
        alert("Login realizado com sucesso!");
        window.location.href = "/aluno";
      }
    } catch (error: any) {
      setError(error.response?.data?.erro || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Função para entrar como professor
  const entrarComoProfessor = () => {
    window.location.href = "/alunos";
  };

  return (
    <div className="login-container">
      {modo === "inicio" ? (
        <>
          <h1 className="login-title">Escolha uma opção</h1>
          <div className="login-options">
            <button
              className="login-button"
              onClick={() => setModo("aluno")}
            >
              Sou Aluno
            </button>
            <button
              className="login-button professor-btn"
              onClick={entrarComoProfessor}
            >
              Sou Professor
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="login-title">Login do Aluno</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="login-input"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              className="login-input"
              value={form.senha}
              onChange={handleChange}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="login-text">
            Não tem conta?{" "}
            <a href="/aluno/novo" className="login-link">
              Cadastre-se
            </a>
          </p>
          <button
            className="voltar-button"
            onClick={() => setModo("inicio")}
          >
            Voltar
          </button>
        </>
      )}
    </div>
  );
}
