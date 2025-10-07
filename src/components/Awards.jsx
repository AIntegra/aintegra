import { motion } from "framer-motion"
import { Award, Users } from "lucide-react"

export default function Awards({ t }) {
  const icons = [Award, Award, Award, Award, Users]

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
      {/* Texto + tarjetas a la izquierda */}
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
          {t.awards.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-3xl">
          {t.awards.items.map((a, i) => {
            const Icon = icons[i] || Award
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
                className="rounded-2xl border border-white/10 bg-gradient-to-tr from-indigo-950/20 via-sky-950/20 to-fuchsia-950/20 p-5 hover:scale-[1.03] transition-transform"
              >
                <Icon className="h-5 w-5 text-sky-400" />
                <h4 className="mt-3 font-semibold text-white">{a.title}</h4>
                <p className="mt-1 text-sm text-neutral-400">{a.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Imagen del premio a la derecha */}
      <motion.div
        className="flex justify-center lg:justify-end flex-1"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/assets/premio.jpg"  // 🔁 Pon aquí el nombre real de tu imagen (por ejemplo: /assets/premio-gennera.png)
          alt="Premio AIntegra"
          className="w-72 md:w-96 lg:w-[480px] object-contain rounded-2xl shadow-[0_0_40px_rgba(147,197,253,0.4)]"
        />
      </motion.div>
    </div>
  )
}
