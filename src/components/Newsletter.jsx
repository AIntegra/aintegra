import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Sparkles, CheckCircle, Loader2 } from "lucide-react"

export default function Newsletter({ t }) {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("idle") // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email.trim()) return

        setStatus("loading")

        // Simulate API call - replace with real endpoint
        setTimeout(() => {
            setStatus("success")
            setEmail("")
        }, 1500)
    }

    return (
        <section className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 md:p-12 text-center relative overflow-hidden"
            >
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-6"
                    >
                        <Mail className="w-8 h-8 text-white" />
                    </motion.div>

                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{
                            background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        {t.newsletter.title}
                    </h2>

                    <p className="text-neutral-400 max-w-xl mx-auto mb-8">
                        {t.newsletter.subtitle}
                    </p>

                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-center gap-3 text-emerald-400"
                        >
                            <CheckCircle className="w-6 h-6" />
                            <span className="font-medium">{t.newsletter.success}</span>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t.newsletter.placeholder}
                                required
                                className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                            />
                            <motion.button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-6 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 disabled:opacity-70"
                                style={{
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)"
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {status === "loading" ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        {t.newsletter.button}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    )}

                    <p className="text-xs text-neutral-500 mt-4">
                        {t.newsletter.privacy}
                    </p>
                </div>
            </motion.div>
        </section>
    )
}
