import { motion } from "framer-motion"
import { Award, Trophy, Star, Medal } from "lucide-react"

export default function Awards({ t }) {
  const iconMap = [Trophy, Award, Star, Medal, Award]

  return (
    <section>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Awards list */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">Recognition</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #eab308 50%, #f97316 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              {t.awards.title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {t.awards.items.map((award, i) => {
              const Icon = iconMap[i] || Award

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card p-6 group"
                >
                  <div className="relative inline-flex mb-4">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="relative p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20">
                      <Icon className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{award.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{award.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right: Award image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="card p-8 relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Image */}
            <img
              src="/assets/premio.jpg"
              alt="Premio AIntegra"
              className="relative w-full rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />

            {/* Decorative corner */}
            <div className="absolute top-4 right-4 p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
