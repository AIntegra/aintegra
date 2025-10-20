import { motion } from "framer-motion"
import { Rocket, CheckCircle2, Circle, Clock } from "lucide-react"

export default function Roadmap({ t }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            case "current":
                return <Clock className="w-5 h-5 text-amber-400" />
            default:
                return <Circle className="w-5 h-5 text-neutral-500" />
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "from-emerald-500 to-teal-500"
            case "current":
                return "from-amber-500 to-orange-500"
            default:
                return "from-neutral-600 to-neutral-700"
        }
    }

    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                    <Rocket className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-300">{t.roadmap.badge}</span>
                </div>
                <h2
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    style={{
                        background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {t.roadmap.title}
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                    {t.roadmap.subtitle}
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative max-w-4xl mx-auto">
                {/* Vertical line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-500 to-neutral-700" />

                {t.roadmap.milestones.map((milestone, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Connector dot */}
                        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getStatusColor(milestone.status)} flex items-center justify-center shadow-lg`}>
                                {getStatusIcon(milestone.status)}
                            </div>
                        </div>

                        {/* Content card */}
                        <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"}`}>
                            <div className="card p-6 group">
                                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${milestone.status === "completed"
                                        ? "bg-emerald-500/20 text-emerald-300"
                                        : milestone.status === "current"
                                            ? "bg-amber-500/20 text-amber-300"
                                            : "bg-neutral-700/50 text-neutral-400"
                                    }`}>
                                    {milestone.date}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                                <p className="text-neutral-400 text-sm">{milestone.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
