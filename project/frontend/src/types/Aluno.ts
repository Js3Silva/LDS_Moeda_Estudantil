import { Endereco } from "./Endereco";


export interface Aluno {
  id: number;
  nome: string;
  email: string;
  rg: string;
  cpf: string;
  quantidadeMoeda: number;
  endereco: Endereco;
}

export interface AlunoCreate {
  nome: string;
  email: string;
  senha: string;
  rg: string;
  cpf: string;
  quantidadeMoeda: number;
  endereco: Endereco;
}

export interface AlunoUpdate {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  endereco: Endereco;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  mensagem: string;
}