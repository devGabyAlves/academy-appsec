import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#C5C6C7] font-sans flex flex-col">
       <Header />

      <section className="flex flex-col items-center text-center py-20 px-6 flex-grow">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Entre em Contato
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-lg max-w-xl leading-relaxed mb-10"
        >
          Quer contribuir com conteúdos, relatar melhorias ou colaborar com o projeto?  
          Fique à vontade para me enviar uma mensagem. Toda ajuda fortalece a comunidade! 🔐✨
        </motion.p>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="bg-[#1F2833] border border-[#2b3742] shadow-lg rounded-xl w-full max-w-lg p-8 space-y-4"
        >
          <div className="text-left">
            <label className="block mb-1 font-medium text-white">Nome</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-md bg-[#0B0C10] border border-[#2b3742] focus:outline-none focus:border-[#66FCF1] text-white"
              placeholder="Seu nome"
            />
          </div>

          <div className="text-left">
            <label className="block mb-1 font-medium text-white">E-mail</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-md bg-[#0B0C10] border border-[#2b3742] focus:outline-none focus:border-[#66FCF1] text-white"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="text-left">
            <label className="block mb-1 font-medium text-white">Mensagem</label>
            <textarea
              rows="5"
              className="w-full px-4 py-3 rounded-md bg-[#0B0C10] border border-[#2b3742] focus:outline-none focus:border-[#66FCF1] text-white resize-none"
              placeholder="Como deseja contribuir ou o que deseja compartilhar?"
            ></textarea>
          </div>

          <button className="w-full bg-[#FF6A00] text-black font-semibold py-3 rounded-md hover:bg-[#ff8c33] transition">
            Enviar Mensagem
          </button>
        </motion.form>
      </section>

       <Footer />
    </div>
  );
}
