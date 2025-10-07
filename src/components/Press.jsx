import { motion } from "framer-motion"

export default function Press({ t }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
        {t.press.title}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-white/10 
                   bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                   p-6 text-neutral-200 shadow-[0_0_25px_rgba(139,92,246,0.1)]
                   backdrop-blur-sm text-sm"
      >
        {t.press.text}
      </motion.div>
    </section>
  )
}
