import { Endereco } from "./Endereco";
export interface Aluno {
  complemento: any;
  nome: string;
  email: string;
  cpf: string;
  rg: string;
  quantidadeMoeda: number;
  endereco: Endereco;
}
