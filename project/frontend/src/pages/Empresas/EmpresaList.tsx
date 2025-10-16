import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";

export default function EmpresaList() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Carregando empresas...</p>;

  return (
    <div className="container">
      <h2>Empresas</h2>
      <Link to="/empresas/novo" className="btn btn-primary">Nova Empresa</Link>
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.id}>
              <td>{empresa.id}</td>
              <td>{empresa.nome}</td>
              <td>{empresa.cnpj}</td>
              <td>{empresa.endereco}</td>
              <td>
                <Link to={`/empresas/${empresa.id}`} className="btn btn-sm btn-warning">Editar</Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(empresa.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
