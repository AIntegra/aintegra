import { motion } from "framer-motion"
import { Hand, Mic, Sparkles, ArrowRight } from "lucide-react"

export default function Solution({ t }) {
  const products = [
    {
      icon: Hand,
      ...t.solution.cat,
      color: "from-emerald-500 to-cyan-500",
      iconColor: "text-emerald-400",
      badge: "Hardware"
    },
    {
      icon: Mic,
      ...t.solution.kira,
      color: "from-violet-500 to-fuchsia-500",
      iconColor: "text-violet-400",
      badge: "Software"
    },
  ]

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
            background: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          {t.solution.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          Two revolutionary products working in harmony
        </p>
      </motion.div>

      {/* Product cards */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {products.map((product, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            className="card card-interactive group relative overflow-hidden p-8"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              <span className="text-xs font-medium">{product.badge}</span>
            </div>

            {/* Icon */}
            <div className="relative inline-flex mb-6">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${product.color} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${product.color} bg-opacity-10 border border-white/10`}>
                <product.icon className={`h-8 w-8 ${product.iconColor}`} />
              </div>
            </div>

            {/* Product name and tagline */}
            <div className="mb-4">
              <h3 className="font-bold text-3xl mb-1 text-white group-hover:gradient-text transition-all">
                {product.name}
              </h3>
              <p className="text-sm text-neutral-500 font-medium">{product.tagline}</p>
            </div>

            {/* Subtitle */}
            <p className="text-lg font-semibold text-neutral-300 mb-3">
              {product.subtitle}
            </p>

            {/* Body */}
            <p className="text-neutral-400 leading-relaxed mb-6 group-hover:text-neutral-300 transition-colors">
              {product.body}
            </p>

            {/* Benefits or Features list */}
            {product.benefits && (
              <ul className="space-y-2 mb-6">
                {product.benefits.slice(0, 3).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-neutral-400">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.color} flex-shrink-0`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <motion.button
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${product.color} bg-opacity-10 border border-white/10 text-white text-sm font-medium hover:scale-105 transition-transform`}
              whileHover={{ x: 5 }}
            >
              {product.cta}
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${product.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
          </motion.div>
        ))}
      </div>

      {/* How they work together - if ecosystem data exists */}
      {t.ecosystem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-3 gradient-text">{t.ecosystem.title}</h3>
          <p className="text-neutral-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            {t.ecosystem.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {t.ecosystem.points.map((point, i) => (
              <div key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500" />
                {point}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
