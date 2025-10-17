import { api } from "./api";
import { Empresa, EmpresaCreate, EmpresaUpdate } from "../types/Empresa";

export const empresaService = {
  listar: async (): Promise<Empresa[]> => {
    const response = await api.get("/empresas/all");
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Empresa> => {
    const response = await api.get(`/empresas/${id}`);
    return response.data;
  },

  salvar: async (empresa: EmpresaCreate): Promise<void> => {
    await api.post("/empresas/cadastrar", empresa);
  },

  atualizar: async (id: number, empresa: EmpresaUpdate): Promise<void> => {
    await api.put(`/empresas/atualizar/${id}`, empresa);
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/empresas/deletar/${id}`);
  },
};
