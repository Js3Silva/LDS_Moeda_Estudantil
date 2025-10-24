import React, { useState } from "react";
import { alunoService } from "../../services/alunoService";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [modo, setModo] = useState<"aluno" | "professor">("aluno");
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Credenciais fixas do admin
  const adminCredenciais = {
    email: "admin@admin.com",
    senha: "12345",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔹 Primeiro verifica se é admin
      if (
        form.email === adminCredenciais.email &&
        form.senha === adminCredenciais.senha
      ) {
        alert("Login de Admin realizado com sucesso!");
        window.location.href = "/home";
        return;
      }

      // 🔹 Caso contrário, tenta login de aluno
      const response = await alunoService.login(form);
      if (response.id) {
        alert("Login de Aluno realizado com sucesso!");
        window.location.href = "/aluno";
      } else {
        setError("Credenciais inválidas.");
      }
    } catch (error: any) {
      setError(error.response?.data?.erro || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Área de Acesso</h1>

      {/* 🔹 Barra deslizante */}
      <div className="slider-container">
        <span
          className={`slider-option ${modo === "aluno" ? "active" : ""}`}
          onClick={() => setModo("aluno")}
        >
          Aluno
        </span>
        <span
          className={`slider-option ${modo === "professor" ? "active" : ""}`}
          onClick={() => setModo("professor")}
        >
          Professor
        </span>
        <div className={`slider-thumb ${modo}`}></div>
      </div>

      {/* 🔹 Login Aluno/Admin */}
      {modo === "aluno" && (
        <>
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
        </>
      )}

      {/* 🔹 Login Professor */}
      {modo === "professor" && (
        <div className="professor-section">
          <p className="login-text">Acesso rápido para professores:</p>
          <Link to="/alunos">
            <button className="login-button professor-btn">
              Entrar como Professor
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
