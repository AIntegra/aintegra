// src/components/Integrations.jsx
import { motion } from "framer-motion"

export default function Integrations({ t }) {
  const logos = [
    { name: "Microsoft 365", img: "/logos/Microsoft365.png" },
    { name: "Chrome", img: "/logos/chrome.png" },
    { name: "Photoshop", img: "/logos/photoshop.png" },
    { name: "Notion", img: "/logos/notion.png" },
    { name: "Zoom", img: "/logos/zoom.png" },
    { name: "Visual Studio", img: "/logos/visualstudio.png" },
  ]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        {t.integrations.title}
      </h2>
      <p className="mt-2 text-neutral-300">{t.integrations.line}</p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
        {logos.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 * i }}
            className="w-40 h-32 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-neutral-900 shadow-md hover:shadow-neutral-700/40 hover:bg-white/5 transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-12 h-12 object-contain mb-3"
            />
            <p className="text-sm font-medium text-neutral-200">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
