import { motion } from "framer-motion"

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
      url: "https://uvempren.uv.es/",
    },
    {
      name: "ONCE",
      logo: "/logos/once.png",
      url: "https://www.once.es/",
    },
    {
      name: "Grupo Inserta Empleo",
      logo: "/logos/inserta.png",
      url: "https://insertaempleo.es/",
    },
  ]

  return (
    <section
      id="partners"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-3">
        {t.partners.title}
      </h2>

      <p className="text-neutral-400 mb-10">{t.partners.subtitle}</p>

      {/* Rejilla / Carrusel */}
      <div className="flex flex-wrap md:grid md:grid-cols-4 gap-6 justify-center overflow-x-auto md:overflow-visible no-scrollbar pb-2">
        {partners.map((partner, i) => (
          <motion.a
            key={i}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="group relative flex items-center justify-center rounded-2xl border border-white/10
                       bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                       p-6 md:p-8 shadow-[0_0_25px_rgba(139,92,246,0.15)]
                       hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
                       hover:border-fuchsia-400/30 backdrop-blur-md transition-all min-w-[200px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-400/0 via-sky-400/0 to-indigo-400/0 group-hover:from-fuchsia-400/10 group-hover:via-sky-400/10 group-hover:to-indigo-400/10 rounded-2xl transition-all" />
            <img
              src={partner.logo}
              alt={partner.name}
              className="relative z-10 max-h-20 w-auto object-contain opacity-85 group-hover:opacity-100 transition"
            />
          </motion.a>
        ))}
      </div>
    </section>
  )
}
