import { motion } from "framer-motion"
import { Mail, Send, Sparkles } from "lucide-react"
import emailjs from "emailjs-com"
import { useState } from "react"

export default function CTA({ lang = "es" }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const text = {
    es: {
      title: "Súmate a la revolución de la accesibilidad.",
      subtitle:
        "¿Tienes preguntas, propuestas o deseas saber más? Envíanos un mensaje y te responderemos pronto.",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      send: "Enviarensaje",
      sending: "Enviando...",
      success: "✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!",
      error: "❌ Error al enviar. Inténtalo de nuevo más tarde."
    },
    en: {
      title: "Join the accessibility revolution.",
      subtitle:
        "Have questions or want to learn more? Send us a message and we'll get back to you soon.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "✅ Message sent successfully. Thank you!",
      error: "❌ Error sending message. Please try again later."
    }
  }

  const t = text[lang]

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      console.error(err)
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto"
      >
        <div className="card p-12 md:p-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-fuchsia-500/20 to-transparent rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-medium text-indigo-300">Get in Touch</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
                  {t.title}
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  {t.subtitle}
                </p>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder={t.name}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-5 py-3 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder={t.email}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-5 py-3 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <textarea
                  required
                  name="message"
                  rows="4"
                  placeholder={t.message}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-5 py-3 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="h-5 w-5" />
                {loading ? t.sending : t.send}
              </motion.button>

              {sent && <p className="text-green-400 text-sm text-center">{t.success}</p>}
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            </motion.form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
