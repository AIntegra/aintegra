import { Sparkles, Languages, Menu, X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"

export default function Nav({ t, lang, setLang }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const items = [
    { href: "#video", label: t.nav.video },
    { href: "#problem", label: t.nav.problem },
    { href: "#solution", label: t.nav.solution },
    { href: "#usecases", label: t.nav.usecases },
    { href: "#demo", label: t.nav.demo },
    { href: "#team", label: t.nav.team },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <motion.header
      style={{ backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.7)' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl border-b border-white/10 backdrop-blur-xl' : 'backdrop-blur-md'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo with glow */}
        <motion.a
          href="#home"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/20 grid place-items-center">
              <Sparkles className="h-5 w-5 text-fuchsia-400" />
            </div>
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">AIntegra</span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {items.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <motion.button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Languages className="h-4 w-4 group-hover:text-sky-400 transition-colors" />
            <span className="text-sm font-medium">{t.langLabel}</span>
          </motion.button>

          {/* CTA Button - visible only on desktop */}
          <motion.a
            href="#contact"
            className="hidden md:inline-flex btn btn-primary text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-4 w-4" />
            {lang === "en" ? "Get Started" : "Comenzar"}
          </motion.a>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-3">
              {items.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                className="block btn btn-primary text-center mt-4"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="h-4 w-4 inline" />
                {lang === "en" ? "Get Started" : "Comenzar"}
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
