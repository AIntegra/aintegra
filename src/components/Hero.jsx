import { motion } from "framer-motion"
import { Rocket, Github, Mic } from "lucide-react"

export default function Hero({ t }) {
  return (
    <section className="relative overflow-hidden text-center">
      {/* Fondo con degradado animado */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10 blur-3xl opacity-60"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center">
        
        {/* LOGO AIntegra con efecto glow */}
        <motion.div
          className="relative flex justify-center items-center mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Halo animado detrás del logo */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl bg-gradient-to-r from-indigo-500/40 via-sky-500/40 to-fuchsia-500/40"
            animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
          />

          {/* Logo principal */}
          <motion.img
            src="/assets/logo_blanco.png"
            alt="AIntegra Logo"
            className="relative h-28 md:h-36 lg:h-44 z-10 drop-shadow-[0_0_35px_rgba(147,197,253,0.55)]"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
        </motion.div>

        {/* Sub-texto bajo el logo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-neutral-400 mt-2 tracking-wide"
        >
          powered by <span className="text-sky-400 font-medium">AI</span> • designed for{" "}
          <span className="text-fuchsia-400 font-medium">accessibility</span>
        </motion.p>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300"
        >
          <span>⚡ {t.hero.eyebrow}</span>
        </motion.p>

        {/* Título con gradiente */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent leading-tight"
        >
          {t.hero.title}
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-3xl text-neutral-300 text-sm sm:text-base px-4"
        >
          {t.hero.subtitle}
        </motion.p>


      </div>
    </section>
  )
}
