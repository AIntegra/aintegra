import { motion } from "framer-motion"

/**
 * FeatureGrid
 *
 * variant="dark"  – original glassmorphic dark cards with a Lucide icon
 * variant="emoji" – dark AIntegra-style cards with large emoji + gradient accent
 *                   (replaces the old "light" variant)
 */
export default function FeatureGrid({ items, title, subtitle, badge, variant = "dark" }) {
  if (variant === "emoji") {
    const ACCENTS = [
      { grad: "linear-gradient(135deg,#6366f1,#a855f7)", glow: "rgba(99,102,241,0.25)", border: "rgba(99,102,241,0.2)" },
      { grad: "linear-gradient(135deg,#a855f7,#ec4899)", glow: "rgba(168,85,247,0.25)", border: "rgba(168,85,247,0.2)" },
      { grad: "linear-gradient(135deg,#3b82f6,#6366f1)", glow: "rgba(59,130,246,0.25)", border: "rgba(59,130,246,0.2)" },
      { grad: "linear-gradient(135deg,#06b6d4,#3b82f6)", glow: "rgba(6,182,212,0.25)", border: "rgba(6,182,212,0.2)" },
      { grad: "linear-gradient(135deg,#8b5cf6,#06b6d4)", glow: "rgba(139,92,246,0.25)", border: "rgba(139,92,246,0.2)" },
      { grad: "linear-gradient(135deg,#ec4899,#8b5cf6)", glow: "rgba(236,72,153,0.25)", border: "rgba(236,72,153,0.2)" },
    ]

    return (
      <section
        className="apple-panel dark"
        id="features"
        style={{ paddingTop: 100, paddingBottom: 100 }}
      >
        <div style={{ maxWidth: 1040, width: "100%", padding: "0 24px" }}>

          {/* Header */}
          <motion.div
            style={{ textAlign: "center", marginBottom: 64 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {badge && (
              <p className="apple-eyebrow grad-text" style={{ marginBottom: 10 }}>
                {badge}
              </p>
            )}
            {title && (
              <h2 className="apple-headline" style={{ color: "white" }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="apple-sub light-mid" style={{ marginTop: 16 }}>
                {subtitle}
              </p>
            )}
          </motion.div>

          <div className="feature-grid">
            {items.map((f, i) => {
              const acc = ACCENTS[i % ACCENTS.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  whileHover={{ y: -4, boxShadow: `0 16px 48px ${acc.glow}` }}
                  style={{
                    background: "#111113",
                    borderRadius: 20,
                    padding: "36px 28px 32px",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "default",
                    transition: "box-shadow 0.25s, transform 0.25s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Subtle gradient accent at top */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: 2,
                      background: acc.grad,
                      opacity: 0.9,
                    }}
                  />

                  {/* Emoji in a pill bubble */}
                  <div
                    style={{
                      width: 52, height: 52,
                      borderRadius: 16,
                      background: `rgba(255,255,255,0.05)`,
                      border: `1px solid ${acc.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      marginBottom: 20,
                      boxShadow: `0 0 20px ${acc.glow}`,
                    }}
                    role="img"
                    aria-label={f.title}
                  >
                    {f.emoji}
                  </div>

                  <h4
                    style={{
                      fontSize: 17,
                      fontWeight: 600,
                      color: "white",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {f.title}
                  </h4>

                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {f.body}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Responsive */}
          <style>{`
            @media (max-width: 900px) {
              #features > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
            }
            @media (max-width: 560px) {
              #features > div > div:last-child { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>
    )
  }

  // ── Dark variant (original) ──────────────────────────────────────
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-8">
        {title}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10
                       bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10
                       p-6 text-neutral-200 shadow-[0_0_25px_rgba(139,92,246,0.1)]
                       backdrop-blur-sm transition hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]"
          >
            <f.icon className="h-6 w-6 mb-3 text-indigo-300" />
            <h4 className="font-medium text-lg mb-1">{f.title}</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
