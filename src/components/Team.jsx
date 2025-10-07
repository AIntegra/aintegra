import { motion } from "framer-motion"
import { Linkedin, Globe } from "lucide-react"

export default function Team({ t }) {
  const photos = {
    "Nerea Panadero": "/team/nerea.jpg",
    "Sergio Sabater": "/team/sergio.jpg",
  }

  // Enlaces personalizados
  const links = {
    "Nerea Panadero": [
      { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/nerea-panadero-alfonso-959675372/" },
    ],
    "Sergio Sabater": [
      { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/sergio-sabater-ruiz-562753268" },
      { type: "portfolio", label: "Portfolio", url: "https://sergiosabater.vercel.app/" },
    ],
  }

  const roles = {
    "Nerea Panadero": "CTO • Ingeniería e IA",
    "Sergio Sabater": "CEO • Dirección e Innovación",
  }

  return (
    <div className="relative">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center">
        {t.team.title}
      </h2>

      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
        Meet the people behind AIntegra — combining engineering, AI, and accessibility.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {t.team.people.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 * i }}
            className="relative w-80 rounded-3xl bg-gradient-to-tr from-[#1e1b4b]/60 via-[#0f172a]/70 to-[#312e81]/60 p-[1px] hover:from-indigo-500/50 hover:to-fuchsia-500/40 transition-all duration-500"
          >
            <div className="relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col items-center text-center transition-all duration-500 hover:bg-white/10 hover:scale-[1.02]">
              
              {/* Foto */}
              <div className="relative h-28 w-28 mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-400/30 via-sky-400/20 to-fuchsia-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={photos[p.name]}
                  alt={p.name}
                  className="rounded-full object-cover w-full h-full border border-white/20 shadow-xl"
                />
              </div>

              {/* Nombre y rol */}
              <div>
                <h4 className="font-semibold text-lg text-white">{p.name}</h4>
                <p className="text-sm text-neutral-300 mt-1">{roles[p.name]}</p>
              </div>

              {/* Botones */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {links[p.name]?.map((link, idx) => {
                  const Icon = link.type === "linkedin" ? Linkedin : Globe
                  const baseColor =
                    link.type === "linkedin"
                      ? "border-[#0A66C2]/40 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]"
                      : "border-white/20 bg-white/5 hover:bg-white/10 text-neutral-200"

                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${baseColor}`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
