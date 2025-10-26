import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Bem-vindo ao StudentCoins</h1>
        <p className="home-subtitle">
          Gerencie <span className="highlight">empresas parceiras</span> e{" "}
          <span className="highlight">alunos</span> de forma simples e eficiente.
        </p>

        <div className="options-container">
          <Link to="/empresas" className="option-card green">
            <span className="material-symbols-outlined icon">business</span>
            <h2>Empresas</h2>
            <p>Gerenciar cadastro e informações</p>
          </Link>

          <Link to="/alunos" className="option-card blue">
            <span className="material-symbols-outlined icon">school</span>
            <h2>Alunos</h2>
            <p>Gerenciar registros</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
