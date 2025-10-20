import { motion } from "framer-motion"
import { Rocket, Sparkles, Zap } from "lucide-react"

export default function Hero({ t }) {
  return (
    <section className="relative overflow-hidden text-center min-h-screen flex items-center">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(244, 114, 182, 0.18) 0%, transparent 50%)
            `
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)",
            filter: "blur(40px)"
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(244, 114, 182, 0.12), transparent 70%)",
            filter: "blur(50px)"
          }}
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Logo section with massive glow */}
        <motion.div
          className="relative flex justify-center items-center mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Multi-layered glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.3), transparent 70%)",
              filter: "blur(60px)"
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(244, 114, 182, 0.3), transparent 60%)",
              filter: "blur(40px)"
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Logo - 40% bigger */}
          <motion.img
            src="/assets/logo_blanco.webp"
            alt="AIntegra Logo"
            className="relative h-40 md:h-52 lg:h-64 z-10"
            style={{
              filter: "drop-shadow(0 0 50px rgba(147, 197, 253, 0.6))"
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
        </motion.div>

        {/* Tagline badges */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sm font-medium">powered by <span className="gradient-text-accent">AI</span></span>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-fuchsia-400" />
            <span className="text-sm font-medium">designed for <span className="gradient-text">accessibility</span></span>
          </motion.div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm md:text-base text-neutral-400 tracking-wide mb-6 uppercase font-medium"
        >
          ⚡ {t.hero.eyebrow}
        </motion.p>

        {/* Hero title - MASSIVE and bold */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8"
          style={{
            background: "linear-gradient(135deg, #818cf8 0%, #38bdf8 30%, #c084fc 60%, #f472b6 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 80px rgba(99, 102, 241, 0.3)"
          }}
        >
          {t.hero.title}
        </motion.h1>

        {/* Subtitle - larger and more prominent */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl text-neutral-300 leading-relaxed px-4"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTA buttons - Premium style */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#contact"
            className="btn btn-primary text-base px-8 py-4 hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="w-5 h-5" />
            {t.hero.cta1}
          </motion.a>

          <motion.a
            href="#contact"
            className="btn btn-outline text-base px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.hero.cta2}
          </motion.a>
        </motion.div>

        {/* Floating feature cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Sparkles, title: "AI-Powered", desc: "Edge intelligence" },
            { icon: Zap, title: "Lightning Fast", desc: "<5ms latency" },
            { icon: Rocket, title: "EAA 2025 Ready", desc: "100% compliant" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="card card-interactive p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <feature.icon className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
              <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-neutral-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
