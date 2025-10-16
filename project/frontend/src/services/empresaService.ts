import { api } from "./api";
import { Empresa } from "../types/Empresa";

export const empresaService = {
  listar: async (): Promise<Empresa[]> => {
    const response = await api.get("/empresas");
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Empresa> => {
    const response = await api.get(`/empresas/${id}`);
    return response.data;
  },

  salvar: async (empresa: Empresa): Promise<void> => {
    await api.post("/empresas", empresa);
  },

  atualizar: async (id: number, empresa: Empresa): Promise<void> => {
    await api.put(`/empresas/${id}`, empresa);
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/empresas/${id}`);
  },
};
