import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center bg-[#f7f9fb] font-[Segoe_UI] text-[#333] p-8">
      <div className="max-w-[700px] text-center bg-white p-12 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-[3px]">
        <h1 className="text-3xl font-semibold mb-4">Bem-vindo ao StudentCoins</h1>
        <p className="text-[1.1rem] text-[#555] mb-8">
          Gerencie <span className="text-green-700 font-semibold">empresas parceiras</span> e{" "}
          <span className="text-green-700 font-semibold">alunos</span> de forma simples e eficiente.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Card de Empresas */}
          <Link
            to="/empresas"
            className="w-[250px] bg-white rounded-xl p-6 text-[#333] no-underline shadow-[0_3px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]"
          >
            <span className="material-symbols-outlined text-[48px] mb-2 text-[#43a047] block">business</span>
            <h2 className="text-lg font-semibold mb-1">Empresas</h2>
            <p className="text-sm text-[#666]">Gerenciar cadastro e informações</p>
          </Link>

          {/* Card de Alunos */}
          <Link
            to="/alunos"
            className="w-[250px] bg-white rounded-xl p-6 text-[#333] no-underline shadow-[0_3px_10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_5px_20px_rgba(0,0,0,0.15)]"
          >
            <span className="material-symbols-outlined text-[48px] mb-2 text-[#1976d2] block">school</span>
            <h2 className="text-lg font-semibold mb-1">Alunos</h2>
            <p className="text-sm text-[#666]">Gerenciar registros</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
