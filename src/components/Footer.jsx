import { motion } from "framer-motion"
import { Sparkles, Instagram, Heart } from "lucide-react"

export default function Footer({ rights }) {
  const links = [
    { href: "https://www.instagram.com/aintegralimited?igsh=MTdsYWh3bzY3eXY3bA==", icon: Instagram, label: "Instagram" }
  ]

  const techStack = ["React", "Vite", "Tailwind", "Framer Motion", "FastAPI", "Supabase"]

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-transparent to-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 blur-lg opacity-50" />
                <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/20 grid place-items-center">
                  <Sparkles className="h-5 w-5 text-fuchsia-400" />
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">AIntegra</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Transforming human-computer interaction through AI-powered accessibility solutions.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Built With</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Connect</h3>
            <div className="flex items-center gap-3">
              {links.map((l, i) => (
                <motion.a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <l.icon className="h-5 w-5 text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="sr-only">{l.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} <strong className="text-white">AIntegra Limited</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">{rights}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for accessibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    </footer>
  )
}
