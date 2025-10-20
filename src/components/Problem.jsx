import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export default function Problem({ t }) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #dc2626 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {t.problem.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          {t.problem.subtitle}
        </p>
      </motion.div>

      {/* Problem cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.problem.bullets.map((bullet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="card group relative overflow-hidden p-6"
          >
            {/* Icon */}
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 rounded-xl bg-red-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pulse-glow" />
              <div className="relative p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>

            {/* Content */}
            <p className="text-neutral-300 leading-relaxed group-hover:text-white transition-colors">
              {bullet}
            </p>

            {/* Accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
