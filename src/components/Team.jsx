import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function Team({ t }) {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const itemWidth = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }

  // Use framer-motion to create a parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Move the background slightly based on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  // Fallback images (placeholders) until real event photos are added in App.jsx
  const images = t.team?.images || [
    "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
  ]

  if (!t.team) return null

  return (
    <section ref={containerRef} id="team" className="apple-panel dark" style={{ position: "relative", overflow: "hidden" }}>

      {/* Decorative large circle in background */}
      <motion.div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(22,95,151,0.05) 0%, transparent 60%)",
          y: bgY,
          pointerEvents: "none"
        }}
      />

      <div className="flex flex-col lg:flex-row gap-16 items-center" style={{ padding: "0 24px", width: "100%", maxWidth: 1200, margin: "0 auto" }}>

        {/* Left Area: Text and Roles */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ flex: 1, textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            {t.team.badge}
          </div>

          <h2 className="apple-headline" style={{ marginBottom: 20 }}>
            {t.team.title}
          </h2>

          <p className="apple-sub mid" style={{ marginBottom: 40, fontSize: 18, lineHeight: 1.6 }}>
            {t.team.subtitle}
          </p>

          {/* Founders Names & Roles stacked horizontally */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", width: "100%", marginTop: 20, justifyContent: "center" }}>
            {t.team.founders?.map((founder, idx) => (
              <div key={idx} style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)", minWidth: 220, textAlign: "center" }}>
                <h4 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#fff" }}>{founder.name}</h4>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#87ADC6", fontWeight: "500" }}>{founder.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Area: The Horizontal Scroll Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          style={{ flex: 1.2, width: "100%", overflow: "hidden", position: "relative" }}
        >
          {/* Scroll instruction for desktop */}
          <div style={{ position: "absolute", top: -32, right: 0, fontSize: 13, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.1)" }}>
            <span>{images.length > 0 ? `${activeIndex + 1} / ${images.length}` : ""} {t.team.swipeHint || "Desliza para ver más"}</span>
            <ChevronRight size={14} />
          </div>

          <div
            className="carousel-container"
            onScroll={handleScroll}
            style={{
              display: "flex",
              gap: 24,
              overflowX: "auto",
              paddingBottom: 24,
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none", // Hide scrollbar Firefox
              scrollBehavior: "smooth"
            }}
          >
            {/* Inject horizontal scrollbar hiding for webkit as an inline style block */}
            <style>{`
              .carousel-container::-webkit-scrollbar { display: none; }
            `}</style>

            {images.map((src, index) => (
              <div
                key={index}
                style={{
                  minWidth: "100%", // Obliga a ocupar todo el espacio del scroll visible, "de una en una"
                  aspectRatio: "3/4",
                  borderRadius: 24,
                  overflow: "hidden",
                  scrollSnapAlign: "center",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                }}
              >
                <img
                  src={src}
                  alt={`AIntegra Event ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Se hace cover pero ahora el hueco es vertical
                    objectPosition: "top", // Mantiene el enfoque arriba para no cortar las caras
                    pointerEvents: "none"
                  }}
                />
                {/* Subtle dark gradient overlay at bottom for premium feel */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0, height: "40%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                  pointerEvents: "none"
                }} />
              </div>
            ))}
          </div>

          {/* Carousel Indicators (Dots) */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: -4, marginBottom: 16 }}>
            {images.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === activeIndex ? "rgba(62,137,187, 0.9)" : "rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  boxShadow: i === activeIndex ? "0 0 8px rgba(62,137,187, 0.5)" : "none"
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
