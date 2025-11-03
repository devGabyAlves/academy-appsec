export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#C5C6C7] font-sans flex flex-col">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center p-6 border-b border-[#1F2833] bg-[#0B0C10]">
        <h1 className="text-[#FF6A00] text-xl font-bold tracking-wide">
          Academy AppSec
        </h1>
        <nav className="space-x-8 text-[#C5C6C7] text-sm">
          <a href="#" className="hover:text-[#66FCF1] transition">Início</a>
          <a href="#" className="hover:text-[#66FCF1] transition">Trilhas</a>
          <a href="#" className="hover:text-[#66FCF1] transition">Contato</a>
        </nav>
      </header>

      {/* Seção Principal */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 flex-grow">
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          Aprimore seus <br /> conhecimentos em AppSec.
        </h2>
        <p className="text-lg text-[#C5C6C7] mb-10 max-w-xl">
          Domine ferramentas de SAST, DAST e DevSecOps por meio de trilhas de aprendizado selecionadas.
        </p>
        <button className="bg-[#FF6A00] text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#ff8c33] transition">
          Comece a aprender
        </button>
      </section>

      {/* Seção de Recursos */}
      <section className="py-16 px-6 border-t border-[#1F2833]">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-[#1F2833] rounded-lg p-8 text-center shadow-md hover:shadow-lg transition">
            <div className="text-[#66FCF1] text-5xl mb-4">🧠</div>
            <h4 className="text-lg font-bold text-white mb-2">Aprenda na Prática</h4>
            <p className="text-sm text-[#C5C6C7]">
              Use ferramentas reais de AppSec como Gosec e ZAP.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1F2833] rounded-lg p-8 text-center shadow-md hover:shadow-lg transition">
            <div className="text-[#66FCF1] text-5xl mb-4">🔒</div>
            <h4 className="text-lg font-bold text-white mb-2">Foco em Segurança</h4>
            <p className="text-sm text-[#C5C6C7]">
              Focado em vulnerabilidades reais e em estratégias de defesa.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1F2833] rounded-lg p-8 text-center shadow-md hover:shadow-lg transition">
            <div className="text-[#66FCF1] text-5xl mb-4">🌐</div>
            <h4 className="text-lg font-bold text-white mb-2">Feito pela Comunidade</h4>
            <p className="text-sm text-[#C5C6C7]">
              Materiais de aprendizado open source para todos.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="text-center py-6 border-t border-[#1F2833] text-sm text-[#C5C6C7]">
        © 2025 Academy AppSec
      </footer>
    </div>
  );
}
