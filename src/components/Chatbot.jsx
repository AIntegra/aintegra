import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mic, Sparkles, ChevronRight } from "lucide-react"

/* ─────────────────────────────────────────────
   STATIC DIALOGUE FLOW (B2C Focus + B2B options)
───────────────────────────────────────────── */
const CHAT_FLOW = {
    es: {
        start: {
            msg: "Hola, soy **Kira** — tu asistente de IA personal en AIntegra. ¿En qué te puedo ayudar hoy?",
            options: [
                { label: "¿Qué es AIntegra?", next: "what_is" },
                { label: "Usar AIntegra (B2C)", next: "b2c" },
                { label: "¿Cómo funciona el trackpad C.A.T.?", next: "cat" },
                { label: "Soy una Empresa (B2B)", next: "enterprise" }
            ]
        },
        what_is: {
            msg: "Somos la plataforma que une IA con hardware avanzado para tu día a día. Yo gestiono tu PC por voz, y nuestro trackpad C.A.T. hace que tus dedos vuelen. Juntos, adiós a los clics lentos.",
            options: [
                { label: "Lo quiero. ¿Cómo empiezo?", next: "b2c" },
                { label: "Cuéntame más del trackpad", next: "cat" },
                { label: "Volver atrás", next: "start" }
            ]
        },
        b2c: {
            msg: "Actualmente estamos preparando el lanzamiento para usuarios individuales. Puedes registrarte y ser de los primeros en experimentar tu ordenador controlado por Kira y gestos fluidos.",
            options: [
                { label: "Apuntarme al lanzamiento (Demo)", next: "demo" },
                { label: "¿Cuánto costará?", next: "pricing_b2c" },
                { label: "Volver al inicio", next: "start" }
            ]
        },
        enterprise: {
            msg: "Por supuesto, también tenemos soluciones B2B corporativas: integración nativa en ERP/CRM, despliegues On-Premise y automatización de procesos internos con métricas de ahorro.",
            options: [
                { label: "Agendar Demo para Empresa", next: "demo_b2b" },
                { label: "Sector Público / Licitaciones", next: "b2g" },
                { label: "Volver al inicio", next: "start" }
            ]
        },
        b2g: {
            msg: "Para instituciones públicas garantizamos cumplimiento estricto WCAG, opción de despliegue On-Premise (aislado de red) y ayuda durante las licitaciones.",
            options: [
                { label: "Contactar Ventas", next: "demo_b2b" },
                { label: "Volver atrás", next: "enterprise" }
            ]
        },
        cat: {
            msg: "C.A.T. (Cognitive Assistive Trackpad) es nuestro dispositivo estrella. Olvídate del ratón: siente el control gestual con latencia <5ms y comunícate conmigo sin tocar el teclado.",
            options: [
                { label: "Apuntarme para conseguirlo", next: "demo" },
                { label: "Volver al inicio", next: "start" }
            ]
        },
        pricing_b2c: {
            msg: "Lanzaremos planes muy accesibles orientados a productividad personal. Las suscripciones estarán al nivel de una herramienta diaria esencial. Te avisaremos en exclusiva.",
            options: [
                { label: "Dejar mis datos", next: "demo" },
                { label: "Volver atrás", next: "b2c" }
            ]
        },
        demo: {
            msg: "¡Genial! Únete usando el formulario de contacto principal. Te avisaremos en cuanto abramos acceso a los primeros usuarios e invitaremos a nuestra Demo interactiva.",
            options: [
                { label: "Terminar conversación", next: "end" },
                { label: "Volver al menú inicial", next: "start" }
            ]
        },
        demo_b2b: {
            msg: "Perfecto. Rellena el formulario de la web indicando tu industria y roles del equipo. Nuestros técnicos te contactarán para agendar la llamada comercial.",
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
            msg: "Hi, I'm **Kira** — your personal AI assistant at AIntegra. How can I help you today?",
            options: [
                { label: "What is AIntegra?", next: "what_is" },
                { label: "I want to use it (B2C)", next: "b2c" },
                { label: "How does the C.A.T. trackpad work?", next: "cat" },
                { label: "I'm a Business (B2B)", next: "enterprise" }
            ]
        },
        what_is: {
            msg: "We blend AI with advanced hardware for your daily life. I manage your PC by voice, and our C.A.T. trackpad makes your fingers fly. Together, no more slow clicking.",
            options: [
                { label: "I want it. How to start?", next: "b2c" },
                { label: "Tell me about the trackpad", next: "cat" },
                { label: "Go back", next: "start" }
            ]
        },
        b2c: {
            msg: "We are currently gearing up for our consumer launch. You can register now to be among the first to experience PC control driven by pure voice and fluid gestures.",
            options: [
                { label: "Join the Waitlist (Demo)", next: "demo" },
                { label: "How much will it cost?", next: "pricing_b2c" },
                { label: "Go back", next: "start" }
            ]
        },
        enterprise: {
            msg: "Certainly. We also offer corporate B2B solutions: native ERP/CRM integrations, On-Premise deployments, and internal workflow automation with proven ROI.",
            options: [
                { label: "Schedule Enterprise Demo", next: "demo_b2b" },
                { label: "Public Sector (B2G)", next: "b2g" },
                { label: "Go back", next: "start" }
            ]
        },
        b2g: {
            msg: "For public institutions we ensure full WCAG adherence, Air-Gapped / On-Premise options, and full procurement support.",
            options: [
                { label: "Talk to Sales", next: "demo_b2b" },
                { label: "Go back", next: "enterprise" }
            ]
        },
        cat: {
            msg: "C.A.T. (Cognitive Assistive Trackpad) is our flagship device. Forget the mouse: feel raw gesture control (<5ms latency) and talk to me without a keyboard.",
            options: [
                { label: "Count me in for launch", next: "demo" },
                { label: "Start over", next: "start" }
            ]
        },
        pricing_b2c: {
            msg: "We will launch very accessible plans tailored for individual personal productivity. It will be priced like an essential daily tool. We'll give you an exclusive heads-up.",
            options: [
                { label: "Leave my details", next: "demo" },
                { label: "Go back", next: "b2c" }
            ]
        },
        demo: {
            msg: "Awesome! Join via our main contact form. We'll notify you the exact moment we open access to early adopters and invite you to our interactive Demo.",
            options: [
                { label: "End conversation", next: "end" },
                { label: "Back to main menu", next: "start" }
            ]
        },
        demo_b2b: {
            msg: "Great. Please fill out the website form detailing your industry and team roles. Our technical staff will contact you to schedule a corporate call.",
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

        // Simulate typing delay before showing Kira's response
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
                    border: "1px solid rgba(124,58,237,0.3)",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.25), inset 0 0 20px rgba(124,58,237,0.1)"
                }}
                whileHover={{ scale: 1.05, background: "rgba(20, 20, 25, 0.8)", borderColor: "rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: isOpen
                        ? "0 4px 12px rgba(0,0,0,0.5)"
                        : ["0 8px 32px rgba(124,58,237,0.2)", "0 8px 48px rgba(124,58,237,0.4)", "0 8px 32px rgba(124,58,237,0.2)"]
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
                                    background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(37,99,235,0.2) 100%)",
                                    border: "1px solid rgba(124,58,237,0.4)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1)"
                                }}>
                                    <Mic size={18} color="#a78bfa" />
                                </div>

                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Kira</span>
                                        <span style={{
                                            fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 980,
                                            background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.35)",
                                            color: "#a78bfa", letterSpacing: "0.04em", textTransform: "uppercase"
                                        }}>
                                            AI
                                        </span>
                                        <Sparkles size={12} color="#f59e0b" />
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
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
                                            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            boxShadow: "0 0 12px rgba(124,58,237,0.35)"
                                        }}>
                                            <Mic size={12} color="white" />
                                        </div>
                                    )}

                                    <div style={{
                                        maxWidth: "80%", padding: "12px 16px", borderRadius: 20,
                                        borderBottomLeftRadius: msg.role === "bot" ? 4 : 20,
                                        borderBottomRightRadius: msg.role === "user" ? 4 : 20,
                                        background: msg.role === "user"
                                            ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
                                            : "rgba(255, 255, 255, 0.06)",
                                        border: msg.role === "user"
                                            ? "none"
                                            : "1px solid rgba(255, 255, 255, 0.05)",
                                        boxShadow: msg.role === "user" ? "0 4px 12px rgba(124,58,237,0.3)" : "none"
                                    }}>
                                        <p
                                            style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: "white", letterSpacing: "0.01em" }}
                                            dangerouslySetInnerHTML={{
                                                __html: msg.text
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#a78bfa">$1</strong>')
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
                                        background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        boxShadow: "0 0 12px rgba(124,58,237,0.35)"
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
                                                    whileHover={{ scale: 1.015, background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.4)" }}
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
                                                    <ChevronRight size={14} style={{ opacity: 0.5, color: "#a78bfa" }} />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Footer branding */}
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginTop: 16 }}>
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }} />
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
                                    Kira Interactive Flow
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
