import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mic, Sparkles, ChevronRight } from "lucide-react"

/* ─────────────────────────────────────────────
   STATIC DIALOGUE FLOW (B2C Focus + B2B options)
───────────────────────────────────────────── */
const CHAT_FLOW = {
    es: {
        start: {
            msg: "Hola, soy **CATY**, la capa de inteligencia local de AIntegra. ¿Qué quieres explorar?",
            options: [
                { label: "¿Qué es AIntegra?", next: "what_is" },
                { label: "Usar AIntegra (B2C)", next: "b2c" },
                { label: "¿Cómo funciona el trackpad CAT?", next: "cat" },
                { label: "Soy una Empresa (B2B)", next: "enterprise" }
            ]
        },
        what_is: {
            msg: "AIntegra es un ecosistema de interacción accesible: CAT aprende tus gestos reales y yo interpreto el contexto para convertir intención en acciones del ordenador.",
            options: [
                { label: "Lo quiero. ¿Cómo empiezo?", next: "b2c" },
                { label: "Cuéntame más del trackpad", next: "cat" },
                { label: "Volver atrás", next: "start" }
            ]
        },
        b2c: {
            msg: "Estamos preparando validaciones con usuarios individuales. Puedes registrarte para participar en las primeras pruebas de CAT y CATY.",
            options: [
                { label: "Apuntarme al lanzamiento (Demo)", next: "demo" },
                { label: "¿Cuánto costará?", next: "pricing_b2c" },
                { label: "Volver al inicio", next: "start" }
            ]
        },
        enterprise: {
            msg: "Podemos plantear pilotos B2B con asociaciones, fundaciones, centros especializados, entidades públicas o empresas que quieran desplegar interacción accesible.",
            options: [
                { label: "Agendar Demo para Empresa", next: "demo_b2b" },
                { label: "Sector Público / Licitaciones", next: "b2g" },
                { label: "Volver al inicio", next: "start" }
            ]
        },
        b2g: {
            msg: "Para instituciones públicas priorizamos accesibilidad, privacidad, validación con usuarios reales y una arquitectura alineada con RGPD y regulación europea de IA.",
            options: [
                { label: "Contactar Ventas", next: "demo_b2b" },
                { label: "Volver atrás", next: "enterprise" }
            ]
        },
        cat: {
            msg: "CAT (Cognitive Assistive Trackpad) es hardware propio: un trackpad gestual que aprende variaciones individuales y permite asignar gestos a comandos, atajos y flujos.",
            options: [
                { label: "Apuntarme para conseguirlo", next: "demo" },
                { label: "Volver al inicio", next: "start" }
            ]
        },
        pricing_b2c: {
            msg: "El modelo previsto combina venta o licenciamiento de hardware y software, suscripción a servicios inteligentes y acuerdos con entidades.",
            options: [
                { label: "Dejar mis datos", next: "demo" },
                { label: "Volver atrás", next: "b2c" }
            ]
        },
        demo: {
            msg: "Genial. Usa el formulario de contacto y te tendremos en cuenta para las primeras pruebas y demos del ecosistema.",
            options: [
                { label: "Terminar conversación", next: "end" },
                { label: "Volver al menú inicial", next: "start" }
            ]
        },
        demo_b2b: {
            msg: "Perfecto. Rellena el formulario indicando tu organización y caso de uso. Te contactaremos para valorar demo, piloto o colaboración.",
            options: [
                { label: "Terminar", next: "end" },
                { label: "Ir al inicio", next: "start" }
            ]
        },
        end: {
            msg: "Ha sido un placer asistirte. Quedo apagada pero atenta por si necesitas repasar cualquier otra funcionalidad.",
            options: [
                { label: "Comenzar de nuevo", next: "start" }
            ]
        }
    },
    en: {
        start: {
            msg: "Hi, I'm **CATY**, AIntegra's local intelligence layer. What would you like to explore?",
            options: [
                { label: "What is AIntegra?", next: "what_is" },
                { label: "I want to use it (B2C)", next: "b2c" },
                { label: "How does the CAT trackpad work?", next: "cat" },
                { label: "I'm a Business (B2B)", next: "enterprise" }
            ]
        },
        what_is: {
            msg: "AIntegra is an accessible interaction ecosystem: CAT learns your real gestures and I interpret context to turn intention into computer actions.",
            options: [
                { label: "I want it. How to start?", next: "b2c" },
                { label: "Tell me about the trackpad", next: "cat" },
                { label: "Go back", next: "start" }
            ]
        },
        b2c: {
            msg: "We are preparing validations with individual users. You can register to join the first CAT and CATY tests.",
            options: [
                { label: "Join the Waitlist (Demo)", next: "demo" },
                { label: "How much will it cost?", next: "pricing_b2c" },
                { label: "Go back", next: "start" }
            ]
        },
        enterprise: {
            msg: "We can shape B2B pilots with associations, foundations, specialized centers, public entities or companies deploying accessible interaction.",
            options: [
                { label: "Schedule Enterprise Demo", next: "demo_b2b" },
                { label: "Public Sector (B2G)", next: "b2g" },
                { label: "Go back", next: "start" }
            ]
        },
        b2g: {
            msg: "For public institutions we prioritize accessibility, privacy, real-user validation and an architecture aligned with GDPR and European AI regulation.",
            options: [
                { label: "Talk to Sales", next: "demo_b2b" },
                { label: "Go back", next: "enterprise" }
            ]
        },
        cat: {
            msg: "CAT (Cognitive Assistive Trackpad) is proprietary hardware: a gesture trackpad that learns individual variation and maps gestures to commands, shortcuts and workflows.",
            options: [
                { label: "Count me in for launch", next: "demo" },
                { label: "Start over", next: "start" }
            ]
        },
        pricing_b2c: {
            msg: "The planned model combines hardware and software sales or licensing, subscriptions for intelligent services and agreements with organizations.",
            options: [
                { label: "Leave my details", next: "demo" },
                { label: "Go back", next: "b2c" }
            ]
        },
        demo: {
            msg: "Great. Use the main contact form and we'll consider you for the first tests and ecosystem demos.",
            options: [
                { label: "End conversation", next: "end" },
                { label: "Back to main menu", next: "start" }
            ]
        },
        demo_b2b: {
            msg: "Great. Fill out the website form with your organization and use case. We'll contact you to assess a demo, pilot or collaboration.",
            options: [
                { label: "End", next: "end" },
                { label: "Start over", next: "start" }
            ]
        },
        end: {
            msg: "It was a pleasure assisting you. I'll power down but remain on standby if you want to review any other features.",
            options: [
                { label: "Restart menu", next: "start" }
            ]
        }
    }
}

