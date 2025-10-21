import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import { EmpresaList, EmpresaForm } from "../pages/Empresas";
import LoginAlunoPage from "../pages/Aluno/LoginAlunoPage";
import CadastroAlunoPage from "../pages/Aluno/CadastroAlunoPage";
import PerfilAlunoPage from "../pages/Aluno/PerfilAlunoPage"
import AlunoList from "../pages/Aluno/AlunoList";
import EmpresaView from "../pages/Empresas/EmpresaView";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Rotas de Empresas */}
        <Route path="/empresas" element={<EmpresaList />} />
        <Route path="/empresas/novo" element={<EmpresaForm />} />
        <Route path="/empresas/:id" element={<EmpresaView />} />

        {/* Rotas de Alunos */}
        <Route path="/aluno/login" element={<LoginAlunoPage />} />
        <Route path="/aluno/novo" element={<CadastroAlunoPage />} />
        <Route path="/aluno" element={<PerfilAlunoPage />} />
        <Route path="/alunos" element={<AlunoList />} />
      </Routes>
    </BrowserRouter>
  );
}