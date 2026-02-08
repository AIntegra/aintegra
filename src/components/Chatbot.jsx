import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, AlertCircle } from "lucide-react"
import OpenAI from "openai"

// System prompt with all AIntegra knowledge
const SYSTEM_PROMPT = `Eres el asistente oficial de AIntegra Limited.

AIntegra es una startup tecnológica nacida en la Universitat de València y en el programa IAtechUV, en fase Pre-Seed.

Desarrolla un asistente de inteligencia artificial integrado con hardware inteligente que permite usar el ordenador mediante voz y gestos, de forma más humana, rápida e inclusiva.

Misión:
Eliminar barreras digitales y democratizar el acceso a la tecnología.

Visión:
Ser referencia internacional en interfaces inteligentes inclusivas.

Producto:
- Asistente IA multimodal (voz + gestos)
- Integración con electrónica propia
- Control del ordenador
- Automatización de tareas
- Personalización
- Compatible con lectores de pantalla
- Enfoque en discapacidad visual

Estado actual:
- MVP funcional del asistente IA
- Integración hardware en desarrollo
- Validación con usuarios reales

Segmento principal:
Personas con discapacidad visual que usan ordenador intensivamente, viven de forma independiente, tienen capacidad económica y usan Windows.

España: ~20.000 early adopters
Global: ~1.000.000 early adopters

Modelo de negocio:
- Suscripción SaaS
- Licencias profesionales
- B2B
- Servicios personalizados

Validación:
- Stand en VDS
- Dos incubadoras
- Premio Mejor Proyecto ETSE-UV
- Testeo con usuarios reales

Ventajas:
- Inclusión desde el diseño
- IA + hardware
- Alta personalización
- Comunidad temprana

Objetivo:
Escalar desde early adopters al mercado global.

Tono del chatbot:
- Cercano
- Profesional
- Claro
- Inspirador
- Enfocado en impacto y tecnología

Instrucciones adicionales:
- Responde en el mismo idioma en que te pregunten (español o inglés)
- Sé conciso pero informativo (2-3 frases máximo por respuesta, salvo que requieran más detalle)
- Si preguntan por precios o disponibilidad, indica que están en fase Pre-Seed y pueden solicitar información en el formulario de contacto
- Siempre responde alineado con los valores de AIntegra`

// Initialize Groq client (uses OpenAI SDK with custom baseURL)
const getGroqClient = () => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
        console.warn("No Groq API key found - using demo mode")
        return null
    }

    try {
        return new OpenAI({
            apiKey: apiKey,
            baseURL: "https://api.groq.com/openai/v1",
            dangerouslyAllowBrowser: true
        })
    } catch (err) {
        console.error("Error initializing Groq:", err)
        return null
    }
}

