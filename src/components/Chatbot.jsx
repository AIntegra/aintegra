import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Mic, Sparkles, ChevronRight, AlertCircle } from "lucide-react"
import OpenAI from "openai"

/* ─────────────────────────────────────────────
   SYSTEM PROMPT — conversion-focused B2B/B2G
───────────────────────────────────────────── */
const SYSTEM_PROMPT = `Eres Kira, el asistente oficial de AIntegra Limited. Eres la IA de la plataforma AIntegra.

AIntegra es una startup tecnológica en Pre-Seed. La plataforma tiene dos módulos:
- Kira: Asistente de voz nativo de IA, procesa localmente, sin datos en la nube.
- C.A.T. (Cognitive Assistive Trackpad): Hardware de control gestual de alta precisión.

TARGET: Empresas (B2B), instituciones públicas (B2G) y profesionales avanzados.

Beneficios clave: 3× más velocidad en tareas, <5ms latencia, 60% menos fricción de UX, escalable de 1 a 10.000 puestos.

Modelo de negocio: SaaS + licencias enterprise. Pre-Seed fase.

Tono: Experto, conciso, orientado a conversión. Siempre ofrece concretar una demo al finalizar.

Reglas:
- Responde en el idioma del usuario (ES/EN)
- Máximo 2-3 frases por respuesta
- Si preguntan precio, redirige al formulario de demo
- Siempre termina con una micro-CTA si hay oportunidad`

/* ─────────────────────────────────────────────
   CLIENT GROQ
───────────────────────────────────────────── */
const getGroqClient = () => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) return null
    try {
        return new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1", dangerouslyAllowBrowser: true })
    } catch { return null }
}

/* ─────────────────────────────────────────────
   DEMO RESPONSES
───────────────────────────────────────────── */
const DEMO = {
    es: {
        greeting: "Hola, soy **Kira** — asistente de IA de AIntegra. Estás hablando con el producto real. ¿Tienes preguntas sobre cómo podemos ayudar a tu organización?",
        patterns: [
            { kw: ["qué es", "que es", "aintegra"], r: "AIntegra es la plataforma que integra IA y hardware adaptativo. Kira (yo) gestiono tu entorno por voz. C.A.T. reemplaza el ratón con gestos de precisión. Juntos eliminan la fricción digital en tu equipo." },
            { kw: ["kira"], r: "Soy Kira — controlo tu sistema operativo por voz, automatizo flujos repetitivos y proceso todo en el dispositivo. Sin nube. Sin exposición de datos. ¿Quieres ver una demo en tu organización?" },
            { kw: ["cat", "c.a.t", "trackpad", "hardware"], r: "C.A.T. es nuestro trackpad cognitivo de hardware. Latencia <5ms, gestos personalizables y se integra conmigo para control 100% manos libres. Ideal para equipos de diseño y operaciones." },
            { kw: ["precio", "coste", "costo", "cuánto", "cuanto"], r: "Los precios se adaptan al tamaño y caso de uso de tu organización. ¿Agendamos 30 minutos para mostrarte el ROI concreto para tu equipo?" },
            { kw: ["empresa", "empresa", "b2b", "equipo", "team"], r: "Para empresas ofrecemos despliegue corporativo, integración con vuestro stack y reducción del 60% en fricción de UX. ¿Cuántos puestos estás valorando?" },
            { kw: ["institución", "institucion", "público", "b2g", "admin"], r: "Para instituciones públicas ofrecemos cumplimiento WCAG, opción on-premise/air-gapped y proceso de licitación estructurado. ¿Te interesa una propuesta técnica?" },
            { kw: ["demo", "ver", "probar", "demostración"], r: "Perfecto. Rellena el formulario y recibe una demo de 30 minutos personalizada a tu caso de uso. Tiempo de respuesta < 24h." },
            { kw: ["hola", "hello", "buenas", "hi", "hey"], r: "Hola. Soy Kira, la IA de AIntegra. ¿En qué puedo ayudar a tu organización hoy?" },
            { kw: ["gracias", "thanks"], r: "Con gusto. Si quieres ver Kira y C.A.T. en acción, agenda tu demo en el formulario." },
        ],
        default: "Puedo contarte más sobre Kira, C.A.T., casos de uso enterprise o cómo empezar. ¿Qué te interesa?",
    },
    en: {
        greeting: "Hi, I'm **Kira** — AIntegra's AI assistant. You're talking to the real product. How can I help your organization today?",
        patterns: [
            { kw: ["what is", "aintegra"], r: "AIntegra is the platform integrating AI and adaptive hardware. I (Kira) manage your environment by voice. C.A.T. replaces the mouse with precision gestures. Together we eliminate digital friction for your team." },
            { kw: ["kira"], r: "I'm Kira — I control your OS by voice, automate repetitive flows and process everything on-device. No cloud. No data exposure. Want to see a demo for your organization?" },
            { kw: ["cat", "c.a.t", "trackpad", "hardware"], r: "C.A.T. is our cognitive hardware trackpad. <5ms latency, customizable gestures and deep integration with me for 100% hands-free control. Great for design and ops teams." },
            { kw: ["price", "cost", "how much", "pricing"], r: "Pricing adapts to your organization's size and use case. Shall we schedule 30 minutes to show you the concrete ROI for your team?" },
            { kw: ["business", "b2b", "team", "enterprise"], r: "For businesses we offer company-wide deployment, stack integration and 60% reduction in UX friction. How many seats are you evaluating?" },
            { kw: ["institution", "public", "b2g", "government"], r: "For public institutions we offer WCAG compliance, on-premise/air-gapped option and structured procurement process. Interested in a technical proposal?" },
            { kw: ["demo", "see", "try", "show"], r: "Perfect. Fill in the form and get a 30-minute demo tailored to your use case. Response time < 24h." },
            { kw: ["hello", "hi", "hey"], r: "Hi. I'm Kira, AIntegra's AI. How can I help your organization today?" },
            { kw: ["thanks", "thank you"], r: "My pleasure. If you'd like to see Kira and C.A.T. in action, book your demo via the form." },
        ],
        default: "I can tell you more about Kira, C.A.T., enterprise use cases or how to get started. What interests you?",
    }
}

