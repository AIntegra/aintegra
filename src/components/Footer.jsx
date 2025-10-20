import { Sparkles, Linkedin, Github, Globe, Instagram } from "lucide-react"

export default function Footer({ rights }) {
  const links = [
    { href: "https://www.instagram.com/aintegralimited?igsh=MTdsYWh3bzY3eXY3bA==", icon: Instagram, label: "Instagram" }
  ]

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-t from-neutral-950/90 via-neutral-950/70 to-transparent backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo + derechos */}
        <div className="flex items-center gap-3 text-sm text-neutral-400 text-center md:text-left">
          <div className="h-7 w-7 rounded-xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
          </div>
          <span>
            <strong className="text-white/90">AIntegra Limited</strong> © {new Date().getFullYear()} — {rights}  
            <span className="hidden sm:inline"> • React • FastAPI • Supabase • Tauri • Tailwind • Framer Motion</span>
          </span>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-3">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-200"
            >
              <l.icon className="h-4 w-4 text-white/90" />
              <span className="sr-only">{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
