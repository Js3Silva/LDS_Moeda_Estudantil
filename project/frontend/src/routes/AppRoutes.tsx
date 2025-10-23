import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import { EmpresaList } from "../pages/Empresas";
import LoginAlunoPage from "../pages/Aluno/LoginAlunoPage";
import CadastroAlunoPage from "../pages/Aluno/CadastroAlunoPage";
import PerfilAlunoPage from "../pages/Aluno/PerfilAlunoPage";
import AlunoList from "../pages/Aluno/AlunoList";
import Layout from "./Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Rotas de Empresas */}
          <Route path="empresas" element={<EmpresaList />} />

          {/* Rotas de Alunos */}
          <Route path="aluno/login" element={<LoginAlunoPage />} />
          <Route path="aluno/novo" element={<CadastroAlunoPage />} />
          <Route path="aluno" element={<PerfilAlunoPage />} />
          <Route path="alunos" element={<AlunoList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
