import { motion } from "framer-motion"

export default function WhyNow({ t }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {t.whynow.title}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.whynow.cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 
                       bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                       p-6 text-neutral-200 shadow-[0_0_25px_rgba(139,92,246,0.1)]
                       backdrop-blur-sm transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
          >
            <c.icon className="h-6 w-6 mb-3 text-indigo-300" />
            <h4 className="font-medium text-lg mb-1">{c.title}</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
