import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"

const NAV_ITEMS = [
  { href: "#problem", labelEs: "El Problema", labelEn: "Problem" },
  { href: "#caty", labelEs: "CATY", labelEn: "CATY" },
  { href: "#cat", labelEs: "CAT", labelEn: "CAT" },
  { href: "#pricing", labelEs: "Planes", labelEn: "Plans" },
  { href: "#benefits", labelEs: "Resultados", labelEn: "Results" },
]

export default function Nav({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobile] = useState(false)
  const [activeSection, setActive] = useState("")

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Active section detection */
  useEffect(() => {
    const observers = []
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(href) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const label = (item) => lang === "en" ? item.labelEn : item.labelEs
  const ctaLabel = lang === "en" ? "Book Demo" : "Solicitar Demo"

  return (
    <>
      <style>{`
        @media (max-width: 992px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cta { display: none !important; }
          .nav-mobile-burger { display: flex !important; }
          .nav-lang-btn { padding: 4px 6px !important; font-size: 11px !important; }
        }
        @media (min-width: 993px) {
          .nav-mobile-burger { display: none !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? "0 24px" : "8px 24px",
          transition: "padding 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            minHeight: 54,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            borderRadius: scrolled ? 16 : 0,
            padding: "8px 20px",
            transition: "all 0.35s ease",
            background: scrolled
              ? "rgba(0, 11, 51, 0.78)"
              : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            border: scrolled
              ? "1px solid rgba(220,234,240,0.16)"
              : "1px solid transparent",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0,11,51,0.42), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "none",
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
            <img
              src="/assets/logo_blanco.webp"
              alt="AIntegra"
              style={{ height: 20, opacity: 0.9 }}
            />
            <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "0.01em" }}>
              AIntegra Limited
            </span>
          </a>

          <nav style={{
            display: "flex", alignItems: "center", gap: 4,
            position: "absolute", left: "50%", transform: "translateX(-50%)"
          }}
            className="nav-desktop-links"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    position: "relative",
                    padding: "6px 14px",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "white" : "rgba(220,234,240,0.62)",
                    textDecoration: "none",
                    transition: "color 0.15s, background 0.15s",
                    background: isActive ? "rgba(220,234,240,0.11)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.9)"
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.55)"
                  }}
                >
                  {label(item)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: "absolute", inset: 0, borderRadius: 10,
                        background: "rgba(220,234,240,0.11)",
                        zIndex: -1
                      }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 1.5vw, 12px)", flexShrink: 0 }}>
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              style={{
                fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)",
                background: "none", border: "none", cursor: "pointer",
                padding: "4px 8px", borderRadius: 6, letterSpacing: "0.04em",
                transition: "color 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>

            {/* CTA — desktop */}
            <motion.a
              href="#contact"
              className="nav-desktop-cta"
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "7px 16px", borderRadius: 100,
                background: "rgba(220,234,240,0.08)",
                border: "1px solid rgba(220,234,240,0.18)",
                color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: 500,
                textDecoration: "none", transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "white"
                e.currentTarget.style.color = "black"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                e.currentTarget.style.color = "rgba(255,255,255,0.9)"
              }}
            >
              {ctaLabel} <ChevronRight size={13} />
            </motion.a>

            {/* Mobile burger */}
            <button
              onClick={() => setMobile(!mobileOpen)}
              className="nav-mobile-burger"
              style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "white"
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 70, left: 16, right: 16, zIndex: 99,
              background: "rgba(10,10,16,0.97)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 20, overflow: "hidden",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
            }}
          >
            <div style={{ padding: "12px 8px" }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobile(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "13px 16px", borderRadius: 12, textDecoration: "none",
                    color: activeSection === item.href ? "white" : "rgba(255,255,255,0.6)",
                    background: activeSection === item.href ? "rgba(22,95,151,0.12)" : "transparent",
                    fontSize: 15, fontWeight: activeSection === item.href ? 600 : 400,
                    transition: "all 0.15s"
                  }}
                >
                  {label(item)}
                  <ChevronRight size={14} style={{ opacity: 0.35 }} />
                </motion.a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <a
                href="#contact"
                onClick={() => setMobile(false)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "13px 20px", borderRadius: 100,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.9)", fontWeight: 500, fontSize: 15, textDecoration: "none",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "white"
                  e.currentTarget.style.color = "black"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)"
                }}
              >
                {ctaLabel} <ChevronRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
