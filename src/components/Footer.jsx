import { motion } from "framer-motion"
import { Instagram, Linkedin, Mail } from "lucide-react"

const NAV_COLS = {
  es: [
    {
      heading: "Plataforma",
      links: [
        { label: "Kira", href: "#kira" },
        { label: "C.A.T.", href: "#cat" },
        { label: "Para quien", href: "#segments" },
        { label: "Resultados", href: "#benefits" },
      ],
    },
    {
      heading: "Empresa",
      links: [
        { label: "El Problema", href: "#problem" },
        { label: "FAQ", href: "#faq" },
        { label: "Solicitar Demo", href: "#contact" },
      ],
    },
  ],
  en: [
    {
      heading: "Platform",
      links: [
        { label: "Kira", href: "#kira" },
        { label: "C.A.T.", href: "#cat" },
        { label: "Who It's For", href: "#segments" },
        { label: "Results", href: "#benefits" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "The Problem", href: "#problem" },
        { label: "FAQ", href: "#faq" },
        { label: "Book a Demo", href: "#contact" },
      ],
    },
  ],
}

const SOCIALS = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/aintegralimited?igsh=MTdsYWh3bzY3eXY3bA==",
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/aintegra",
  },
  {
    label: "Email",
    icon: Mail,
    href: "mailto:hola@aintegra.ai",
  },
]

export default function Footer({ rights, onReopenCookies, lang = "es" }) {
  const isEs = lang !== "en"
  const cols = NAV_COLS[lang] ?? NAV_COLS.es

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#050508" }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
      {/* Main grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 32px 48px" }}>
        <div className="footer-grid">

          {/* Brand column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/assets/logo_blanco.webp"
                alt="AIntegra"
                style={{ height: 24, opacity: 0.85, marginBottom: 20 }}
              />
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.4)", maxWidth: 320 }}>
                {isEs
                  ? "Integramos inteligencia artificial y hardware adaptativo para transformar como las organizaciones interactuan con la tecnologia."
                  : "We integrate artificial intelligence and adaptive hardware to transform how organisations interact with technology."}
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.45)", transition: "all 0.18s ease", cursor: "pointer"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.15)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"; e.currentTarget.style.color = "#a78bfa" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)" }}
                  >
                    <s.icon size={15} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Nav columns */}
          {cols.map((col, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + ci * 0.08 }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: 20 }}>
                {col.heading}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "white"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "20px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
        }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0 }}>
            {"\u00A9"} {new Date().getFullYear()} AIntegra Limited. {rights}
          </p>

          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {(isEs ? ["Privacidad", "Terminos"] : ["Privacy", "Terms"]).map((item) => (
              <a
                key={item}
                href="#"
                style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
              >
                {item}
              </a>
            ))}
            {onReopenCookies && (
              <button
                onClick={onReopenCookies}
                style={{
                  fontSize: 12, color: "rgba(255,255,255,0.25)", background: "none",
                  border: "none", cursor: "pointer", padding: 0, transition: "color 0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
              >
                {isEs ? "Gestionar cookies" : "Manage cookies"}
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
