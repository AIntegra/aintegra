import { motion } from "framer-motion"
import { Check, Mic, Camera, PackageCheck, Clock } from "lucide-react"

/* ─── Pricing data ────────────────────────────────────────────────────── */
const PLANS = {
    es: [
        {
            id: "kira",
            badge: "Software",
            icon: Mic,
            title: "Kira",
            tagline: "Control por voz con IA local",
            body: "Controla tu ordenador completamente con tu voz. Kira procesa todo en tu dispositivo: sin nube, sin datos enviados, sin limites.",
            priceType: "subscription",
            popular: false,
            accent: "#a78bfa",
            accentDim: "rgba(167,139,250,0.12)",
            accentBorder: "rgba(167,139,250,0.25)",
            cta: "Empezar con Kira",
            features: [
                { text: "Asistente de voz Kira (IA 100% local)" },
                { text: "Comandos personalizables ilimitados" },
                { text: "Procesamiento en el dispositivo (sin nube)" },
                { text: "Compatible con Windows y macOS" },
                { text: "Actualizaciones continuas de modelos" },
                { text: "Onboarding personalizado incluido" },
            ],
        },
        {
            id: "cat",
            badge: "Hardware",
            icon: Camera,
            title: "C.A.T.",
            tagline: "Control gestual adaptativo, sin raton",
            body: "El dispositivo C.A.T. detecta gestos faciales y corporales para manejar el ordenador sin manos. Compra unica, tuyo para siempre.",
            priceType: "onetime",
            popular: false,
            accent: "#60a5fa",
            accentDim: "rgba(96,165,250,0.10)",
            accentBorder: "rgba(96,165,250,0.25)",
            cta: "Comprar C.A.T.",
            features: [
                { text: "Dispositivo C.A.T. fisico incluido" },
                { text: "Deteccion de gestos faciales y corporales" },
                { text: "Sin raton ni teclado fisico necesario" },
                { text: "Compatible con cualquier software de voz" },
                { text: "Calibracion guiada en la primera instalacion" },
                { text: "Garantia de 2 anos" },
            ],
        },
        {
            id: "pack",
            badge: "Pack - Mejor opcion",
            icon: PackageCheck,
            title: "Kira + C.A.T.",
            tagline: "La combinacion definitiva de accesibilidad",
            body: "Voz y gestos juntos: el ecosistema de accesibilidad mas completo del mercado. Ahorra comprando el pack frente a los productos por separado.",
            priceType: "pack",
            popular: true,
            accent: "#34d399",
            accentDim: "rgba(52,211,153,0.10)",
            accentBorder: "rgba(52,211,153,0.25)",
            cta: "Pedir el Pack",
            features: [
                { text: "Todo lo incluido en Kira" },
                { text: "Dispositivo C.A.T. a precio de pack" },
                { text: "Control por voz + gestos integrado" },
                { text: "Sin raton ni teclado fisico necesario" },
                { text: "Soporte prioritario 24 / 5" },
                { text: "Ahorro vs. comprar por separado" },
            ],
        },
    ],
    en: [
        {
            id: "kira",
            badge: "Software",
            icon: Mic,
            title: "Kira",
            tagline: "On-device AI voice control",
            body: "Control your computer entirely with your voice. Kira runs fully on your device — no cloud, no data sent, no limits.",
            priceType: "subscription",
            popular: false,
            accent: "#a78bfa",
            accentDim: "rgba(167,139,250,0.12)",
            accentBorder: "rgba(167,139,250,0.25)",
            cta: "Get started with Kira",
            features: [
                { text: "Kira voice assistant (100% local AI)" },
                { text: "Unlimited custom commands" },
                { text: "On-device processing (no cloud)" },
                { text: "Windows & macOS compatible" },
                { text: "Continuous model updates" },
                { text: "Personalised onboarding included" },
            ],
        },
        {
            id: "cat",
            badge: "Hardware",
            icon: Camera,
            title: "C.A.T.",
            tagline: "Adaptive gesture control, no mouse",
            body: "The C.A.T. device detects facial and body gestures to control your computer hands-free. One-time purchase — yours forever.",
            priceType: "onetime",
            popular: false,
            accent: "#60a5fa",
            accentDim: "rgba(96,165,250,0.10)",
            accentBorder: "rgba(96,165,250,0.25)",
            cta: "Buy C.A.T.",
            features: [
                { text: "Physical C.A.T. device included" },
                { text: "Facial & body gesture detection" },
                { text: "No physical mouse or keyboard needed" },
                { text: "Compatible with any voice software" },
                { text: "Guided calibration at first setup" },
                { text: "2-year warranty" },
            ],
        },
        {
            id: "pack",
            badge: "Bundle - Best value",
            icon: PackageCheck,
            title: "Kira + C.A.T.",
            tagline: "The ultimate accessibility combination",
            body: "Voice and gestures together — the most complete accessibility ecosystem on the market. Save by choosing the bundle.",
            priceType: "pack",
            popular: true,
            accent: "#34d399",
            accentDim: "rgba(52,211,153,0.10)",
            accentBorder: "rgba(52,211,153,0.25)",
            cta: "Order the Bundle",
            features: [
                { text: "Everything in Kira" },
                { text: "C.A.T. device at bundle price" },
                { text: "Voice + gesture control integrated" },
                { text: "No physical mouse or keyboard needed" },
                { text: "Priority support 24 / 5" },
                { text: "Save vs buying separately" },
            ],
        },
    ],
}

