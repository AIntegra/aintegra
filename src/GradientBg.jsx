import { motion } from "framer-motion"

export default function GradientBg() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      animate={{
        background: [
          "radial-gradient(800px 500px at 20% 10%, rgba(99,102,241,0.15), transparent 60%)",
          "radial-gradient(800px 500px at 80% 20%, rgba(56,189,248,0.15), transparent 60%)",
          "radial-gradient(800px 500px at 50% 80%, rgba(236,72,153,0.15), transparent 60%)",
        ],
      }}
      transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}
