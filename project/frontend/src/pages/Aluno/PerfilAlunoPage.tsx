import React, { useState } from "react";
import ModalEdicaoPerfil from "../../components/ModalPerfilUsuario/ModalEdicaoPerfil"; // Correto
import { Aluno } from "../../types/Aluno";
import "./PerfilAlunoPage.css";

export default function PerfilAlunoPage() {
  const [aluno, setAluno] = useState<Aluno>({
    nome: "João da Silva",
    email: "joao.silva@email.com",
    quantidadeMoeda: 250,
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    complemento: "",
    endereco: {
      logradouro: "Rua das Flores",
      numero: "123",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01234-567",
      complemento: ""
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedAluno: Aluno) => {
    setAluno(updatedAluno);
    console.log("Dados salvos:", updatedAluno);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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

        <button
          className="perfil-button"
          onClick={() => setIsModalOpen(true)}
        >
          Editar Perfil
        </button>
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