import { Sparkles, Rocket, Languages, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function Nav({ t, lang, setLang }) {
  const [open, setOpen] = useState(false)
  const items = [
    { href: "#problem", label: t.nav.problem },
    { href: "#solution", label: t.nav.solution },
    { href: "#features", label: t.nav.features },
    { href: "#whynow", label: t.nav.whynow },
    { href: "#tech", label: t.nav.tech },
    { href: "#usecases", label: t.nav.usecases },
    { href: "#integrations", label: t.nav.integrations },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-neutral-950/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
          <div className="h-7 w-7 rounded-xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
          </div>
          <span className="text-white">AIntegra</span>
        </a>

        {/* Menú desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm text-neutral-300">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="hover:text-white transition-colors">
              {i.label}
            </a>
          ))}
        </nav>

        {/* Botones */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10 transition"
          >
            <Languages className="h-4 w-4" /> {t.langLabel}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-4 py-2 text-sm font-medium shadow-lg hover:opacity-90 transition"
          >
            <Rocket className="h-4 w-4" /> {lang === "en" ? "Launch" : "Lanzar"}
          </a>

          {/* Toggle móvil */}
          <button
            className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-neutral-950/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-3"
          >
            {items.map((i) => (
              <a
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="block text-neutral-300 hover:text-white transition"
              >
                {i.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
