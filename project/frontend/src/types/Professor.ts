
export interface Professor {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

export interface ProfessorCreate {
    nome: string;
    email: string;
    senha: string;
}

export interface ProfessorUpdate {
    id: number;
    nome: string;
    email: string;
    senha: string;
}