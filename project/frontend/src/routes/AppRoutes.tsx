import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePageAdmin";
import { EmpresaList } from "../pages/Empresas";
import LoginPage from "../pages/Login/LoginPage";
import CadastroAlunoPage from "../pages/Aluno/CadastroAlunoPage";
import PerfilAlunoPage from "../pages/Aluno/PerfilAlunoPage";
import AlunoList from "../pages/Aluno/AlunoList";
import Layout from "./Layout";
import CadastroEmpresaPage from "../pages/Empresas/CadastroEmpresa";
import TransacaoPage from "../pages/Transacao/EnvioMoeda";
// import HomePageAluno from "../pages/Home/HomePageAluno";
import HomePageEmpresa from "../pages/Home/HomePageEmpresa";

export default function AppRoutes() {
  const user = localStorage.getItem("userType");

  let homeElement;
  if (user === "admin") {
    homeElement = <HomePage />;
  } else if (user === "aluno") {
    // homeElement = <HomePageAluno />;
  } else if (user === "empresa") {
    homeElement = <HomePageEmpresa />;
  } else {
    homeElement = <LoginPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Página inicial dinâmica */}
          <Route index element={homeElement} />

          {/* Rotas de Empresas */}
          <Route path="empresas" element={<EmpresaList />} />
          <Route path="empresa/novo" element={<CadastroEmpresaPage />} />

          {/* Rota transaçãos */}
          <Route path="transacoes" element={<TransacaoPage />} />

          {/* Rotas de Alunos */}
          <Route path="aluno/novo" element={<CadastroAlunoPage />} />
          <Route path="aluno" element={<PerfilAlunoPage />} />
          <Route path="alunos" element={<AlunoList />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
