export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#004b9b] to-[#0077ff] text-white text-center py-4 font-[Poppins] text-[0.95rem] tracking-[0.3px] shadow-[0_-2px_8px_rgba(0,0,0,0.15)] mt-auto relative bottom-0">
      <p className="m-0 opacity-90 transition-opacity duration-300 hover:opacity-100">
        © {new Date().getFullYear()} Sistema de Gestão | Stuwards
      </p>
    </footer>
  );
}
