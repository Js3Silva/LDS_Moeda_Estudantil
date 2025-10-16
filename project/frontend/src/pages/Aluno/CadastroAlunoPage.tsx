import React, { useState } from "react";
import "./CadastroAlunoPage.css";
import { Aluno} from "../../types/Aluno";
import { Endereco } from "../../types/Endereco";

export default function CadastroAlunoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    rg: "",
    complemento: "", // ADICIONADO
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endereco: Endereco = {
      logradouro: form.logradouro,
      numero: form.numero,
      bairro: form.bairro,
      cidade: form.cidade,
      estado: form.estado,
      cep: form.cep,
      complemento: form.complemento // AGORA USA O VALOR DO FORM
    };

    const aluno: Aluno = {
      nome: form.nome,
      email: form.email,
      cpf: form.cpf,
      rg: form.rg,
      quantidadeMoeda: 0,
      complemento: form.complemento, // ADICIONADO
      endereco: endereco
    };

    localStorage.setItem("aluno", JSON.stringify(aluno));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "/perfil";
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro de Aluno</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input className="cadastro-input" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} />
        <input className="cadastro-input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input className="cadastro-input" type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} />
        <input className="cadastro-input" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
        <input className="cadastro-input" name="rg" placeholder="RG" value={form.rg} onChange={handleChange} />
        <input className="cadastro-input" name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} /> {/* ADICIONADO */}
        <input className="cadastro-input" name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
        <input className="cadastro-input" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
        <input className="cadastro-input" name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
        <input className="cadastro-input" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
        <input className="cadastro-input" name="estado" placeholder="Estado" value={form.estado} onChange={handleChange} />
        <input className="cadastro-input" name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
        <button type="submit" className="cadastro-button">Cadastrar</button>
      </form>
    </div>
  );
}