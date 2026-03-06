import { motion } from "framer-motion"
import { AlertCircle, TrendingDown, Clock, Layers } from "lucide-react"

const ITEMS = [TrendingDown, Clock, Layers, AlertCircle]

export default function Problem({ t }) {
  return (
    <section id="problem" className="apple-panel dark" style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div style={{ maxWidth: 960, width: "100%", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: 72 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="apple-eyebrow" style={{ color: "#ff453a", marginBottom: 12 }}>
            {t.problem.badge || "Por qué importa"}
          </p>
          <h2 className="apple-headline" style={{ color: "white" }}>
            {t.problem.title}
          </h2>
          <p className="apple-sub light-mid" style={{ marginTop: 20 }}>
            {t.problem.subtitle}
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <div className="problem-grid">
          {t.problem.bullets.map((bullet, i) => {
            const Icon = ITEMS[i % ITEMS.length]
            const isLeft = i % 2 === 0
            const isTop = i < 2
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{
                  padding: "44px 40px",
                  background: "#111113",
                  borderRadius: !isLeft && !isTop ? "0 0 20px 0"
                    : !isLeft && isTop ? "0 20px 0 0"
                      : isLeft && !isTop ? "0 0 0 20px"
                        : "20px 0 0 0",
                  position: "relative", overflow: "hidden"
                }}
              >
                {/* Large number background */}
                <span style={{
                  position: "absolute", top: 16, right: 20,
                  fontSize: 80, fontWeight: 800, lineHeight: 1,
                  color: "rgba(255,255,255,0.03)",
                  userSelect: "none", pointerEvents: "none"
                }}>
                  0{i + 1}
                </span>

                {/* Icon only */}
                <div style={{ marginBottom: 24 }}>
                  <Icon size={18} color="#ff453a" strokeWidth={1.8} />
                </div>

                <p style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 16, lineHeight: 1.65,
                  margin: 0, position: "relative", zIndex: 1
                }}>
                  {bullet}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

