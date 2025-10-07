import { motion } from "framer-motion"

export default function FAQ({ t }) {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {t.faq.title}
      </h2>

      <div className="space-y-4">
        {t.faq.qas.map((qa, i) => (
          <motion.details
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 
                       bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                       p-5 text-neutral-200 shadow-[0_0_25px_rgba(139,92,246,0.1)]
                       backdrop-blur-sm cursor-pointer"
          >
            <summary className="font-medium text-lg hover:text-white transition">
              {qa.q}
            </summary>
            <p className="mt-2 text-sm text-neutral-300">{qa.a}</p>
          </motion.details>
        ))}
      </div>
    </section>
  )
}
