import React, { useState } from "react";
import { alunoService } from "../../services/alunoService";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [modo, setModo] = useState<"inicio" | "aluno" | "admin">("inicio");
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

  // 🔹 Login do aluno
  const handleSubmitAluno = async (e: React.FormEvent) => {
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

  // 🔹 Login genérico do admin
  const handleSubmitAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (form.email === "admin@admin.com" && form.senha === "12345") {
        alert("Login de Admin realizado com sucesso!");
        window.location.href = "/home";
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
      setLoading(false);
    }, 1000);
  };

  // 🔹 Função para entrar como professor (sem login)

  return (
    <div className="login-container">
      {modo === "inicio" ? (
        <>
          <h1 className="login-title">Escolha uma opção</h1>
          <div className="login-options">
            <button className="login-button" onClick={() => setModo("aluno")}>
              Sou Aluno
            </button>
          <Link to="/alunos">
            <button className="login-button professor-btn">
              Sou Professor
            </button>
          </Link>
            <button className="login-button admin-btn" onClick={() => setModo("admin")}>
              Sou Admin
            </button>
          </div>
        </>
      ) : modo === "aluno" ? (
        <>
          <h1 className="login-title">Login do Aluno</h1>
          <form className="login-form" onSubmit={handleSubmitAluno}>
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
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="login-text">
            Não tem conta?{" "}
            <a href="/aluno/novo" className="login-link">
              Cadastre-se
            </a>
          </p>
          <a className="login-link" onClick={() => setModo("inicio")}>
            Voltar
          </a>
        </>
      ) : (
        // 🔹 Tela de login do Admin
        <>
          <h1 className="login-title">Login do Admin</h1>
          <form className="login-form" onSubmit={handleSubmitAdmin}>
            <input
              type="email"
              name="email"
              placeholder="Email do Admin"
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
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <button className="voltar-button" onClick={() => setModo("inicio")}>
            Voltar
          </button>
        </>
      )}
    </div>
  );
}
