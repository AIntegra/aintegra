import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import emailjs from "emailjs-com"
import { useState } from "react"

export default function CTA({ lang = "es" }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Textos bilingües
  const text = {
    es: {
      title: "Súmate a la revolución de la accesibilidad.",
      subtitle:
        "¿Tienes preguntas, propuestas o deseas saber más sobre nuestro proyecto? Envíanos un mensaje y te responderemos pronto.",
      name: "Nombre",
      email: "Correo electrónico",
      message: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando...",
      success: "✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!",
      error: "❌ Error al enviar. Inténtalo de nuevo más tarde."
    },
    en: {
      title: "Join the accessibility revolution.",
      subtitle:
        "Have questions, proposals, or want to learn more about our project? Send us a message and we’ll get back to you soon.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending...",
      success: "✅ Message sent successfully. Thank you for reaching out!",
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 
                 bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-fuchsia-500/10 
                 p-8 md:p-12 text-center md:text-left shadow-[0_0_30px_rgba(139,92,246,0.15)]"
    >
      <div className="md:flex md:items-center md:justify-between gap-10">
        {/* Texto */}
        <div>
          <h3 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t.title}
          </h3>
          <p className="mt-2 text-neutral-200 max-w-xl">{t.subtitle}</p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 md:mt-0 flex flex-col gap-3 bg-white/5 p-5 rounded-2xl border border-white/10 w-full max-w-sm"
        >
          <input
            required
            type="text"
            name="name"
            placeholder={t.name}
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl bg-white/10 text-white px-4 py-2 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            required
            type="email"
            name="email"
            placeholder={t.email}
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl bg-white/10 text-white px-4 py-2 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            required
            name="message"
            rows="3"
            placeholder={t.message}
            value={formData.message}
            onChange={handleChange}
            className="rounded-xl bg-white/10 text-white px-4 py-2 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-5 py-2 text-sm font-medium shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />
            {loading ? t.sending : t.send}
          </button>

          {sent && <p className="text-green-400 text-xs mt-2">{t.success}</p>}
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </form>
      </div>
    </motion.section>
  )
}
