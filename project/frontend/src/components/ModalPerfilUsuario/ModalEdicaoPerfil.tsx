import React, { useState, useEffect } from "react";
import "./ModalEdicaoPerfil.css";
import { Aluno } from "../../types/Aluno";

interface ModalEdicaoPerfilProps {
  aluno: Aluno;
  isOpen: boolean;
  onClose: () => void;
  onSave: (aluno: Aluno) => void;
}

const ModalEdicaoPerfil: React.FC<ModalEdicaoPerfilProps> = ({
  aluno,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Aluno>(aluno);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(aluno);
  }, [aluno]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'endereco') {
        setFormData(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    }

    if (!formData.rg.trim()) {
      newErrors.rg = "RG é obrigatório";
    }

    if (!formData.endereco.cep.trim()) {
      newErrors['endereco.cep'] = "CEP é obrigatório";
    }

    if (!formData.endereco.logradouro.trim()) {
      newErrors['endereco.logradouro'] = "Logradouro é obrigatório";
    }

    if (!formData.endereco.numero.trim()) {
      newErrors['endereco.numero'] = "Número é obrigatório";
    }

    if (!formData.endereco.bairro.trim()) {
      newErrors['endereco.bairro'] = "Bairro é obrigatório";
    }

    if (!formData.endereco.cidade.trim()) {
      newErrors['endereco.cidade'] = "Cidade é obrigatória";
    }

    if (!formData.endereco.estado.trim()) {
      newErrors['endereco.estado'] = "Estado é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Perfil</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-section">
            <h3>Informações Pessoais</h3>
            
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={errors.nome ? 'error' : ''}
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  className={errors.cpf ? 'error' : ''}
                />
                {errors.cpf && <span className="error-message">{errors.cpf}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="rg">RG</label>
                <input
                  type="text"
                  id="rg"
                  name="rg"
                  value={formData.rg}
                  onChange={handleChange}
                  className={errors.rg ? 'error' : ''}
                />
                {errors.rg && <span className="error-message">{errors.rg}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Endereço</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  id="cep"
                  name="endereco.cep"
                  value={formData.endereco.cep}
                  onChange={handleChange}
                  className={errors['endereco.cep'] ? 'error' : ''}
                />
                {errors['endereco.cep'] && <span className="error-message">{errors['endereco.cep']}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input
                  type="text"
                  id="estado"
                  name="endereco.estado"
                  value={formData.endereco.estado}
                  onChange={handleChange}
                  className={errors['endereco.estado'] ? 'error' : ''}
                />
                {errors['endereco.estado'] && <span className="error-message">{errors['endereco.estado']}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                type="text"
                id="logradouro"
                name="endereco.logradouro"
                value={formData.endereco.logradouro}
                onChange={handleChange}
                className={errors['endereco.logradouro'] ? 'error' : ''}
              />
              {errors['endereco.logradouro'] && <span className="error-message">{errors['endereco.logradouro']}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="numero">Número</label>
                <input
                  type="text"
                  id="numero"
                  name="endereco.numero"
                  value={formData.endereco.numero}
                  onChange={handleChange}
                  className={errors['endereco.numero'] ? 'error' : ''}
                />
                {errors['endereco.numero'] && <span className="error-message">{errors['endereco.numero']}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  id="complemento"
                  name="endereco.complemento"
                  value={formData.endereco.complemento}
                  onChange={handleChange}
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  name="endereco.bairro"
                  value={formData.endereco.bairro}
                  onChange={handleChange}
                  className={errors['endereco.bairro'] ? 'error' : ''}
                />
                {errors['endereco.bairro'] && <span className="error-message">{errors['endereco.bairro']}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="endereco.cidade"
                  value={formData.endereco.cidade}
                  onChange={handleChange}
                  className={errors['endereco.cidade'] ? 'error' : ''}
                />
                {errors['endereco.cidade'] && <span className="error-message">{errors['endereco.cidade']}</span>}
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdicaoPerfil;