import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePageAdmin";
import { EmpresaList } from "../pages/Empresas";
import LoginPage from "../pages/Login/LoginPage";
import CadastroAlunoPage from "../pages/Aluno/CadastroAlunoPage";
import PerfilAlunoPage from "../pages/Aluno/PerfilAlunoPage";
import AlunoList from "../pages/Aluno/AlunoList";
import Layout from "./Layout";
// import HomePageAluno from "../pages/Home/HomePageAluno";
// import HomePageEmpresa from "../pages/Home/HomePageEmpresa";

export default function AppRoutes() {
  const user = localStorage.getItem("user");

  // 🔹 Escolhe a página inicial conforme o tipo de usuário
  let homeElement;
  if (user === "admin") {
    homeElement = <HomePage />;
  } else if (user === "aluno") {
    // homeElement = <HomePageAluno />;
  } else if (user === "empresa") {
    // homeElement = <HomePageEmpresa />;
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
