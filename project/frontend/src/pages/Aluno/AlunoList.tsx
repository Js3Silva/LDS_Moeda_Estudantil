import React, { useState, useEffect } from "react";
import { Aluno } from "../../types/Aluno";
import "./AlunoList.css";
import AlunoCard from "../../components/AlunoCard";
import { alunoService } from "../../services/alunoService";

export default function AlunoList() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Carregar alunos do backend
  useEffect(() => {
    const loadAlunos = async () => {
      try {
        setLoading(true);
        setError(null);
        const alunosData = await alunoService.listar();
        setAlunos(alunosData);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        setError("Erro ao carregar lista de alunos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadAlunos();
  }, []);

  // Filtrar alunos baseado na busca
  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.cpf.includes(searchTerm)
  );

  if (loading) {
    return <div className="loading">Carregando alunos...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="aluno-list-container">
      <div className="aluno-list-header">
        <h1>Lista de Alunos</h1>
        <div className="aluno-list-actions">
          <input
            type="text"
            placeholder="Buscar por nome, email ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="aluno-count">
            {filteredAlunos.length} aluno(s) encontrado(s)
          </span>
        </div>
      </div>

      {filteredAlunos.length === 0 ? (
        <div className="no-alunos">
          {alunos.length === 0 ? (
            <p>Nenhum aluno cadastrado ainda.</p>
          ) : (
            <p>Nenhum aluno encontrado com os critérios de busca.</p>
          )}
        </div>
      ) : (
        <div className="aluno-grid">
          {filteredAlunos.map((aluno) => (
            <AlunoCard key={aluno.id} aluno={aluno} />
          ))}
        </div>
      )}
    </div>
  );
}