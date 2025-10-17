import React, { useState, useEffect } from "react";
import ModalEdicaoPerfil from "../../components/ModalPerfilUsuario/ModalEdicaoPerfil";
import { Aluno, AlunoUpdate } from "../../types/Aluno";
import { alunoService } from "../../services/alunoService";
import "./PerfilAlunoPage.css";

export default function PerfilAlunoPage() {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar dados do aluno logado
  useEffect(() => {
    const loadAlunoLogado = async () => {
      try {
        const alunoLogado = await alunoService.getAlunoLogado();
        setAluno(alunoLogado);
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlunoLogado();
  }, []);

  const handleSave = async (updatedAluno: AlunoUpdate) => {
    try {
      if (!aluno?.id) return;
      
      const alunoAtualizado = await alunoService.atualizar(aluno.id, updatedAluno);
      setAluno(alunoAtualizado);
      setIsModalOpen(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    await alunoService.logout();
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="loading">Carregando perfil...</div>;
  }

  if (!aluno) {
    return (
      <div className="perfil-container">
        <div className="error-card">
          <h2>Usuário não encontrado</h2>
          <p>Faça login para acessar seu perfil.</p>
          <button 
            className="perfil-button"
            onClick={() => window.location.href = "/login"}
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <img
          src="https://static.vecteezy.com/ti/vetor-gratis/p3/8973321-icone-aluno-icone-relacionado-a-educacao-em-dois-tons-icone-estilo-design-simples-editavel-vetor.jpg"
          alt="Perfil"
          className="perfil-img"
        />
        <h2 className="perfil-nome">{aluno.nome}</h2>
        <p className="perfil-email">{aluno.email}</p>
        <p className="perfil-moedas">💰 {aluno.quantidadeMoeda} moedas</p>

        <div className="perfil-documentos">
          <p><strong>CPF:</strong> {aluno.cpf}</p>
          <p><strong>RG:</strong> {aluno.rg}</p>
        </div>

        <div className="perfil-endereco">
          <h3>Endereço</h3>
          <p>
            {aluno.endereco.logradouro}, {aluno.endereco.numero}
            {aluno.endereco.complemento && `, ${aluno.endereco.complemento}`}
          </p>
          <p>
            {aluno.endereco.bairro} - {aluno.endereco.cidade}/
            {aluno.endereco.estado}
          </p>
          <p>CEP: {aluno.endereco.cep}</p>
        </div>

        <div className="perfil-actions">
          <button
            className="perfil-button"
            onClick={() => setIsModalOpen(true)}
          >
            Editar Perfil
          </button>
          <button
            className="perfil-button logout-button"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      </div>

      <ModalEdicaoPerfil
        aluno={aluno}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}