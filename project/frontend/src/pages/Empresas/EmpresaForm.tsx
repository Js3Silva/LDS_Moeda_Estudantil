import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { empresaService } from "../../services/empresaService";
import { Empresa } from "../../types/Empresa";

export default function EmpresaForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    cnpj: "",
    endereco: "",
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
    <div className="container">
      <h2>{id ? "Editar Empresa" : "Nova Empresa"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={empresa.nome}
            onChange={handleChange}
            className="form-control"
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
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={empresa.endereco}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Salvar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/empresas")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
