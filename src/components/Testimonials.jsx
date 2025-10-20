import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"

export default function Testimonials({ t }) {
    return (
        <section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                    <Quote className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-300">{t.testimonials.badge}</span>
                </div>
                <h2
                    className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                    style={{
                        background: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {t.testimonials.title}
                </h2>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                                <p className="text-sm text-neutral-400">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
