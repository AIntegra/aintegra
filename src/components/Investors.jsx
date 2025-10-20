import { motion } from "framer-motion"
import { TrendingUp, Users, Globe, Target, Rocket, PieChart } from "lucide-react"

export default function Investors({ t }) {
    const iconMap = [TrendingUp, Users, Globe, Target, Rocket, PieChart]

    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">{t.investors.badge}</span>
                </div>
                <h2
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    style={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {t.investors.title}
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                    {t.investors.subtitle}
                </p>
            </motion.div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {t.investors.metrics.map((metric, i) => {
                    const Icon = iconMap[i] || TrendingUp
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="card p-6 text-center group"
                        >
                            <div className="relative inline-flex mb-3">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                                <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
                                    <Icon className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>
                            <p
                                className="text-3xl md:text-4xl font-bold mb-1"
                                style={{
                                    background: "linear-gradient(135deg, #60a5fa, #38bdf8)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                {metric.value}
                            </p>
                            <p className="text-sm text-neutral-400">{metric.label}</p>
                        </motion.div>
                    )
                })}
            </div>

            {/* Investment Opportunity Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

                <div className="relative grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{t.investors.opportunity.title}</h3>
                        <p className="text-neutral-300 leading-relaxed mb-6">
                            {t.investors.opportunity.description}
                        </p>
                        <ul className="space-y-3">
                            {t.investors.opportunity.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                                    <span className="text-neutral-300">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center">
                        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                            <p className="text-sm text-neutral-400 mb-2">{t.investors.opportunity.seeking}</p>
                            <p
                                className="text-4xl md:text-5xl font-bold mb-4"
                                style={{
                                    background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                {t.investors.opportunity.amount}
                            </p>
                            <p className="text-sm text-neutral-400">{t.investors.opportunity.round}</p>
                        </div>
                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Rocket className="w-4 h-4" />
                            {t.investors.opportunity.cta}
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
