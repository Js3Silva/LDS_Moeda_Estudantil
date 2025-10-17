
export interface EmpresaCreate {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  senha: string;
}

export interface Empresa {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  senha: string;
}

export interface EmpresaUpdate {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  senha: string;
}
