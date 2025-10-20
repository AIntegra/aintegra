import { motion } from "framer-motion"
import { Handshake } from "lucide-react"

export default function Partners({ t }) {
  const partners = [
    {
      name: "Universitat de València",
      logo: "/logos/uv.png",
      url: "https://www.uv.es/",
    },
    {
      name: "UVemprén",
      logo: "/logos/uvempren.jpeg",
      url: "https://www.uv.es/uv-emprende/es/uvempren.html",
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
          <Handshake className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">Trusted Partnerships</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
          {t.partners.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          {t.partners.subtitle}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {partners.map((partner, i) => (
          <motion.a
            key={i}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="card p-12 flex items-center justify-center group relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-indigo-500/0 to-fuchsia-500/0 group-hover:from-purple-500/10 group-hover:via-indigo-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500" />

            {/* Logo */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="relative z-10 max-h-24 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
            />

            {/* Partner label */}
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-neutral-400">{partner.name}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
