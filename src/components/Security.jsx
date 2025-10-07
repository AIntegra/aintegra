import { motion } from "framer-motion"
import { Lock } from "lucide-react"

export default function Security({ t }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {t.security.title}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {t.security.lines.map((l, i) => (
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
            {l}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
        <Lock className="h-4 w-4" /> WCAG 2.2 • EN 301 549 • GDPR
      </div>
    </section>
  )
}
