import { motion } from "framer-motion"
import { Check, X, Minus, Zap } from "lucide-react"

export default function Comparison({ t }) {
    const getFeatureIcon = (value) => {
        if (value === true) return <Check className="w-5 h-5 text-emerald-400" />
        if (value === false) return <X className="w-5 h-5 text-red-400" />
        if (value === "partial") return <Minus className="w-5 h-5 text-amber-400" />
        return <span className="text-sm text-neutral-300">{value}</span>
    }

    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-300">{t.comparison.badge}</span>
                </div>
                <h2
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    style={{
                        background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #67e8f9 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {t.comparison.title}
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                    {t.comparison.subtitle}
                </p>
            </motion.div>

            {/* Comparison Table */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-x-auto"
            >
                <div className="min-w-[600px]">
                    {/* Header */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="p-4">
                            <span className="text-neutral-500 font-medium">{t.comparison.featureLabel}</span>
                        </div>
                        {t.comparison.competitors.map((comp, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-xl text-center ${comp.isUs
                                        ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50"
                                        : "bg-white/5 border border-white/10"
                                    }`}
                            >
                                <span className={`font-bold ${comp.isUs ? "text-indigo-300" : "text-neutral-300"}`}>
                                    {comp.name}
                                </span>
                                {comp.isUs && (
                                    <span className="block text-xs text-indigo-400 mt-1">{t.comparison.recommended}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Features */}
                    {t.comparison.features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="grid grid-cols-4 gap-4 py-4 border-t border-white/5"
                        >
                            <div className="p-4 flex items-center">
                                <span className="text-neutral-300">{feature.name}</span>
                            </div>
                            {feature.values.map((value, j) => (
                                <div
                                    key={j}
                                    className={`p-4 flex items-center justify-center rounded-lg ${t.comparison.competitors[j]?.isUs ? "bg-indigo-500/5" : ""
                                        }`}
                                >
                                    {getFeatureIcon(value)}
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-neutral-400">{t.comparison.legend.yes}</span>
                </div>
                <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" />
                    <span className="text-neutral-400">{t.comparison.legend.no}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Minus className="w-4 h-4 text-amber-400" />
                    <span className="text-neutral-400">{t.comparison.legend.partial}</span>
                </div>
            </div>
        </section>
    )
}
