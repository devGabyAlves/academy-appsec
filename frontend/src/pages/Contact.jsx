import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("http://localhost:8080/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem");
      }

      setFeedback({ type: "success", msg: "Mensagem enviada com sucesso! ✅" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Erro inesperado" });
    }

    setLoading(false);
  };

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
          Tem interesse em contribuir com conteúdos, sugerir melhorias ou participar do desenvolvimento da plataforma?  
          Envie sua mensagem, toda colaboração é bem-vinda e ajuda a fortalecer a comunidade de AppSec. 🔐✨
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="bg-[#1F2833] border border-[#2b3742] shadow-lg rounded-xl w-full max-w-lg p-8 space-y-4"
        >
          <div className="text-left">
            <label className="block mb-1 font-medium text-white">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#0B0C10] border border-[#2b3742] focus:outline-none focus:border-[#66FCF1] text-white"
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="text-left">
            <label className="block mb-1 font-medium text-white">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#0B0C10] border border-[#2b3742] focus:outline-none focus:border-[#66FCF1] text-white"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div className="text-left">
            <label className="block mb-1 font-medium text-white">Mensagem</label>
            <textarea
              rows="5"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#0B0C10] border border-[#2b3742] focus:outline-none focus:border-[#66FCF1] text-white resize-none"
              placeholder="Como deseja contribuir ou o que deseja compartilhar?"
              required
            ></textarea>
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#FF6A00] text-black font-semibold py-3 rounded-md hover:bg-[#ff8c33] transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </button>

          {feedback && (
            <p
              className={`text-sm mt-2 ${
                feedback.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedback.msg}
            </p>
          )}
        </motion.form>
      </section>

      <Footer />
    </div>
  );
}
