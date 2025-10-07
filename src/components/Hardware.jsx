import { motion } from "framer-motion"
import { Box } from "lucide-react"

export default function Hardware({ t }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {t.hardware.title}
      </h2>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.hardware.bullets.map((b, i) => (
          <motion.li
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
            {b}
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10 p-6 flex items-center gap-4 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
        <Box className="h-6 w-6 text-indigo-300" />
        <p className="text-neutral-300 text-sm">
          Product renders coming soon — images or 3D preview to be added.
        </p>
      </div>
    </section>
  )
}
