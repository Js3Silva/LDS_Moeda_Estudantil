import { useState } from "react";
import { empresaService } from "../../services/empresaService";
import Modal from "../../components/Modal";
import "./Empresas.css";
import { Empresa } from "../../types/Empresa";
import { useEffect } from "react";

interface EmpresaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  empresaId?: number | null; 
}

export default function EmpresaModal({ isOpen, onClose, onSuccess, empresaId }: EmpresaModalProps) {
  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    cnpj: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    const carregarEmpresa = async () => {
      if (empresaId) {
        try {
          const dados = await empresaService.buscarPorId(empresaId);
          setEmpresa(dados);
        } catch (error) {
          console.error("Erro ao carregar empresa:", error);
          alert("Não foi possível carregar os dados da empresa.");
        }
      } else {
        setEmpresa({ id: 0, nome: "", cnpj: "", email: "", senha: "" });
      }
    };

    if (isOpen) carregarEmpresa();
  }, [empresaId, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (empresaId) {
        await empresaService.atualizar(empresaId, empresa);
        alert("Empresa atualizada com sucesso!");
      } else {
        await empresaService.salvar(empresa);
        alert("Empresa cadastrada com sucesso!");
      }

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      alert("Erro ao salvar empresa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={empresaId ? "Editar Empresa" : "Cadastrar Nova Empresa"}
    >
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={empresa.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>CNPJ:</label>
          <input type="text" name="cnpj" value={empresa.cnpj} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={empresa.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Senha:</label>
          <input type="password" name="senha" value={""} onChange={handleChange} required />
        </div>

        <div className="button-row">
          <button type="submit" className="btn btn-success">
            Salvar
          </button>
          <button type="button" onClick={onClose} className="btn btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}