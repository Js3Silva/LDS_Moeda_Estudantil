import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Sistema de Gestão | StudentCoins</p>
    </footer>
  );
}