/* ─────────────────────────────────────────────
   MAIN CHATBOT COMPONENT
───────────────────────────────────────────── */
export default function Chatbot({ lang = "es" }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [currentNode, setCurrentNode] = useState("start")
    const [isTyping, setIsTyping] = useState(false)
    const endRef = useRef(null)

    const txt = {
        es: { close: "Cerrar", product: "Preview del producto", optionsHint: "Elige una opción:" },
        en: { close: "Close", product: "Product preview", optionsHint: "Choose an option:" }
    }[lang] || { close: "", product: "", optionsHint: "" }

    const flow = CHAT_FLOW[lang] || CHAT_FLOW.es

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, isTyping])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ role: "bot", text: flow.start.msg }])
            setCurrentNode("start")
        }
    }, [isOpen, flow.start.msg, messages.length])

    const handleOptionSelect = (optionLabel, nextNodeId) => {
        // User's selection bubble
        setMessages(prev => [...prev, { role: "user", text: optionLabel }])
        setCurrentNode(null) // Hide options while "thinking"
        setIsTyping(true)

        // Simulate typing delay before showing CATY's response
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, { role: "bot", text: flow[nextNodeId].msg }])
            setCurrentNode(nextNodeId) // Show new options
        }, 800 + Math.random() * 400)
    }

    return (
        <>
            {/* ── FLOATING TRIGGER BUTTON ── */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed", bottom: 28, right: 28, zIndex: 200,
                    width: 60, height: 60, borderRadius: "50%",
                    background: "rgba(10, 10, 15, 0.6)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(22,95,151,0.3)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(22,95,151,0.25), inset 0 0 20px rgba(22,95,151,0.1)"
                }}
                whileHover={{ scale: 1.05, background: "rgba(20, 20, 25, 0.8)", borderColor: "rgba(22,95,151,0.5)" }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: isOpen
                        ? "0 4px 12px rgba(0,0,0,0.5)"
                        : ["0 8px 32px rgba(22,95,151,0.2)", "0 8px 48px rgba(22,95,151,0.4)", "0 8px 32px rgba(22,95,151,0.2)"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={22} color="white" />
                        </motion.div>
                    ) : (
                        <motion.div key="mic" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <Mic size={22} color="white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* ── CHAT PANEL ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.92 }}
                        transition={{ type: "spring", damping: 28, stiffness: 340 }}
                        style={{
                            position: "fixed", bottom: 96, right: 28, zIndex: 200,
                            width: 380, maxWidth: "calc(100vw - 32px)",
                            borderRadius: 24, overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
                            background: "rgba(10, 10, 15, 0.75)",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            display: "flex", flexDirection: "column"
                        }}
                    >
                        {/* ── HEADER ── */}
                        <div style={{
                            padding: "16px 20px",
                            background: "rgba(255, 255, 255, 0.03)",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                            display: "flex", alignItems: "center", justifyContent: "space-between"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                                    background: "linear-gradient(135deg, rgba(22,95,151,0.2) 0%, rgba(13,64,109,0.2) 100%)",
                                    border: "1px solid rgba(22,95,151,0.4)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1)"
                                }}>
                                    <Mic size={18} color="#87ADC6" />
                                </div>

                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>CATY</span>
                                        <span style={{
                                            fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 980,
                                            background: "rgba(22,95,151,0.2)", border: "1px solid rgba(22,95,151,0.35)",
                                            color: "#87ADC6", letterSpacing: "0.04em", textTransform: "uppercase"
                                        }}>
                                            AI
                                        </span>
                                        <Sparkles size={12} color="#f59e0b" />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3E89BB" }} />
                                        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>
                                            {txt.product} · AIntegra
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: "none", border: "none", cursor: "pointer", opacity: 0.4, color: "white", padding: 4 }}
                                aria-label={txt.close}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* ── MESSAGES ── */}
                        <div style={{ height: 340, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    style={{ display: "flex", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}
                                >
                                    {/* Bot Avatar Base */}
                                    {msg.role === "bot" && (
                                        <div style={{
                                            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                            background: "linear-gradient(135deg, #165F97, #0D406D)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            boxShadow: "0 0 12px rgba(22,95,151,0.35)"
                                        }}>
                                            <Mic size={12} color="white" />
                                        </div>
                                    )}

                                    <div style={{
                                        maxWidth: "80%", padding: "12px 16px", borderRadius: 20,
                                        borderBottomLeftRadius: msg.role === "bot" ? 4 : 20,
                                        borderBottomRightRadius: msg.role === "user" ? 4 : 20,
                                        background: msg.role === "user"
                                            ? "linear-gradient(135deg, #165F97, #0D406D)"
                                            : "rgba(255, 255, 255, 0.06)",
                                        border: msg.role === "user"
                                            ? "none"
                                            : "1px solid rgba(255, 255, 255, 0.05)",
                                        boxShadow: msg.role === "user" ? "0 4px 12px rgba(22,95,151,0.3)" : "none"
                                    }}>
                                        <p
                                            style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "white", letterSpacing: "0.01em" }}
                                            dangerouslySetInnerHTML={{
                                                __html: msg.text
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#87ADC6">$1</strong>')
                                                    .replace(/\n/g, "<br/>")
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                        background: "linear-gradient(135deg, #165F97, #0D406D)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        boxShadow: "0 0 12px rgba(22,95,151,0.35)"
                                    }}>
                                        <Mic size={12} color="white" />
                                    </div>
                                    <div style={{ padding: "12px 14px", borderRadius: 16, borderBottomLeftRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 4, alignItems: "center" }}>
                                        {[0, 0.18, 0.36].map((delay, i) => (
                                            <motion.div
                                                key={i}
                                                style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(167,139,250,0.8)" }}
                                                animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                                                transition={{ duration: 0.9, repeat: Infinity, delay }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={endRef} />
                        </div>

                        {/* ── DYNAMIC BUTTON OPTIONS (REPLACES INPUT) ── */}
                        <div style={{ padding: "0 16px 16px", background: "rgba(0,0,0,0.2)" }}>
                            <AnimatePresence>
                                {currentNode && flow[currentNode]?.options && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                                    >
                                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", margin: "8px 0 4px", paddingLeft: 4 }}>
                                            {txt.optionsHint}
                                        </p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            {flow[currentNode].options.map((opt, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(opt.label, opt.next)}
                                                    whileHover={{ scale: 1.015, background: "rgba(22,95,151,0.15)", borderColor: "rgba(22,95,151,0.4)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    style={{
                                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                                        width: "100%", padding: "12px 18px", borderRadius: 16,
                                                        background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)",
                                                        color: "white", fontSize: 13.5, cursor: "pointer", textAlign: "left",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                >
                                                    {opt.label}
                                                    <ChevronRight size={14} style={{ opacity: 0.5, color: "#87ADC6" }} />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Footer branding */}
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginTop: 16 }}>
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "linear-gradient(135deg, #165F97, #3E89BB)" }} />
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
                                    CATY Interactive Flow
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
