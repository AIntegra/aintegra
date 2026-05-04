import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

export default function Testimonials({ t }) {
    return (
        <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-300/20 mb-6">
                    <Quote className="w-4 h-4 text-sky-300" />
                    <span className="text-sm font-medium text-sky-200">{t.testimonials.badge}</span>
                </div>
                <h2
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    style={{
                        background: "linear-gradient(135deg, #3E89BB 0%, #3E89BB 50%, #87ADC6 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {t.testimonials.title}
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    {t.testimonials.subtitle}
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.testimonials.items.map((testimonial, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="card p-6 group relative overflow-hidden"
                    >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-sky-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Quote icon */}
                        <div className="relative mb-4">
                            <Quote className="w-8 h-8 text-emerald-500/30" />
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        {/* Quote text */}
                        <p className="relative text-neutral-300 leading-relaxed mb-6 italic">
                            "{testimonial.quote}"
                        </p>

                        {/* Author */}
                        <div className="relative flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                                {testimonial.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{testimonial.name}</p>
                                <p className="text-sm text-slate-300">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