// Demo mode responses when no API key is available
const DEMO_RESPONSES = {
    es: {
        default: "¡Gracias por tu interés en AIntegra! 🚀 Para más información, te invito a explorar nuestra web o contactarnos a través del formulario.",
        greeting: "¡Hola! 👋 Soy el asistente de AIntegra en modo demo. Puedo contarte sobre nuestros productos, misión y equipo. ¿Qué te gustaría saber?",
        patterns: [
            { keywords: ["qué es", "que es", "aintegra", "empresa", "startup"], response: "AIntegra es una startup tecnológica nacida en la Universitat de València. Desarrollamos tecnología de asistencia que permite controlar el ordenador mediante voz y gestos, haciendo la tecnología más accesible e inclusiva. 🎯" },
            { keywords: ["producto", "productos", "cat", "kira", "ofrecen"], response: "Tenemos dos productos principales:\n\n🔹 **C.A.T.** (Cognitive Assistive Trackpad): Un trackpad inteligente con control por gestos.\n\n🔹 **Kira**: Nuestro asistente de IA que permite controlar el ordenador por voz.\n\nAmbos están diseñados para la accesibilidad." },
            { keywords: ["misión", "mision", "objetivo"], response: "Nuestra misión es eliminar barreras digitales y democratizar el acceso a la tecnología. Queremos que cualquier persona pueda usar un ordenador de forma natural e intuitiva. 🌍" },
            { keywords: ["visión", "vision", "futuro"], response: "Nuestra visión es convertirnos en referencia internacional en interfaces inteligentes inclusivas, cambiando la forma en que las personas interactúan con la tecnología. ✨" },
            { keywords: ["equipo", "team", "fundadores", "quiénes", "quienes"], response: "AIntegra fue fundada por Sergio Sabater (CEO) y Nerea Panadero (CTO). Ambos son graduados de la Universitat de València y están especializados en IA y accesibilidad. 👥" },
            { keywords: ["precio", "coste", "costo", "cuánto", "cuanto", "pagar"], response: "Actualmente estamos en fase Pre-Seed desarrollando nuestro MVP. Para información sobre precios y disponibilidad, te invito a contactarnos a través del formulario de contacto. 📧" },
            { keywords: ["invertir", "inversión", "inversion", "inversor", "investors"], response: "Estamos buscando inversores estratégicos para nuestra ronda Pre-Seed de €150K. Si te interesa invertir en accesibilidad e IA, contáctanos a través del formulario. 💼" },
            { keywords: ["accesibilidad", "discapacidad", "inclusivo", "inclusión"], response: "La accesibilidad está en el corazón de AIntegra. Nuestro enfoque principal son personas con discapacidad visual, aunque nuestra tecnología beneficia a cualquier usuario que busque una interacción más natural con el ordenador. ♿" },
            { keywords: ["contacto", "contactar", "email", "correo"], response: "¡Nos encantaría saber de ti! Puedes contactarnos a través del formulario en la sección de contacto de esta web. También puedes seguirnos en LinkedIn para más novedades. 📬" },
            { keywords: ["hola", "hello", "hey", "buenas"], response: "¡Hola! 👋 Encantado de saludarte. Soy el asistente virtual de AIntegra. ¿En qué puedo ayudarte?" },
            { keywords: ["gracias", "thanks", "thank you"], response: "¡De nada! 😊 Si tienes más preguntas sobre AIntegra, estaré encantado de ayudarte." },
            { keywords: ["premios", "reconocimientos", "awards", "logros"], response: "Hemos recibido varios reconocimientos:\n\n🏆 3er puesto en MOTIVEM Fest 2024\n🚀 Seleccionados por IAtecUV y Startup Valencia\n🎓 Mejor Proyecto ETSE-UV\n📢 Presentación en Valencia Digital Summit" }
        ]
    },
    en: {
        default: "Thanks for your interest in AIntegra! 🚀 For more information, feel free to explore our website or contact us through the form.",
        greeting: "Hello! 👋 I'm AIntegra's assistant in demo mode. I can tell you about our products, mission, and team. What would you like to know?",
        patterns: [
            { keywords: ["what is", "aintegra", "company", "startup"], response: "AIntegra is a tech startup born at the Universitat de València. We develop assistive technology that allows you to control your computer using voice and gestures, making technology more accessible and inclusive. 🎯" },
            { keywords: ["product", "products", "cat", "kira", "offer"], response: "We have two main products:\n\n🔹 **C.A.T.** (Cognitive Assistive Trackpad): An intelligent trackpad with gesture control.\n\n🔹 **Kira**: Our AI assistant that lets you control your computer by voice.\n\nBoth are designed for accessibility." },
            { keywords: ["mission", "objective", "goal"], response: "Our mission is to eliminate digital barriers and democratize access to technology. We want anyone to be able to use a computer naturally and intuitively. 🌍" },
            { keywords: ["vision", "future"], response: "Our vision is to become an international reference in inclusive intelligent interfaces, changing the way people interact with technology. ✨" },
            { keywords: ["team", "founders", "who"], response: "AIntegra was founded by Sergio Sabater (CEO) and Nerea Panadero (CTO). Both are graduates from Universitat de València and specialize in AI and accessibility. 👥" },
            { keywords: ["price", "cost", "how much", "pay"], response: "We're currently in Pre-Seed phase developing our MVP. For pricing and availability information, please contact us through the contact form. 📧" },
            { keywords: ["invest", "investment", "investor"], response: "We're looking for strategic investors for our €150K Pre-Seed round. If you're interested in investing in accessibility and AI, contact us through the form. 💼" },
            { keywords: ["accessibility", "disability", "inclusive", "inclusion"], response: "Accessibility is at the heart of AIntegra. Our main focus is people with visual impairment, though our technology benefits anyone seeking more natural computer interaction. ♿" },
            { keywords: ["contact", "email"], response: "We'd love to hear from you! You can contact us through the form in the contact section of this website. Also follow us on LinkedIn for updates. 📬" },
            { keywords: ["hello", "hi", "hey"], response: "Hello! 👋 Nice to meet you. I'm AIntegra's virtual assistant. How can I help you?" },
            { keywords: ["thanks", "thank you"], response: "You're welcome! 😊 If you have more questions about AIntegra, I'll be happy to help." },
            { keywords: ["awards", "recognition", "achievements"], response: "We've received several recognitions:\n\n🏆 3rd place at MOTIVEM Fest 2024\n🚀 Selected by IAtecUV and Startup Valencia\n🎓 Best Project ETSE-UV\n📢 Presentation at Valencia Digital Summit" }
        ]
    }
}

// Get demo response based on user input
const getDemoResponse = (userInput, lang) => {
    const input = userInput.toLowerCase()
    const langResponses = DEMO_RESPONSES[lang] || DEMO_RESPONSES.es

    for (const pattern of langResponses.patterns) {
        if (pattern.keywords.some(keyword => input.includes(keyword))) {
            return pattern.response
        }
    }

    return langResponses.default
}

