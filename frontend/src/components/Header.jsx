import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 border-b border-[#1F2833] bg-[#0B0C10]">
      <Link to="/" className="text-[#FF6A00] text-xl font-bold tracking-wide">
        Academy AppSec
      </Link>

      <nav className="space-x-8 text-[#C5C6C7] text-sm">
        <Link to="/" className="hover:text-[#66FCF1] transition">Início</Link>
        <Link to="/trilhas" className="hover:text-[#66FCF1] transition">Trilhas</Link>
        <Link to="/contato" className="hover:text-[#66FCF1] transition">Contato</Link>
      </nav>
    </header>
  );
}
