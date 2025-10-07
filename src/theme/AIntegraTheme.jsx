// src/theme/AIntegraTheme.jsx
import { motion } from "framer-motion"

export function AIntegraBackground() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10 blur-3xl"
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
    />
  )
}

export function SectionWrapper({ children }) {
  return (
    <section className="relative py-20 border-t border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition">
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  )
}

export function Title({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent mb-6 text-center">
      {children}
    </h2>
  )
}

export function Button({ children, href, variant = "solid" }) {
  const base = "inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300"
  const styles = {
    solid: "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90 shadow-lg",
    outline: "border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-200",
  }

  return <a href={href} className={`${base} ${styles[variant]}`}>{children}</a>
}
