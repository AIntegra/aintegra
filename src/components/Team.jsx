import { motion } from "framer-motion"
import { Linkedin, Globe, Mail, Award } from "lucide-react"

export default function Team({ t }) {
  const photos = {
    "Nerea Panadero": "/team/nerea.jpg",
    "Sergio Sabater": "/team/sergio.jpg",
  }

  const links = {
    "Nerea Panadero": [
      { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/nerea-panadero-alfonso-959675372/" },
    ],
    "Sergio Sabater": [
      { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/sergio-sabater-ruiz-562753268" },
      { type: "portfolio", label: "Portfolio", url: "https://sergiosaba12.github.io/portfolio/" },
    ],
  }

  const roles = {
    "Nerea Panadero": "CTO • Ingeniería e IA",
    "Sergio Sabater": "CEO • Dirección e Innovación",
  }

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
          {t.team.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          Meet the minds behind AIntegra — combining engineering, AI, and accessibility
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {t.team.people.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative group"
          >
            <div className="card card-interactive p-8 text-center">
              {/* Profile photo with enhanced glow */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-fuchsia-500 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 scale-110" />
                <div className="relative">
                  <img
                    src={photos[p.name]}
                    alt={p.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-2xl relative z-10"
                  />
                  {/* Ring animation on hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/0 group-hover:border-indigo-500/50 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>

              {/* Name and role */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  {p.name}
                </h3>
                <p className="text-neutral-400 font-medium">{roles[p.name]}</p>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap justify-center gap-3">
                {links[p.name]?.map((link, idx) => {
                  const Icon = link.type === "linkedin" ? Linkedin : Globe
                  const colorClass = link.type === "linkedin"
                    ? "bg-[#0A66C2]/10 border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50"
                    : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/50"

                  return (
                    <motion.a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ${colorClass}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </motion.a>
                  )
                })}
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-500/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-fuchsia-500/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
