import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";
import "./Empresas.css";

export default function EmpresaForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    email: "",
    senha: "",
    cnpj: "",
  });

  useEffect(() => {
    if (id) {
      empresaService.buscarPorId(Number(id)).then(setEmpresa);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await empresaService.atualizar(Number(id), empresa);
      } else {
        await empresaService.salvar(empresa);
      }
      navigate("/empresas");
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>{id ? "Editar Empresa" : "Cadastrar Nova Empresa"}</h2>
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
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={empresa.senha}
              onChange={handleChange}
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
