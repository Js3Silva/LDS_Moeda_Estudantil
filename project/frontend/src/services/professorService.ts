import { api } from "./api";
import { Professor, ProfessorCreate, ProfessorUpdate } from "../types/Professor";

export const professorService = {
    listar: async (): Promise<Professor[]> => {
        const response = await api.get("/professores/all");
        return response.data;
    },
    buscarPorId: async (id: number): Promise<Professor> => {
        const response = await api.get(`/professores/${id}`);
        return response.data;
    },
    salvar: async (professor: ProfessorCreate): Promise<void> => {
        await api.post("/professores/cadastrar", professor);
    },
    atualizar: async (id: number, professor: ProfessorUpdate): Promise<void> => {
        await api.put(`/professores/atualizar/${id}`, professor);
    },
    deletar: async (id: number): Promise<void> => {
        await api.delete(`/professores/deletar/${id}`);
    },
};