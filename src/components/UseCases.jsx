import { motion } from "framer-motion"
import { Building2, GraduationCap, Users, Home } from "lucide-react"

export default function UseCases({ t }) {
  // Assign unique colors to each use case
  const themes = [
    { gradient: "from-blue-500 to-cyan-500", icon: Building2, bgGlow: "bg-blue-500/10" },
    { gradient: "from-purple-500 to-pink-500", icon: GraduationCap, bgGlow: "bg-purple-500/10" },
    { gradient: "from-green-500 to-emerald-500", icon: Users, bgGlow: "bg-green-500/10" },
    { gradient: "from-orange-500 to-amber-500", icon: Home, bgGlow: "bg-orange-500/10" },
  ]

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
          {t.usecases.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Transforming accessibility across industries
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.usecases.items.map((u, i) => {
          const theme = themes[i % themes.length]
          const Icon = theme.icon

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card card-interactive group p-6 relative overflow-hidden"
            >
              {/* Background gradient glow */}
              <div className={`absolute inset-0 ${theme.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />

              {/* Icon */}
              <div className="relative mb-6">
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.gradient} blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${theme.gradient} bg-opacity-10 border border-white/10`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-bold text-xl mb-3 text-white group-hover:gradient-text transition-all">
                {u.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                {u.body}
              </p>

              {/* Accent corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${theme.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-3xl`} />
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
