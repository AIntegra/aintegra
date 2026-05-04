import { motion } from "framer-motion"
import { Building2, Landmark, User2, Check } from "lucide-react"

const ICONS = [Building2, Landmark, User2]
const BENTO_STYLES = [
    { background: "#000B33", color: "white", accent: "rgba(99,102,241,1)", accentBg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.2)" },
    { background: "#0B365F", color: "white", accent: "rgba(167,139,250,1)", accentBg: "rgba(135,173,198,0.14)", border: "rgba(167,139,250,0.2)" },
    { background: "#f5f5f7", color: "#0B365F", accent: "#165F97", accentBg: "rgba(5,150,105,0.1)", border: "rgba(5,150,105,0.2)" },
]

export default function Segments({ t }) {
    return (
        <section id="segments" className="apple-panel dark" style={{ paddingBottom: 80 }}>
            <div style={{ maxWidth: 1200, width: "100%", padding: "0 16px" }}>

                <motion.div
                    className="text-center"
                    style={{ marginBottom: 56 }}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                >
                    <p className="apple-eyebrow grad-text" style={{ marginBottom: 10 }}>
                        {t.segments.badge}
                    </p>
                    <h2 className="apple-headline" style={{ color: "white" }}>
                        {t.segments.title}
                    </h2>
                    <p className="apple-sub light-mid" style={{ marginTop: 16 }}>
                        {t.segments.subtitle}
                    </p>
                </motion.div>

                {/* Bento grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {t.segments.items.map((seg, i) => {
                        const Icon = ICONS[i]
                        const style = BENTO_STYLES[i]
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 32 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.12 }}
                                style={{
                                    background: style.background,
                                    borderRadius: 24,
                                    padding: "40px 32px",
                                    color: style.color,
                                    border: `1px solid rgba(255,255,255,0.06)`,
                                    display: "flex", flexDirection: "column"
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: 48, height: 48, borderRadius: 14,
                                    background: style.accentBg, border: `1px solid ${style.border}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: 20
                                }}>
                                    <Icon size={24} color={style.accent} />
                                </div>

                                {/* Badge */}
                                <span style={{
                                    display: "inline-block",
                                    padding: "3px 10px", borderRadius: 980,
                                    background: style.accentBg, border: `1px solid ${style.border}`,
                                    color: style.accent, fontSize: 11, fontWeight: 600,
                                    letterSpacing: "0.04em", textTransform: "uppercase",
                                    marginBottom: 14, alignSelf: "flex-start"
                                }}>
                                    {seg.badge}
                                </span>

                                {/* Title */}
                                <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}>
                                    {seg.title}
                                </h3>

                                {/* Body */}
                                <p style={{ fontSize: 14, lineHeight: 1.65, opacity: 0.7, marginBottom: 24 }}>
                                    {seg.body}
                                </p>

                                {/* Features */}
                                <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
                                    {seg.features.map((f, fi) => (
                                        <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, opacity: 0.75 }}>
                                            <Check size={14} style={{ marginTop: 2, flexShrink: 0, color: style.accent }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Responsive note — stack on mobile */}
                <style>{`
          @media (max-width: 900px) {
            #segments .bento-seg { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </div>
        </section>
    )
}