export default function Chatbot({ lang = "es" }) {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [conversationHistory, setConversationHistory] = useState([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [error, setError] = useState(null)
    const [client, setClient] = useState(null)
    const [isDemoMode, setIsDemoMode] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    const greetings = {
        es: "¡Hola! 👋 Soy el asistente virtual de AIntegra. ¿En qué puedo ayudarte hoy?",
        en: "Hello! 👋 I'm AIntegra's virtual assistant. How can I help you today?"
    }

    const placeholders = {
        es: "Escribe tu pregunta...",
        en: "Type your question..."
    }

    const errorMessages = {
        es: "Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.",
        en: "Sorry, an error occurred. Please try again."
    }

    const noApiKeyMessages = {
        es: "⚠️ El chatbot no está configurado. Contacta con el administrador.",
        en: "⚠️ Chatbot is not configured. Please contact the administrator."
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const groqClient = getGroqClient()
            if (groqClient) {
                setClient(groqClient)
                setIsDemoMode(false)
                setConversationHistory([
                    { role: "system", content: SYSTEM_PROMPT }
                ])
                setMessages([{ role: "bot", text: greetings[lang] || greetings.es }])
            } else {
                // Demo mode - no API key
                setIsDemoMode(true)
                const demoGreeting = DEMO_RESPONSES[lang]?.greeting || DEMO_RESPONSES.es.greeting
                setMessages([{ role: "bot", text: demoGreeting }])
            }
        }
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen])

    const handleSend = async () => {
        if (!input.trim()) return

        // Demo mode doesn't require a client
        if (!client && !isDemoMode) return

        const userMessage = input.trim()
        setInput("")
        setError(null)
        setMessages(prev => [...prev, { role: "user", text: userMessage }])
        setIsTyping(true)

        // Demo mode - use predefined responses
        if (isDemoMode) {
            setTimeout(() => {
                const demoResponse = getDemoResponse(userMessage, lang)
                setMessages(prev => [...prev, { role: "bot", text: demoResponse }])
                setIsTyping(false)
            }, 500 + Math.random() * 1000) // Simulate typing delay
            return
        }

        // API mode
        const newHistory = [...conversationHistory, { role: "user", content: userMessage }]
        setConversationHistory(newHistory)

        try {
            const completion = await client.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: newHistory,
                max_tokens: 500,
                temperature: 0.7
            })

            const assistantMessage = completion.choices[0].message.content

            setConversationHistory(prev => [...prev, { role: "assistant", content: assistantMessage }])
            setMessages(prev => [...prev, { role: "bot", text: assistantMessage }])
        } catch (err) {
            console.error("Groq error:", err)
            setError(errorMessages[lang] || errorMessages.es)
            setMessages(prev => [...prev, { role: "bot", text: errorMessages[lang] || errorMessages.es, isError: true }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl"
                style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: isOpen
                        ? "0 0 0 rgba(99, 102, 241, 0)"
                        : ["0 0 20px rgba(99, 102, 241, 0.5)", "0 0 40px rgba(139, 92, 246, 0.4)", "0 0 20px rgba(99, 102, 241, 0.5)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: "linear-gradient(180deg, rgba(15, 15, 20, 0.98) 0%, rgba(10, 10, 15, 0.99) 100%)",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            backdropFilter: "blur(20px)"
                        }}
                    >
                        <div
                            className="p-4 border-b border-white/10"
                            style={{
                                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)"
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{
                                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                        }}
                                    >
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">AIntegra Assistant</h3>
                                    <p className="text-xs text-neutral-400">Powered by AI ✨</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-80 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user"
                                        ? "bg-gradient-to-br from-fuchsia-500 to-pink-500"
                                        : msg.isError
                                            ? "bg-gradient-to-br from-red-500 to-orange-500"
                                            : "bg-gradient-to-br from-indigo-500 to-purple-500"
                                        }`}>
                                        {msg.role === "user" ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : msg.isError ? (
                                            <AlertCircle className="w-4 h-4 text-white" />
                                        ) : (
                                            <Bot className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div className={`max-w-[75%] p-3 rounded-2xl ${msg.role === "user"
                                        ? "bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/30 rounded-br-md"
                                        : msg.isError
                                            ? "bg-red-500/10 border border-red-500/30 rounded-bl-md"
                                            : "bg-white/5 border border-white/10 rounded-bl-md"
                                        }`}>
                                        <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap"
                                            dangerouslySetInnerHTML={{
                                                __html: msg.text
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                                    .replace(/\n/g, '<br/>')
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            <motion.div
                                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={placeholders[lang] || placeholders.es}
                                    disabled={!client}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={!input.trim() || !client}
                                    className="p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: input.trim() && client
                                            ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                            : "rgba(255,255,255,0.1)"
                                    }}
                                    whileHover={input.trim() && client ? { scale: 1.05 } : {}}
                                    whileTap={input.trim() && client ? { scale: 0.95 } : {}}
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
