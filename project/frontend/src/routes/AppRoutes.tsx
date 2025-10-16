import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "../pages/Home/HomePage";
import EmpresaList from "../pages/Empresas/EmpresaList";
import EmpresaForm from "../pages/Empresas/EmpresaForm";
// import ClienteList from "../pages/Clientes/ClienteList";
// import ClienteForm from "../pages/Clientes/ClienteForm";

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
        {/* <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/novo" element={<ClienteForm />} />
        <Route path="/clientes/:id" element={<ClienteForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
