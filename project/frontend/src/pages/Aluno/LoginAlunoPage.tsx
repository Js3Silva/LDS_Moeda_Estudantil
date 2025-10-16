import React from "react";
import "./LoginAlunoPage.css";

export default function LoginAlunoPage() {
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input type="email" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Senha" className="login-input" />
        <button type="submit" className="login-button">Entrar</button>
      </form>
      <p className="login-text">
        Não tem conta? <a href="/cadastro" className="login-link">Cadastre-se</a>
      </p>
    </div>
  );
}
