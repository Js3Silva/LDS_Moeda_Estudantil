import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "../pages/Home/HomePage";
import { EmpresaList, EmpresaForm } from "../pages/Empresas";
// import AlunoList from "../pages/Clientes/AlunoList";
// import AlunoForm from "../pages/Clientes/AlunoForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        
        {/* Rotas de Empresas */}
        <Route path="/empresas" element={<EmpresaList />} />
        <Route path="/empresas/novo" element={<EmpresaForm />} />
        <Route path="/empresas/:id" element={<EmpresaForm />} />
        
        {/* Rotas de Clientes */}
        {/* <Route path="/clientes" element={<AlunoList />} />
        <Route path="/clientes/novo" element={<AlunoForm />} />
        <Route path="/clientes/:id" element={<AlunoForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