const getDemoResponse = (input, lang) => {
    const lc = input.toLowerCase()
    const d = DEMO[lang] || DEMO.es
    for (const p of d.patterns) {
        if (p.kw.some(k => lc.includes(k))) return p.r
    }
    return d.default
}

/* ─────────────────────────────────────────────
   QUICK ACTION CHIPS
───────────────────────────────────────────── */
const QUICK = {
    es: ["¿Qué es Kira?", "Demo para empresa", "¿Cómo funciona C.A.T.?", "Quiero una demo"],
    en: ["What is Kira?", "Enterprise demo", "How does C.A.T. work?", "Book a demo"],
}

/* ─────────────────────────────────────────────
   ORBE ANIMADO — Kira visual identity
───────────────────────────────────────────── */
function KiraOrb({ isTyping }) {
    return (
        <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
            {/* Glow rings */}
            {isTyping && (
                <>
                    <motion.div
                        style={{
                            position: "absolute", inset: -6, borderRadius: "50%",
                            border: "1.5px solid rgba(124,58,237,0.35)"
                        }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    <motion.div
                        style={{
                            position: "absolute", inset: -10, borderRadius: "50%",
                            border: "1px solid rgba(124,58,237,0.2)"
                        }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                    />
                </>
            )}
            {/* Core orb */}
            <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", zIndex: 1,
                boxShadow: "0 0 20px rgba(124,58,237,0.4)"
            }}>
                <Mic size={16} color="white" />
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────
   MAIN CHATBOT
───────────────────────────────────────────── */
export default function Chatbot({ lang = "es" }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [convHistory, setConvHistory] = useState([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [client, setClient] = useState(null)
    const [isDemoMode, setIsDemoMode] = useState(false)
    const endRef = useRef(null)
    const inputRef = useRef(null)

    const txt = {
        es: { placeholder: "Escribe tu pregunta…", chipHint: "Preguntas frecuentes", close: "Cerrar", product: "Preview del producto" },
        en: { placeholder: "Type your question…", chipHint: "Quick questions", close: "Close", product: "Product preview" }
    }[lang] || { placeholder: "", chipHint: "", close: "", product: "" }

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const groq = getGroqClient()
            if (groq) {
                setClient(groq)
                setConvHistory([{ role: "system", content: SYSTEM_PROMPT }])
            } else {
                setIsDemoMode(true)
            }
            const greeting = DEMO[lang]?.greeting || DEMO.es.greeting
            setMessages([{ role: "bot", text: greeting }])
        }
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 150)
    }, [isOpen])

    const send = async (text) => {
        const userMsg = text || input.trim()
        if (!userMsg) return
        setInput("")
        setMessages(prev => [...prev, { role: "user", text: userMsg }])
        setIsTyping(true)

        if (isDemoMode || !client) {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: "bot", text: getDemoResponse(userMsg, lang) }])
                setIsTyping(false)
            }, 600 + Math.random() * 800)
            return
        }

        const newHistory = [...convHistory, { role: "user", content: userMsg }]
        setConvHistory(newHistory)
        try {
            const res = await client.chat.completions.create({
                model: "llama-3.3-70b-versatile", messages: newHistory, max_tokens: 400, temperature: 0.7
            })
            const answer = res.choices[0].message.content
            setConvHistory(prev => [...prev, { role: "assistant", content: answer }])
            setMessages(prev => [...prev, { role: "bot", text: answer }])
        } catch {
            setMessages(prev => [...prev, { role: "bot", text: "Error de conexión. Inténtalo de nuevo.", isError: true }])
        } finally {
            setIsTyping(false)
        }
    }

    const quickActions = QUICK[lang] || QUICK.es

    return (
        <>
            {/* ── FLOATING TRIGGER BUTTON ── */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed", bottom: 28, right: 28, zIndex: 200,
                    width: 56, height: 56, borderRadius: "50%",
                    background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 60%, #06b6d4 100%)",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.45)"
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                    boxShadow: isOpen
                        ? "0 8px 20px rgba(124,58,237,0.3)"
                        : ["0 8px 32px rgba(124,58,237,0.45)", "0 8px 48px rgba(37,99,235,0.55)", "0 8px 32px rgba(124,58,237,0.45)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
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
                            border: "1px solid rgba(124,58,237,0.25)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04), 0 0 80px rgba(124,58,237,0.15)",
                            background: "#0c0c10"
                        }}
                    >
                        {/* ── HEADER ── */}
                        <div style={{
                            padding: "16px 20px",
                            background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(37,99,235,0.12) 50%, rgba(6,182,212,0.08) 100%)",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                            display: "flex", alignItems: "center", justifyContent: "space-between"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                {/* Kira orb */}
                                <div style={{
                                    width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                                    background: "linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2)"
                                }}>
                                    <Mic size={18} color="white" />
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
                        <div style={{ height: 300, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ display: "flex", gap: 10, flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}
                                >
                                    {/* Avatar */}
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

                                    {/* Bubble */}
                                    <div style={{
                                        maxWidth: "78%", padding: "10px 14px", borderRadius: 16,
                                        borderBottomLeftRadius: msg.role === "bot" ? 4 : 16,
                                        borderBottomRightRadius: msg.role === "user" ? 4 : 16,
                                        background: msg.role === "user"
                                            ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))"
                                            : "rgba(255,255,255,0.05)",
                                        border: msg.role === "user"
                                            ? "1px solid rgba(124,58,237,0.25)"
                                            : "1px solid rgba(255,255,255,0.07)",
                                    }}>
                                        <p
                                            style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: msg.isError ? "#f87171" : "rgba(255,255,255,0.85)" }}
                                            dangerouslySetInnerHTML={{
                                                __html: msg.text
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>')
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
                                        width: 28, height: 28, borderRadius: "50%",
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

                        {/* ── QUICK ACTION CHIPS ── */}
                        {messages.length <= 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                style={{ padding: "0 14px 12px", display: "flex", flexDirection: "column", gap: 6 }}
                            >
                                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px", paddingLeft: 2 }}>
                                    {txt.chipHint}
                                </p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {quickActions.map((q, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => send(q)}
                                            whileHover={{ scale: 1.03, borderColor: "rgba(124,58,237,0.5)" }}
                                            whileTap={{ scale: 0.97 }}
                                            style={{
                                                display: "flex", alignItems: "center", gap: 5,
                                                padding: "6px 12px", borderRadius: 980,
                                                background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)",
                                                color: "rgba(255,255,255,0.65)", fontSize: 12, cursor: "pointer",
                                                transition: "all 0.15s ease"
                                            }}
                                        >
                                            {q}
                                            <ChevronRight size={10} style={{ opacity: 0.5 }} />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ── INPUT ── */}
                        <div style={{ padding: "12px 14px 16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
                                    placeholder={txt.placeholder}
                                    style={{
                                        flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 14, padding: "11px 16px", fontSize: 13, color: "white",
                                        outline: "none", fontFamily: "inherit", transition: "border-color 0.15s"
                                    }}
                                    onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                                />
                                <motion.button
                                    onClick={() => send()}
                                    disabled={!input.trim()}
                                    whileHover={input.trim() ? { scale: 1.06 } : {}}
                                    whileTap={input.trim() ? { scale: 0.94 } : {}}
                                    style={{
                                        width: 40, height: 40, borderRadius: 12, border: "none", cursor: input.trim() ? "pointer" : "default",
                                        background: input.trim()
                                            ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                                            : "rgba(255,255,255,0.08)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "background 0.15s"
                                    }}
                                >
                                    <Send size={15} color={input.trim() ? "white" : "rgba(255,255,255,0.3)"} />
                                </motion.button>
                            </div>

                            {/* Footer branding */}
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginTop: 10 }}>
                                <div style={{
                                    width: 12, height: 12, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)"
                                }} />
                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
                                    Kira by AIntegra
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
