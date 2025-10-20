import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function FAQ({ t }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
          {t.faq.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Everything you need to know about AIntegra
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {t.faq.qas.map((qa, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card group cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            {/* Question */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <HelpCircle className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-lg text-white group-hover:gradient-text transition-all flex-1">
                  {qa.q}
                </h3>
              </div>
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronDown className="h-6 w-6 text-neutral-400" />
              </motion.div>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pl-12 pr-4 text-neutral-400 leading-relaxed">
                    {qa.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active indicator */}
            {openIndex === i && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-b-[inherit]"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
