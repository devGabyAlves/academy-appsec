import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#C5C6C7] font-sans flex flex-col">
    <Header />

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 flex-grow">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-6 leading-tight max-w-3xl"
        >
          Construa sua jornada em <br /> Segurança de Aplicações.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-lg text-[#C5C6C7] mb-10 max-w-2xl leading-relaxed"
        >
          Quer aprender mais sobre Segurança de Aplicações, mas não sabe por onde começar?  
          A <span className="text-[#FF6A00] font-semibold">Academy AppSec</span> reúne trilhas, conteúdos e ferramentas para você estudar, e o melhor: tudo 100% gratuito. O objetivo aqui é simples: ajudar a comunidade a crescer e levar AppSec para mais pessoas.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#FF6A00] text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#ff8c33] transition"
        >
          Comece sua trilha
        </motion.button>
      </section>

      <section className="py-20 px-6 border-t border-[#1F2833]">
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-center mb-14 text-white"
        >
          O que você vai encontrar na Academy AppSec
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: "📚",
              title: "Trilhas de Estudo Guiadas",
              text: "Conteúdo organizado passo a passo para aprender AppSec sem se perder. Do básico ao avançado, no seu ritmo."
            },
            {
              icon: "🛠️",
              title: "Ferramentas e Práticas Reais",
              text: "Aprenda usando ferramentas do mercado como GoSec, ZAP, Semgrep, Trivy, SonarQube, além de conceitos como SAST, DAST e DevSecOps."
            },
            {
              icon: "💡",
              title: "100% Gratuito e Aberto",
              text: "Nada de paywall, curso pago ou captura de leads. Todo o conteúdo é livre para uso, estudo e comunidade."
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="bg-[#1F2833] rounded-xl p-10 text-center shadow-[0_0_15px_rgba(0,0,0,0.25)] hover:shadow-[0_0_25px_rgba(0,0,0,0.35)] transition cursor-default border border-[#2b3742]"
            >
              <div className="text-[#66FCF1] text-6xl mb-6">{card.icon}</div>
              <h4 className="text-xl font-semibold text-white mb-3">{card.title}</h4>
              <p className="text-base text-[#C5C6C7] leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

       <Footer />
    </div>
  );
}
