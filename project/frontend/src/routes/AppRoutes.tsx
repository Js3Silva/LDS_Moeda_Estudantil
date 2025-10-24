import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import { EmpresaList } from "../pages/Empresas";
import LoginPage from "../pages/Login/LoginPage";
import CadastroAlunoPage from "../pages/Aluno/CadastroAlunoPage";
import PerfilAlunoPage from "../pages/Aluno/PerfilAlunoPage";
import AlunoList from "../pages/Aluno/AlunoList";
import Layout from "./Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />

          {/* Rotas de Empresas */}
          <Route path="empresas" element={<EmpresaList />} />

          {/* Rotas de Alunos */}
          <Route path="home" element={<HomePage />} />
          <Route path="aluno/novo" element={<CadastroAlunoPage />} />
          <Route path="aluno" element={<PerfilAlunoPage />} />
          <Route path="alunos" element={<AlunoList />} />
          <Route path="login" element={<LoginPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
