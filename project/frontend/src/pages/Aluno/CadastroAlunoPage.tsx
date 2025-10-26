import React, { useState, useEffect } from "react";
import "./CadastroAlunoPage.css";
import { AlunoCreate } from "../../types/Aluno";
import { Endereco } from "../../types/Endereco";
import { alunoService } from "../../services/alunoService";

interface Estado {
  sigla: string;
  nome: string;
}

interface Cidade {
  nome: string;
}

export default function CadastroAlunoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    rg: "",
    complemento: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: ""
  });

  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  // Carregar estados
  useEffect(() => {
    const carregarEstados = async () => {
      setLoadingEstados(true);
      try {
        const response = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
        // Fallback para lista estática caso a API falhe
        setEstados([
          { sigla: "AC", nome: "Acre" },
          { sigla: "AL", nome: "Alagoas" },
          { sigla: "AP", nome: "Amapá" },
          { sigla: "AM", nome: "Amazonas" },
          { sigla: "BA", nome: "Bahia" },
          { sigla: "CE", nome: "Ceará" },
          { sigla: "DF", nome: "Distrito Federal" },
          { sigla: "ES", nome: "Espírito Santo" },
          { sigla: "GO", nome: "Goiás" },
          { sigla: "MA", nome: "Maranhão" },
          { sigla: "MT", nome: "Mato Grosso" },
          { sigla: "MS", nome: "Mato Grosso do Sul" },
          { sigla: "MG", nome: "Minas Gerais" },
          { sigla: "PA", nome: "Pará" },
          { sigla: "PB", nome: "Paraíba" },
          { sigla: "PR", nome: "Paraná" },
          { sigla: "PE", nome: "Pernambuco" },
          { sigla: "PI", nome: "Piauí" },
          { sigla: "RJ", nome: "Rio de Janeiro" },
          { sigla: "RN", nome: "Rio Grande do Norte" },
          { sigla: "RS", nome: "Rio Grande do Sul" },
          { sigla: "RO", nome: "Rondônia" },
          { sigla: "RR", nome: "Roraima" },
          { sigla: "SC", nome: "Santa Catarina" },
          { sigla: "SP", nome: "São Paulo" },
          { sigla: "SE", nome: "Sergipe" },
          { sigla: "TO", nome: "Tocantins" }
        ]);
      } finally {
        setLoadingEstados(false);
      }
    };

    carregarEstados();
  }, []);

  // Carregar cidades quando estado mudar
  useEffect(() => {
    const carregarCidades = async () => {
      if (!form.estado) {
        setCidades([]);
        return;
      }

      setLoadingCidades(true);
      try {
        const response = await fetch(
          `https://brasilapi.com.br/api/ibge/municipios/v1/${form.estado}`
        );
        
        if (!response.ok) {
          throw new Error("Erro ao carregar cidades");
        }
        
        const data = await response.json();
        setCidades(data);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
        setCidades([]);
      } finally {
        setLoadingCidades(false);
      }
    };

    carregarCidades();
  }, [form.estado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "estado") {
      // Quando o estado muda, limpa a cidade selecionada
      setForm({ 
        ...form, 
        [name]: value,
        cidade: "" 
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endereco: Endereco = {
        logradouro: form.logradouro,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
        cep: form.cep,
        complemento: form.complemento
      };

      const aluno: AlunoCreate = {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: form.cpf,
        rg: form.rg,
        quantidadeMoeda: 0,
        endereco: endereco
      };

      // Usando o service para cadastrar no backend
      const novoAluno = await alunoService.cadastrar(aluno);
      
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login"; // Redireciona para login
      
    } catch (error: any) {
      console.error("Erro ao cadastrar aluno:", error);
      
      if (error.response?.status === 409) {
        alert("Erro: " + error.response.data);
      } else {
        alert("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro de Aluno</h1>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Dados Pessoais</h3>
          <input 
            className="cadastro-input" 
            name="nome" 
            placeholder="Nome completo" 
            value={form.nome} 
            onChange={handleChange} 
            required 
          />
          <input 
            className="cadastro-input" 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            className="cadastro-input" 
            type="password" 
            name="senha" 
            placeholder="Senha" 
            value={form.senha} 
            onChange={handleChange} 
            required 
            minLength={6}
          />
          <input 
            className="cadastro-input" 
            name="cpf" 
            placeholder="CPF" 
            value={form.cpf} 
            onChange={handleChange} 
            required 
            max={11}
            minLength={11}
          />
          <input 
            className="cadastro-input" 
            name="rg" 
            placeholder="RG" 
            value={form.rg} 
            onChange={handleChange} 
            required 
            max={9}
            minLength={9}
          />
        </div>

        <div className="form-section">
          <h3>Endereço</h3>
          <input 
            className="cadastro-input" 
            name="logradouro" 
            placeholder="Logradouro (Rua, Avenida, etc.)" 
            value={form.logradouro} 
            onChange={handleChange} 
            required 
          />
          <input 
            className="cadastro-input" 
            name="numero" 
            placeholder="Número" 
            value={form.numero} 
            onChange={handleChange} 
            required 
          />
          <input 
            className="cadastro-input" 
            name="complemento" 
            placeholder="Complemento" 
            value={form.complemento} 
            onChange={handleChange} 
          />
          <input 
            className="cadastro-input" 
            name="bairro" 
            placeholder="Bairro" 
            value={form.bairro} 
            onChange={handleChange} 
            required 
          />
          
          {/* Estado - Select */}
          <div className="select-container">
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
            >
              <option value="">Estado</option>
              {loadingEstados ? (
                <option value="" disabled>Carregando estados...</option>
              ) : (
                estados.map((estado) => (
                  <option key={estado.sigla} value={estado.sigla}>
                    {estado.nome} ({estado.sigla})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Cidade - Select */}
          <div className="select-container">
            <select
              className="cadastro-cidade" 
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              required
              disabled={!form.estado || loadingCidades}
            >
              <option value="">
                {loadingCidades 
                  ? "Carregando cidades..." 
                  : !form.estado 
                    ? "Cidade" 
                    : "Cidade"
                }
              </option>
              {cidades.map((cidade, index) => (
                <option key={index} value={cidade.nome}>
                  {cidade.nome}
                </option>
              ))}
            </select>
          </div>

          <input 
            className="cadastro-input" 
            name="cep" 
            placeholder="CEP" 
            value={form.cep} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="cadastro-button"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}