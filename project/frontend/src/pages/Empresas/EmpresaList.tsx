import { useEffect, useState } from "react";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";
// import EmpresaModal from "./EmpresaModal";

export default function EmpresaList() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [empresaIdEdit, setEmpresaIdEdit] = useState<number | null>(null);

  // const abrirModalEditar = (id: number) => {
  //   setEmpresaIdEdit(id);
  //   setIsModalOpen(true);
  // };

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

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Carregando empresas...
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 font-sans">
      <div className="bg-white rounded-xl p-6 shadow-md">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Empresas Cadastradas
          </h2>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mt-3">
            <thead>
              <tr className="bg-gray-100 text-gray-800">
                <th className="p-3 font-semibold border-b text-center">ID</th>
                <th className="p-3 font-semibold border-b text-center">Nome</th>
                <th className="p-3 font-semibold border-b text-center">CNPJ</th>
                <th className="p-3 font-semibold border-b text-center">Email</th>
                <th className="p-3 font-semibold border-b text-center">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa) => (
                <tr
                  key={empresa.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 border-b text-center">{empresa.id}</td>
                  <td className="p-3 border-b text-center">{empresa.nome}</td>
                  <td className="p-3 border-b text-center">{empresa.cnpj}</td>
                  <td className="p-3 border-b text-center">{empresa.email}</td>
                  <td className="p-3 border-b text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleDelete(empresa.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-all"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <EmpresaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        empresaId={empresaIdEdit}
        onSuccess={() => console.log("Recarregar lista aqui")}
      /> */}
    </div>
  );
}
