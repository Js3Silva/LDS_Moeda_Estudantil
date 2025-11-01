import { useState, useEffect } from "react";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";
import { useNavigate, useParams } from "react-router-dom";

export default function CadastroEmpresaPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    cnpj: "",
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarEmpresa = async () => {
      if (id) {
        try {
          const dados = await empresaService.buscarPorId(Number(id));
          setEmpresa(dados);
        } catch (error) {
          console.error("Erro ao carregar empresa:", error);
          alert("Não foi possível carregar os dados da empresa.");
        }
      }
    };
    carregarEmpresa();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await empresaService.atualizar(Number(id), empresa);
        alert("Empresa atualizada com sucesso!");
      } else {
        await empresaService.salvar(empresa);
        alert("Empresa cadastrada com sucesso!");
      }
      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      alert("Erro ao salvar empresa. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {id ? "Editar Empresa" : "Cadastrar Nova Empresa"}
        </h1>

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
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-400 text-black rounded-md font-semibold hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
