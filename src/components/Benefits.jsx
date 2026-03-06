import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function Counter({ target, prefix = "", suffix = "" }) {
    const [val, setVal] = useState(0)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (!inView) return
        const n = parseFloat(target)
        const start = performance.now()
        const dur = 1800
        const tick = (now) => {
            const t = Math.min((now - start) / dur, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            setVal(n % 1 === 0 ? Math.round(ease * n) : (ease * n).toFixed(1))
            if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
    }, [inView, target])

    return <span ref={ref}>{prefix}{val}{suffix}</span>
}

export default function Benefits({ t }) {
    return (
        <section id="benefits" className="apple-panel dark" style={{ paddingBottom: 80 }}>
            <div style={{ maxWidth: 960, width: "100%", padding: "0 24px" }}>

                <motion.div
                    className="text-center"
                    style={{ marginBottom: 48 }}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                >
                    <p className="apple-eyebrow grad-text" style={{ marginBottom: 10 }}>
                        {t.benefits.badge}
                    </p>
                    <h2 className="apple-headline" style={{ color: "white" }}>
                        {t.benefits.title}
                    </h2>
                    <p className="apple-sub light-mid" style={{ marginTop: 16 }}>
                        {t.benefits.subtitle}
                    </p>
                </motion.div>

                {/* Stat strip */}
                <motion.div
                    className="stat-strip"
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
                >
                    {t.benefits.metrics.map((m, i) => (
                        <div key={i}>
                            <div className="stat-num">
                                <Counter
                                    target={m.value}
                                    prefix={m.prefix || ""}
                                    suffix={m.suffix || ""}
                                />
                            </div>
                            <div className="stat-label">
                                <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: 4, fontSize: 14 }}>
                                    {m.label}
                                </div>
                                {m.description}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Highlight trio */}
                <div className="highlights-grid">
                    {t.benefits.highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                            style={{
                                background: "#1d1d1f", borderRadius: 20, padding: "32px 28px",
                                border: "1px solid rgba(255,255,255,0.06)"
                            }}
                        >
                            <div style={{
                                width: 10, height: 10, borderRadius: "50%",
                                background: "var(--ain-grad)",
                                marginBottom: 18
                            }} />
                            <h4 style={{ color: "white", fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
                                {h.title}
                            </h4>
                            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.65 }}>
                                {h.body}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Responsive */}
                <style>{`
          .highlights-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-top: 16px;
          }
          @media (max-width: 768px) {
            #benefits .stat-strip { border-radius: 16px; }
          }
          @media (max-width: 900px) {
            .highlights-grid { grid-template-columns: 1fr; }
          }
        `}</style>
            </div>
        </section>
    )
}
