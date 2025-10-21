import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";
import "./Empresas.css";

export default function EmpresaView() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    cnpj: "",
    email: "",
    senha: ""
  });

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
    if (!id) {
      alert("ID inválido para edição.");
      return;
    }
    try {
      await empresaService.atualizar(Number(id), empresa);
      alert("Empresa atualizada com sucesso!");
      navigate("/empresas");
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      alert("Erro ao atualizar empresa. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>Editar Empresa</h2>
        <form onSubmit={handleSubmit} className="form-layout">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={empresa.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CNPJ:</label>
            <input
              type="text"
              name="cnpj"
              value={empresa.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={empresa.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={empresa.senha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-row">
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
            <button
              type="button"
              onClick={() => navigate("/empresas")}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
