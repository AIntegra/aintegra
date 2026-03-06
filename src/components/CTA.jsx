import { motion } from "framer-motion"
import { CalendarCheck, Send, Building2, Sparkles, Clock } from "lucide-react"
import emailjs from "emailjs-com"
import { useState } from "react"

export default function CTA({ lang = "es" }) {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", usecase: "", notes: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const text = {
    es: {
      eyebrow: "Empieza hoy",
      badge: "30 min · Sin compromiso",
      title: "Ve AIntegra en acción.",
      subtitle: "Agenda tu demo personalizada. Kira y C.A.T. adaptados a tu organización.",
      name: "Nombre completo", company: "Empresa u organización",
      email: "Email corporativo", usecase: "¿Para qué lo usarías?",
      usecaseOptions: [
        { value: "", label: "Selecciona una opción" },
        { value: "asociacion", label: "Asociación / Fundación (Distribuir)" },
        { value: "empresa", label: "Empresa (Inclusión laboral)" },
        { value: "usuario", label: "Usuario particular" },
        { value: "otro", label: "Otro" },
      ],
      notes: "¿Algo más? (opcional)",
      send: "Agendar Demo", sending: "Enviando...",
      success: "¡Solicitud recibida! Te contactamos en menos de 24h.",
      error: "Error al enviar. Inténtalo de nuevo.",
      trust: ["Respuesta en < 24 horas", "Para empresas e instituciones", "Demo personalizada"],
    },
    en: {
      eyebrow: "Get started",
      badge: "30 min · No commitment",
      title: "See AIntegra in action.",
      subtitle: "Book your personalized demo. Kira and C.A.T. tailored to your organization.",
      name: "Full name", company: "Company or organization",
      email: "Work email", usecase: "What would you use it for?",
      usecaseOptions: [
        { value: "", label: "Select an option" },
        { value: "association", label: "Association / Foundation (Distribute)" },
        { value: "company", label: "Company (Inclusive workplace)" },
        { value: "individual", label: "Individual user" },
        { value: "other", label: "Other" },
      ],
      notes: "Anything else? (optional)",
      send: "Book My Demo", sending: "Sending...",
      success: "Request received! We'll reach out within 24 hours.",
      error: "Error sending. Please try again.",
      trust: ["Response in < 24h", "For companies & institutions", "Personalized demo"],
    }
  }

  const t = text[lang]
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email, company: formData.company, usecase: formData.usecase, message: formData.notes || "—" },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSent(true)
      setFormData({ name: "", company: "", email: "", usecase: "", notes: "" })
    } catch (err) {
      console.error(err)
      setError(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="apple-panel"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.25) 0%, #000 55%)",
        color: "white", minHeight: "auto", paddingBottom: 100
      }}
    >
      <div style={{ maxWidth: 880, width: "100%", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <p className="apple-eyebrow grad-text" style={{ marginBottom: 10 }}>
            {t.eyebrow}
          </p>
          <h2 className="apple-headline" style={{ color: "white" }}>
            {t.title}
          </h2>
          <p className="apple-sub light-mid" style={{ marginTop: 16 }}>
            {t.subtitle}
          </p>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            marginTop: 20, padding: "8px 18px", borderRadius: 980,
            background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)"
          }}>
            <Clock size={14} color="#60a5fa" />
            <span style={{ color: "#93c5fd", fontSize: 14 }}>{t.badge}</span>
          </div>
        </motion.div>

        <motion.div
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "start"
          }}
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Left: Trust signals */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: Clock, text: t.trust[0] },
                { icon: Building2, text: t.trust[1] },
                { icon: Sparkles, text: t.trust[2] },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <item.icon size={18} color="#60a5fa" />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 16 }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Platform recap */}
            <div style={{
              marginTop: 40, padding: "24px", borderRadius: 20,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)"
            }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                {lang === "es" ? "Incluye acceso a" : "Includes access to"}
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {["Kira", "C.A.T."].map((prod, i) => (
                  <div key={i} style={{
                    flex: 1, padding: "12px 16px", borderRadius: 14,
                    background: i === 0 ? "rgba(124,58,237,0.15)" : "rgba(16,185,129,0.12)",
                    border: `1px solid ${i === 0 ? "rgba(124,58,237,0.3)" : "rgba(16,185,129,0.25)"}`,
                    textAlign: "center"
                  }}>
                    <div style={{ fontWeight: 700, color: "white", fontSize: 16 }}>{prod}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "60px 0" }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, #059669, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px"
              }}>
                <CalendarCheck size={32} color="white" />
              </div>
              <p style={{ color: "#6ee7b7", fontSize: 18, fontWeight: 500 }}>{t.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input required type="text" name="name" placeholder={t.name} value={formData.name} onChange={handleChange} className="apple-input" />
              <input required type="text" name="company" placeholder={t.company} value={formData.company} onChange={handleChange} className="apple-input" />
              <input required type="email" name="email" placeholder={t.email} value={formData.email} onChange={handleChange} className="apple-input" />
              <select required name="usecase" value={formData.usecase} onChange={handleChange} className="apple-input" style={{ cursor: "pointer" }}>
                {t.usecaseOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <textarea name="notes" rows={3} placeholder={t.notes} value={formData.notes} onChange={handleChange} className="apple-input" style={{ resize: "none" }} />
              <motion.button
                type="submit" disabled={loading}
                className="apple-btn apple-btn-grad"
                style={{ width: "100%", justifyContent: "center", marginTop: 4, fontSize: 17, padding: "14px 28px" }}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              >
                {loading ? <><Send size={18} />{t.sending}</> : <><CalendarCheck size={18} />{t.send}</>}
              </motion.button>
              {error && <p style={{ color: "#f87171", fontSize: 14, textAlign: "center" }}>{error}</p>}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
