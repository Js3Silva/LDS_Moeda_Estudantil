import { useEffect, useState } from "react";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";
import "./Empresas.css";
import EmpresaModal from "./EmpresaModal";

export default function EmpresaList() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empresaIdEdit, setEmpresaIdEdit] = useState<number | null>(null);

  const abrirModalNova = () => {
    setEmpresaIdEdit(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (id: number) => {
    setEmpresaIdEdit(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const carregarEmpresas = async () => {
      try {
        const dados = await empresaService.listar();
        setEmpresas(dados);
      } catch (error) {
        console.error("Erro ao carregar empresas:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarEmpresas();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esta empresa?")) {
      try {
        await empresaService.deletar(id);
        setEmpresas(empresas.filter((e) => e.id !== id));
      } catch (error) {
        console.error("Erro ao deletar empresa:", error);
      }
    }
  };

  if (loading) return <p className="loading-text">Carregando empresas...</p>;

  return (
    <div className="page-container">
      <div className="list-card">
        <div className="list-header">
          <h2>Empresas Cadastradas</h2>
          <button className="btn btn-add" onClick={abrirModalNova}>
            Nova Empresa
          </button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nome}</td>
                <td>{empresa.cnpj}</td>
                <td>{empresa.email}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => abrirModalEditar(empresa.id)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(empresa.id)}
                    className="btn btn-delete"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EmpresaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        empresaId={empresaIdEdit}
        onSuccess={() => console.log("Recarregar lista aqui")}
      />
    </div>
  );
}
