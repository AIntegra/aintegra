import { motion } from "framer-motion"
import { Check, Mic, Camera, PackageCheck, Clock } from "lucide-react"

/* ─── Pricing data ────────────────────────────────────────────────────── */
const PLANS = {
    es: [
        {
            id: "caty",
            badge: "Software",
            icon: Mic,
            title: "CATY",
            tagline: "Inteligencia adaptativa local",
            body: "CATY interpreta contexto, automatiza tareas y convierte comandos en acciones del sistema. Diseñado para funcionar en local siempre que el equipo lo permita.",
            priceType: "subscription",
            popular: false,
            accent: "#87ADC6",
            accentDim: "rgba(135,173,198,0.14)",
            accentBorder: "rgba(135,173,198,0.3)",
            cta: "Empezar con CATY",
            features: [
                { text: "Capa de inteligencia local CATY" },
                { text: "Automatizaciones por lenguaje natural y gestos" },
                { text: "Procesamiento local cuando sea viable" },
                { text: "Configuración adaptada a cada usuario" },
                { text: "Interacción con documentos y contexto de pantalla" },
                { text: "Onboarding personalizado incluido" },
            ],
        },
        {
            id: "cat",
            badge: "Hardware",
            icon: Camera,
            title: "CAT",
            tagline: "Trackpad gestual adaptativo",
            body: "CAT es el hardware propio de AIntegra: un trackpad que aprende gestos personalizados y los traduce en comandos digitales fiables.",
            priceType: "onetime",
            popular: false,
            accent: "#3E89BB",
            accentDim: "rgba(62,137,187,0.12)",
            accentBorder: "rgba(62,137,187,0.3)",
            cta: "Solicitar CAT",
            features: [
                { text: "Dispositivo físico CAT incluido" },
                { text: "Reconocimiento de gestos personalizados" },
                { text: "Tolerancia a variabilidad individual y fatiga" },
                { text: "Mapeo libre de gestos a comandos" },
                { text: "Calibración guiada en la primera instalación" },
                { text: "Diseño orientado a ergonomía y reparabilidad" },
            ],
        },
        {
            id: "pack",
            badge: "Pack - Mejor opcion",
            icon: PackageCheck,
            title: "CATY + CAT",
            tagline: "Ecosistema completo de interacción accesible",
            body: "Hardware e inteligencia local trabajando juntos: CAT captura la intención y CATY la interpreta en contexto para ejecutar acciones.",
            priceType: "pack",
            popular: true,
            accent: "#3E89BB",
            accentDim: "rgba(62,137,187,0.13)",
            accentBorder: "rgba(62,137,187,0.28)",
            cta: "Pedir el Pack",
            features: [
                { text: "Todo lo incluido en CATY" },
                { text: "Dispositivo CAT incluido" },
                { text: "Control gestual + automatización contextual" },
                { text: "Perfil adaptativo para cada usuario" },
                { text: "Soporte prioritario 24 / 5" },
                { text: "Preparado para pilotos B2B y uso individual" },
            ],
        },
    ],
    en: [
        {
            id: "caty",
            badge: "Software",
            icon: Mic,
            title: "CATY",
            tagline: "Local adaptive intelligence",
            body: "CATY interprets context, automates tasks and turns commands into operating-system actions. Built to run locally whenever the device allows it.",
            priceType: "subscription",
            popular: false,
            accent: "#87ADC6",
            accentDim: "rgba(135,173,198,0.14)",
            accentBorder: "rgba(135,173,198,0.3)",
            cta: "Get started with CATY",
            features: [
                { text: "CATY local intelligence layer" },
                { text: "Natural language and gesture automation" },
                { text: "Local processing whenever viable" },
                { text: "Configuration adapted to each user" },
                { text: "Document and screen-context interaction" },
                { text: "Personalised onboarding included" },
            ],
        },
        {
            id: "cat",
            badge: "Hardware",
            icon: Camera,
            title: "CAT",
            tagline: "Adaptive gesture trackpad",
            body: "CAT is AIntegra's proprietary hardware: a trackpad that learns personalized gestures and translates them into reliable digital commands.",
            priceType: "onetime",
            popular: false,
            accent: "#3E89BB",
            accentDim: "rgba(62,137,187,0.12)",
            accentBorder: "rgba(62,137,187,0.3)",
            cta: "Request CAT",
            features: [
                { text: "Physical CAT device included" },
                { text: "Personalized gesture recognition" },
                { text: "Tolerance for individual variation and fatigue" },
                { text: "Free gesture-to-command mapping" },
                { text: "Guided calibration at first setup" },
                { text: "Designed for ergonomics and reparability" },
            ],
        },
        {
            id: "pack",
            badge: "Bundle - Best value",
            icon: PackageCheck,
            title: "CATY + CAT",
            tagline: "Complete accessible interaction ecosystem",
            body: "Hardware and local intelligence working together: CAT captures intention and CATY interprets it in context to execute actions.",
            priceType: "pack",
            popular: true,
            accent: "#3E89BB",
            accentDim: "rgba(62,137,187,0.13)",
            accentBorder: "rgba(62,137,187,0.28)",
            cta: "Order the Bundle",
            features: [
                { text: "Everything in CATY" },
                { text: "CAT device included" },
                { text: "Gesture control + contextual automation" },
                { text: "Adaptive profile for each user" },
                { text: "Priority support 24 / 5" },
                { text: "Ready for B2B pilots and individual use" },
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
                background: "radial-gradient(ellipse at 50% 0%, rgba(62,137,187,0.18) 0%, rgba(0,11,51,0.96) 62%)",
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
                                    ? "linear-gradient(160deg, rgba(62,137,187,0.14), rgba(255,255,255,0.035))"
                                    : "rgba(255,255,255,0.045)",
                                border: plan.popular
                                    ? "1px solid rgba(62,137,187,0.36)"
                                    : "1px solid rgba(220,234,240,0.12)",
                                borderRadius: 24,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: plan.popular
                                    ? "0 0 60px rgba(62,137,187,0.2), 0 24px 60px rgba(0,11,51,0.42)"
                                    : "0 24px 60px rgba(0,11,51,0.32)",
                                backdropFilter: "blur(22px)",
                                position: "relative",
                            }}
                        >
                            {/* Popular pill */}
                            {plan.popular && (
                                <div style={{
                                    position: "absolute", top: 16, right: 16,
                                    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                                    textTransform: "uppercase", color: "#3E89BB",
                                    background: "rgba(62,137,187,0.14)",
                                    border: "1px solid rgba(62,137,187,0.34)",
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
                                            background: "rgba(62,137,187,0.14)",
                                            border: "1px solid rgba(62,137,187,0.28)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <Check size={11} color="#3E89BB" strokeWidth={2.5} />
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
                                            ? "linear-gradient(135deg, #3E89BB, #165F97)"
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
                                            e.currentTarget.style.boxShadow = "0 0 32px rgba(62,137,187,0.4)"
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
