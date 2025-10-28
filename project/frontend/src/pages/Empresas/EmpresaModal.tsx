import { useState, useEffect } from "react";
import { empresaService } from "../../services/empresaService";
import Modal from "../../components/Modal";
import { Empresa } from "../../types/Empresa";

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Nome:</label>
          <input
            type="text"
            name="nome"
            value={empresa.nome}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">CNPJ:</label>
          <input
            type="text"
            name="cnpj"
            value={empresa.cnpj}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={empresa.email}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Senha:</label>
          <input
            type="password"
            name="senha"
            value={empresa.senha}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-black rounded-md font-semibold hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
}
