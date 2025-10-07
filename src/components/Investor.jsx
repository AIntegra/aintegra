import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export default function Investor({ t }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {t.investor.title}
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {t.investor.points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 
                       bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                       p-6 text-neutral-200 shadow-[0_0_25px_rgba(139,92,246,0.1)]
                       backdrop-blur-sm"
          >
            {p}
          </motion.div>
        ))}
      </div>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-5 py-3 text-sm font-medium shadow-lg hover:opacity-90 transition"
      >
        <FileText className="h-4 w-4" /> {t.investor.cta}
      </a>
    </section>
  )
}
