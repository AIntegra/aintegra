import { motion } from "framer-motion"
import { Mic, Hand, Eye, MessageCircle, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Demo({ t }) {
  const [activeDemo, setActiveDemo] = useState(0)

  const demos = t.commands.map((c, i) => ({
    ...c,
    color: i % 4 === 0 ? "from-blue-500 to-cyan-500" :
      i % 4 === 1 ? "from-purple-500 to-pink-500" :
        i % 4 === 2 ? "from-green-500 to-emerald-500" :
          "from-orange-500 to-amber-500"
  }))

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
          {t.demo.title}
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          {t.demo.subtitle}
        </p>
      </motion.div>

      {/* Interactive demo cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {demos.map((cmd, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onMouseEnter={() => setActiveDemo(i)}
            className={`card card-interactive p-6 cursor-pointer transition-all duration-500 ${activeDemo === i ? 'ring-2 ring-white/20 scale-105' : ''
              }`}
          >
            {/* Command icon */}
            <div className="relative mb-4">
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cmd.color} blur-xl opacity-0 hover:opacity-60 transition-opacity duration-500`} />
              <div className={`relative p-3 rounded-xl bg-gradient-to-br ${cmd.color} bg-opacity-10 border border-white/10 inline-flex`}>
                <cmd.icon className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Command text */}
            <p className="text-neutral-300 leading-relaxed group-hover:text-white transition-colors font-mono text-sm">
              "{cmd.text}"
            </p>

            {/* Activation indicator */}
            {activeDemo === i && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${cmd.color} rounded-b-[inherit]`}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Live demo visualization (optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
      >
        <p className="text-neutral-400 mb-4">Try saying:</p>
        <p className={`text-2xl font-bold bg-gradient-to-r ${demos[activeDemo].color} bg-clip-text text-transparent`}>
          "{demos[activeDemo].text}"
        </p>
      </motion.div>
    </section>
  )
}
