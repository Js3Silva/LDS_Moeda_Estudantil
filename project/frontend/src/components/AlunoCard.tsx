import React from "react";
import { Aluno } from "../types/Aluno";
import "../pages/Aluno/AlunoList";

interface AlunoCardProps {
  aluno: Aluno;
}

const AlunoCard: React.FC<AlunoCardProps> = ({ aluno }) => {
  return (
    <div className="aluno-card">
      <div className="aluno-card-header">
        <div className="aluno-avatar">
          {aluno.nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
        </div>
        <div className="aluno-info">
          <h3 className="aluno-nome">{aluno.nome}</h3>
          <p className="aluno-email">{aluno.email}</p>
        </div>
      </div>

      <div className="aluno-details">
        <div className="detail-row">
          <span className="detail-label">CPF:</span>
          <span className="detail-value">{aluno.cpf}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">RG:</span>
          <span className="detail-value">{aluno.rg}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Moedas:</span>
          <span className="detail-value moedas">💰 {aluno.quantidadeMoeda}</span>
        </div>
      </div>

      <div className="aluno-endereco">
        <h4>Endereço</h4>
        <p>{aluno.endereco.logradouro}, {aluno.endereco.numero}</p>
        <p>{aluno.endereco.bairro} - {aluno.endereco.cidade}/{aluno.endereco.estado}</p>
        <p>CEP: {aluno.endereco.cep}</p>
        {aluno.endereco.complemento && (
          <p>Complemento: {aluno.endereco.complemento}</p>
        )}
      </div>
    </div>
  );
};

export default AlunoCard;