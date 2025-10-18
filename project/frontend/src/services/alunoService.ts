// services/alunoService.ts
import { api } from "./api";
import { Aluno, AlunoCreate, AlunoUpdate, LoginDTO, LoginResponse } from "../types/Aluno";

export const alunoService = {
  cadastrar: async (aluno: AlunoCreate): Promise<Aluno> => {
    const response = await api.post("/alunos/cadastrar", aluno);
    return response.data;
  },

  login: async (loginDTO: LoginDTO): Promise<LoginResponse> => {
    const response = await api.post("/alunos/login", loginDTO);
    
    // Salva o ID do aluno logado no localStorage
    if (response.data.id) {
      localStorage.setItem("alunoId", response.data.id.toString());
      localStorage.setItem("alunoToken", "authenticated"); // Simples token
    }
    
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("alunoId");
    localStorage.removeItem("alunoToken");
  },

  getAlunoLogado: async (): Promise<Aluno | null> => {
    const alunoId = localStorage.getItem("alunoId");
    if (!alunoId) return null;

    try {
      const response = await api.get(`/alunos/${alunoId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aluno logado:", error);
      return null;
    }
  },

  listar: async (): Promise<Aluno[]> => {
    const response = await api.get("/alunos/all");
    return response.data;
  },

  buscarPorId: async (id: number): Promise<Aluno> => {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  },

  atualizar: async (id: number, aluno: AlunoUpdate): Promise<Aluno> => {
    const response = await api.put(`/alunos/atualizar/${id}`, aluno);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/alunos/deletar/${id}`);
  },
};