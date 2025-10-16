import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container" style={{ padding: "2rem" }}>
      <h1>Bem-vindo ao Sistema de Gestão</h1>
      <p>Escolha uma das opções abaixo para começar:</p>
      <ul>
        <li>
          <Link to="/empresas">Empresas</Link>
        </li>
        <li>
          <Link to="/clientes">Clientes</Link>
        </li>
      </ul>
    </div>
  );
}