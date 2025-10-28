import React, { useState } from "react";
import { alunoService } from "../../services/alunoService";
import { empresaService } from "../../services/empresaService";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [modo, setModo] = useState<"aluno" | "empresa">("aluno");
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Credenciais fixas do admin
  const adminCredenciais = { email: "admin@admin.com", senha: "12345" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Login Admin
      if (form.email === adminCredenciais.email && form.senha === adminCredenciais.senha) {
        alert("Login de Admin realizado com sucesso!");
        window.location.href = "/home";
        return;
      }

      // Login Aluno
      if (modo === "aluno") {
        const response = await alunoService.login(form);
        if (response.id) {
          alert("Login de Aluno realizado com sucesso!");
          window.location.href = "/aluno";
        } else {
          setError("Credenciais de aluno inválidas.");
        }
      }

      // Login Empresa
      if (modo === "empresa") {
        const response = await empresaService.login(form);
        if (response.id) {
          alert("Login de Empresa realizado com sucesso!");
          window.location.href = "/home"; 
        } else {
          setError("Credenciais de empresa inválidas.");
        }
      }

    } catch (error: any) {
      setError(error.response?.data?.erro || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-28 mb-12 p-10 rounded-xl shadow-[0_8px_25px_rgba(44,90,160,0.15)] relative overflow-hidden bg-gradient-to-br from-white to-[#f8fafe] border border-[#e8f0fe] font-[Segoe_UI]">

      {/* Barrinha de topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2c5aa0] to-[#4caf50]"></div>

      <h1 className="text-center text-2xl font-semibold text-[#2c5aa0] mb-8">Área de Acesso</h1>

      {/* Slider */}
      <div className="relative flex justify-between bg-[#e8f0fe] rounded-full w-[220px] mx-auto h-[45px] items-center px-1 mb-8 cursor-pointer">
        <span
          className={`flex-1 text-center z-10 text-[#2c5aa0] font-semibold text-sm transition-colors ${
            modo === "aluno" ? "text-[#ffffff]" : ""
          }`}
          onClick={() => setModo("aluno")}
        >
          Aluno
        </span>
        <span
          className={`flex-1 text-center z-10 text-[#2c5aa0] font-semibold text-sm transition-colors ${
            modo === "empresa" ? "text-[#ffffff]" : ""
          }`}
          onClick={() => setModo("empresa")}
        >
          Empresa
        </span>
        <div
          className={`absolute top-1 bottom-1 w-[48%] bg-gradient-to-br from-[#2c5aa0] to-[#3a6bc0] rounded-full transition-transform ${
            modo === "empresa" ? "translate-x-full" : ""
          }`}
        ></div>
      </div>

      {/* Formulário de login */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border-2 border-[#e0e7ff] bg-[#f8fafe] focus:outline-none focus:border-[#2c5aa0] focus:bg-white focus:ring-4 focus:ring-[#2c5aa01a]"
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          required
          className="p-3 rounded-lg border-2 border-[#e0e7ff] bg-[#f8fafe] focus:outline-none focus:border-[#2c5aa0] focus:bg-white focus:ring-4 focus:ring-[#2c5aa01a]"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="p-3 bg-gradient-to-br from-[#2c5aa0] to-[#3a6bc0] text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      {/* Links de cadastro */}
      {modo === "aluno" && (
        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{" "}
          <Link to="/aluno/novo" className="font-semibold text-[#2c5aa0] hover:text-[#4caf50] underline">
            Cadastre-se
          </Link>
        </p>
      )}

      {modo === "empresa" && (
        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{" "}
          <Link to="/empresa/novo" className="font-semibold text-[#2c5aa0] hover:text-[#4caf50] underline">
            Cadastre-se
          </Link>
        </p>
      )}
    </div>
  );
}
