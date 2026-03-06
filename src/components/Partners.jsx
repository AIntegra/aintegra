import { motion } from "framer-motion"

const PARTNERS = [
  {
    name: "IAtecUV",
    tagline: "Programa de Aceleración IA",
    url: "https://iatecuv.es",
    logo: "/logos/iatecuv.png",
    filter: "none",   // PNG logo — show as-is
    maxH: 52,
  },
  {
    name: "Startup Valencia",
    tagline: "Ecosistema de Startups",
    url: "https://startupvalencia.org",
    logo: "/logos/startupvalencia.svg",
    filter: "none",   // White SVG — already fits dark bg
    maxH: 48,
  },
]

export default function Partners({ t }) {
  return (
    <section style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginBottom: 56 }}
      >
        <p style={{
          fontSize: 11, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: 16
        }}>
          {t.partners.title}
        </p>
        <h2 style={{
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "white",
          letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 14
        }}>
          {t.partners.subtitle}
        </h2>
      </motion.div>

      {/* Partner cards */}
      <div className="partners-grid">
        {PARTNERS.map((p, i) => {
          return (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4, scale: 1.02 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", gap: 16, padding: "48px 32px",
                textDecoration: "none", borderRadius: 20,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "border-color 0.2s, background 0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
                e.currentTarget.style.background = "rgba(255,255,255,0.05)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
                e.currentTarget.style.background = "rgba(255,255,255,0.03)"
              }}
            >
              {/* Logo */}
              <img
                src={p.logo}
                alt={p.name}
                style={{ maxHeight: p.maxH || 48, maxWidth: 200, objectFit: "contain", filter: p.filter, opacity: 0.9 }}
              />

              {/* Name */}
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "white", fontWeight: 700, fontSize: 18, margin: "0 0 6px" }}>
                  {p.name}
                </p>
                <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, margin: 0 }}>
                  {p.tagline}
                </p>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
