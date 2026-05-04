import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"



// CATY and CAT use the AIntegra blue palette with Apple-style glass depth.

export default function Solution({ t }) {
  const caty = t.solution.caty
  const cat = t.solution.cat

  return (
    <>
      {/* ── CATY PANEL — dark / purple ── */}
      <section
        id="caty"
        className="apple-panel dark"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(62,137,187,0.3) 0%, rgba(0,11,51,0.94) 60%)",
          color: "white"
        }}
      >
        <div style={{ maxWidth: 960, width: "100%", padding: "0 24px", textAlign: "center" }}>

          <motion.p
            className="apple-eyebrow grad-text"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            {caty.name} — {caty.tagline}
          </motion.p>

          <motion.h2
            className="apple-headline"
            style={{ color: "white", marginTop: 8 }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            {caty.subtitle}
          </motion.h2>

          <motion.p
            className="apple-sub light-mid"
            style={{ marginTop: 20 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}
          >
            {caty.body}
          </motion.p>

          <motion.div
            className="apple-cta-row"
            style={{ marginTop: 36 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a href="#contact" className="apple-btn apple-btn-blue">{caty.cta}</a>
            <a href="#cat" className="apple-btn apple-btn-outline-white">
              {t.solution.cat.name} <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 40 }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }}
          >
            {caty.benefits.map((b, i) => (
              <span key={i} style={{
                background: "rgba(220,234,240,0.08)", border: "1px solid rgba(135,173,198,0.22)",
                borderRadius: 980, padding: "8px 18px", fontSize: 13, color: "rgba(220,234,240,0.82)"
              }}>
                {b}
              </span>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── CAT PANEL — DARK with emerald tones ── */}
      <section
        id="cat"
        className="apple-panel dark"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(135,173,198,0.22) 0%, rgba(11,54,95,0.92) 58%, #000B33 100%)",
          color: "white"
        }}
      >
        <div style={{ maxWidth: 960, width: "100%", padding: "0 24px", textAlign: "center" }}>

          <motion.p
            className="apple-eyebrow"
            style={{
              marginBottom: 8,
              background: "linear-gradient(135deg, #87ADC6, #3E89BB)",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            {cat.name} — {cat.tagline}
          </motion.p>

          <motion.h2
            className="apple-headline"
            style={{ color: "white", marginTop: 8 }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            {cat.subtitle}
          </motion.h2>

          <motion.p
            className="apple-sub light-mid"
            style={{ marginTop: 20 }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.25 }}
          >
            {cat.body}
          </motion.p>

          <motion.div
            className="apple-cta-row"
            style={{ marginTop: 36 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a
              href="#contact"
              className="apple-btn"
              style={{ background: "linear-gradient(135deg, #0B365F, #165F97 55%, #3E89BB)", color: "white" }}
            >
              {cat.cta}
            </a>
            <a href="#pricing" className="apple-btn apple-btn-outline-white">
              Planes <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Feature pills — emerald */}
          <motion.div
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 40 }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }}
          >
            {cat.benefits.map((b, i) => (
              <span key={i} style={{
                background: "rgba(220,234,240,0.08)", border: "1px solid rgba(62,137,187,0.26)",
                borderRadius: 980, padding: "8px 18px", fontSize: 13, color: "rgba(220,234,240,0.82)"
              }}>
                {b}
              </span>
            ))}
          </motion.div>

          {/* CAT two-view product shot */}
          <motion.div
            style={{ position: "relative", marginTop: 72 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.3 }}
          >
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 50%, rgba(62,137,187,0.32), transparent 65%)",
              filter: "blur(60px)", pointerEvents: "none"
            }} />

            <div className="cat-grid" style={{ position: "relative", zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
              >
                <img src="/assets/cat_front.png" alt="CAT Trackpad — Vista superior"
                  style={{
                    width: "100%", objectFit: "contain", mixBlendMode: "screen",
                    filter: "drop-shadow(0 20px 40px rgba(62,137,187,0.34))"
                  }} />
                <span style={{
                  fontSize: 12, fontWeight: 500, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)"
                }}>
                  Vista superior
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.55 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
              >
                <img src="/assets/cat_back.png" alt="CAT Trackpad — Vista trasera"
                  style={{
                    width: "100%", objectFit: "contain", mixBlendMode: "screen",
                    filter: "drop-shadow(0 20px 40px rgba(62,137,187,0.34))"
                  }} />
                <span style={{
                  fontSize: 12, fontWeight: 500, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)"
                }}>
                  Vista trasera
                </span>
              </motion.div>
            </div>

            <motion.div style={{ textAlign: "center", marginTop: 28 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.7 }}
            >
              <p style={{
                fontSize: 13, color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500
              }}>
                CAT by AIntegra Limited
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
