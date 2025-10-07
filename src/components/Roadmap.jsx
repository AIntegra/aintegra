import { motion } from "framer-motion"

export default function Roadmap({ items, title }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {title}
      </h2>

      <ol className="relative border-l border-white/10 ml-2 mt-6 pl-6">
        {items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="mb-8 rounded-2xl border border-white/10 
                       bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                       p-6 text-neutral-200 shadow-[0_0_25px_rgba(139,92,246,0.1)]
                       backdrop-blur-sm"
          >
            <div className="absolute -left-3 top-6 h-2.5 w-2.5 rounded-full bg-indigo-400" />
            <p className="text-xs text-neutral-300">{it.q}</p>
            <h4 className="font-medium text-lg mt-1">{it.title}</h4>
            <p className="text-sm text-neutral-300 mt-1">{it.body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