/* ─── Component ───────────────────────────────────────────────────────── */
export default function Pricing({ lang = "es" }) {
    const plans = PLANS[lang] ?? PLANS.es
    const isEs = lang !== "en"

    return (
        <section
            id="pricing"
            style={{
                padding: "120px 24px",
                background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.12) 0%, #000 60%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header */}
            <motion.div
                style={{ textAlign: "center", marginBottom: 52, maxWidth: 620 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <p className="apple-eyebrow grad-text" style={{ marginBottom: 10 }}>
                    {isEs ? "Precios" : "Pricing"}
                </p>
                <h2 className="apple-headline" style={{ color: "white" }}>
                    {isEs ? "Elige tu plan" : "Choose your plan"}
                </h2>
                <p className="apple-sub light-mid" style={{ marginTop: 14 }}>
                    {isEs
                        ? "Tres opciones claras: solo software, solo hardware o el pack completo."
                        : "Three clear options: software only, hardware only, or the full bundle."}
                </p>
            </motion.div>

            {/* Cards */}
            <div className="pricing-grid-3">
                {plans.map((plan, i) => {
                    const PlanIcon = plan.icon
                    return (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            whileHover={{ y: -6 }}
                            style={{
                                background: plan.popular
                                    ? "linear-gradient(160deg, rgba(52,211,153,0.06), rgba(0,0,0,0))"
                                    : "rgba(255,255,255,0.025)",
                                border: plan.popular
                                    ? "1px solid rgba(52,211,153,0.3)"
                                    : "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 24,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: plan.popular
                                    ? "0 0 60px rgba(52,211,153,0.08), 0 24px 60px rgba(0,0,0,0.4)"
                                    : "0 24px 60px rgba(0,0,0,0.35)",
                                position: "relative",
                            }}
                        >
                            {/* Popular pill */}
                            {plan.popular && (
                                <div style={{
                                    position: "absolute", top: 16, right: 16,
                                    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                                    textTransform: "uppercase", color: "#34d399",
                                    background: "rgba(52,211,153,0.12)",
                                    border: "1px solid rgba(52,211,153,0.3)",
                                    padding: "3px 9px", borderRadius: 20,
                                }}>
                                    {isEs ? "Mas popular" : "Most popular"}
                                </div>
                            )}

                            {/* Accent bar */}
                            <div style={{ height: 3, background: `linear-gradient(90deg, ${plan.accent}, transparent)` }} />

                            {/* Icon + badge + title */}
                            <div style={{ padding: "26px 28px 0" }}>
                                <div style={{
                                    width: 46, height: 46, borderRadius: 13,
                                    background: plan.accentDim,
                                    border: `1px solid ${plan.accentBorder}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: 14,
                                }}>
                                    <PlanIcon size={21} color={plan.accent} />
                                </div>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                                    textTransform: "uppercase", color: plan.accent,
                                    background: plan.accentDim, border: `1px solid ${plan.accentBorder}`,
                                    padding: "3px 9px", borderRadius: 20,
                                    display: "inline-block", marginBottom: 14,
                                }}>
                                    {plan.badge}
                                </span>
                                <div style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 2 }}>
                                    {plan.title}
                                </div>
                                <p style={{ fontSize: 12, fontWeight: 600, color: plan.accent, marginBottom: 10, letterSpacing: "0.01em" }}>
                                    {plan.tagline}
                                </p>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: "0 0 22px" }}>
                                    {plan.body}
                                </p>
                            </div>

                            {/* Price block — Coming Soon */}
                            <div style={{
                                margin: "0 28px",
                                padding: "18px 0",
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: "50%",
                                    background: plan.accentDim,
                                    border: `1px solid ${plan.accentBorder}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <Clock size={15} color={plan.accent} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>
                                        {isEs ? "Proximamente" : "Coming Soon"}
                                    </div>
                                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "2px 0 0" }}>
                                        {isEs ? "Precio disponible proximamente" : "Pricing available soon"}
                                    </p>
                                </div>
                            </div>

                            {/* Features */}
                            <div style={{ padding: "18px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                                {plan.features.map((f, j) => (
                                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <div style={{
                                            width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                                            background: "rgba(52,211,153,0.12)",
                                            border: "1px solid rgba(52,211,153,0.25)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <Check size={11} color="#34d399" strokeWidth={2.5} />
                                        </div>
                                        <span style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,0.72)" }}>
                                            {f.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div style={{ padding: "0 28px 28px" }}>
                                <a
                                    href="#contact"
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        width: "100%", padding: "13px 0", borderRadius: 100,
                                        background: plan.popular
                                            ? "linear-gradient(135deg, #34d399, #059669)"
                                            : `linear-gradient(135deg, ${plan.accent}28, ${plan.accent}0d)`,
                                        border: plan.popular ? "none" : `1px solid ${plan.accentBorder}`,
                                        color: plan.popular ? "#001a10" : plan.accent,
                                        fontWeight: 700, fontSize: 14,
                                        textDecoration: "none", transition: "all 0.2s",
                                        boxSizing: "border-box",
                                    }}
                                    onMouseEnter={e => {
                                        if (!plan.popular) {
                                            e.currentTarget.style.background = plan.accentDim
                                            e.currentTarget.style.boxShadow = `0 0 24px ${plan.accent}35`
                                        } else {
                                            e.currentTarget.style.boxShadow = "0 0 32px rgba(52,211,153,0.4)"
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!plan.popular) {
                                            e.currentTarget.style.background = `linear-gradient(135deg, ${plan.accent}28, ${plan.accent}0d)`
                                        }
                                        e.currentTarget.style.boxShadow = "none"
                                    }}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Bottom note */}
            <motion.p
                style={{ marginTop: 36, fontSize: 13, color: "rgba(255,255,255,0.25)", textAlign: "center", maxWidth: 560 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                {isEs
                    ? "Todos los planes incluiran onboarding personalizado y sin costes ocultos. Registrate para recibir el precio en primicia."
                    : "All plans will include personalised onboarding and no hidden fees. Sign up to get pricing first."}
            </motion.p>

            <style>{`
        .pricing-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 380px));
          gap: 22px;
          width: 100%;
          max-width: 1180px;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .pricing-grid-3 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .pricing-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
        </section>
    )
}
