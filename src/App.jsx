import { useEffect, useMemo, useState } from "react"
import emailjs from "emailjs-com"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Menu,
  Send,
  ShieldCheck,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react"
import CookieBanner from "./components/CookieBanner"
import { useCookieConsent } from "./hooks/useCookieConsent"

function loadGA(trackingId) {
  if (!trackingId || document.getElementById("ga-script")) return
  const script = document.createElement("script")
  script.id = "ga-script"
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  script.async = true
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag("js", new Date())
  gtag("config", trackingId)
}

const CONTENT = {
  es: {
    lang: "EN",
    nav: ["Diagnóstico", "Sistema", "Usuarios", "Validación", "FAQ"],
    navCta: "Agendar demo",
    heroKicker: "CAT + CATY · Accesibilidad inteligente",
    heroTitle: "Controlar un ordenador puede volver a sentirse natural.",
    heroText:
      "AIntegra combina hardware propio e IA local para que personas con barreras de interacción ganen autonomía digital. Una demo clara, tangible y lista para validar pilotos reales.",
    primary: "Agendar demo",
    secondary: "Ver sistema",
    proof: ["Privacidad local", "Hardware propio", "Pilotos B2B"],
    trust: "Ecosistema de validación",
    sectionLabels: {
      diagnosis: "El cambio",
      system: "Producto",
      users: "Pilotos",
      outcomes: "Valor",
      validation: "Confianza",
      founders: "Fundadores",
      faq: "Dudas frecuentes",
    },
    diagnosisTitle: "El problema no es la persona. Es la interfaz.",
    diagnosisText:
      "La mayoría de herramientas obliga al usuario a ajustarse al ordenador. AIntegra invierte esa lógica: el sistema observa el gesto, interpreta el contexto y ejecuta la acción correcta.",
    pains: [
      ["Interacción rígida", "Ratón, teclado y comandos estándar no representan la diversidad de movimiento, visión o ritmo."],
      ["Dependencia operativa", "Tareas sencillas terminan necesitando apoyo externo, reduciendo autonomía y confianza digital."],
      ["Datos sensibles", "Salud, educación y administración necesitan control local, trazabilidad y mínima exposición."],
    ],
    systemTitle: "CAT es el trackpad. CATY es el asistente que lo entiende.",
    systemText:
      "CAT recoge el gesto físico del usuario. CATY interpreta ese gesto en contexto y lo transforma en acciones útiles dentro del ordenador.",
    cat: {
      title: "CAT",
      label: "Trackpad adaptativo",
      text: "El dispositivo físico de AIntegra. Aprende variaciones del usuario, tolera fatiga y permite controlar el ordenador mediante gestos personalizados.",
    },
    caty: {
      title: "CATY",
      label: "Asistente virtual",
      text: "El asistente virtual que acompaña al usuario por voz. Puede leer, resumir webs y documentos, y ayudar a ejecutar acciones sin depender de interfaces complejas.",
    },
    process: ["Gesto real", "Contexto local", "Acción digital"],
    usersTitle: "Diseñado para convertir interés en pilotos.",
    users: [
      ["Usuario individual", "Autonomía digital para personas con barreras visuales, motoras, cognitivas o de edad.", Users],
      ["Asociaciones y fundaciones", "Pilotos con comunidades reales, métricas de impacto y soporte de implantación.", Building2],
      ["Empresas e instituciones", "Inclusión laboral, accesibilidad operativa y despliegues controlados por equipos.", Target],
    ],
    outcomesTitle: "Lo que el cliente entiende en los primeros minutos.",
    outcomes: [
      "Accesibilidad desde el diseño, no como parche final",
      "Hardware tangible que diferencia la propuesta",
      "Arquitectura orientada a privacidad y RGPD",
      "Pilotos medibles para validar adopción e impacto",
    ],
    validationTitle: "Credibilidad para abrir puertas.",
    foundersTitle: "Detrás de AIntegra hay producto, impacto y mucha calle.",
    foundersText:
      "Un equipo fundador construyendo desde la ingeniería, la accesibilidad y la validación con usuarios reales.",
    foundersLinks: {
      nerea: "Portfolio de Nerea",
      sergio: "Portfolio de Sergio",
    },
    founderRoles: {
      nerea: ["Nerea Panadero", "CEO & Co-Founder"],
      sergio: ["Sergio Sabater", "CTO & Co-Founder"],
    },
    validation: [
      "Ganadores de la Xarxa de Preincubadoras ETSE-UV",
      "Premio al mejor pitch en ciberseguridad de Startup Valencia",
      "Apoyo de UVemprén, IAtecUV, Parc Científic UV, ONCE y Fundación ONCE",
      "Siguiente hito: MVP funcional y pilotos controlados",
    ],
    faqTitle: "Preguntas habituales antes de agendar.",
    faq: [
      ["¿Está listo para venderse?", "Está en fase de validación y preparación de MVP. La demo sirve para valorar pilotos, casos de uso y colaboraciones."],
      ["¿Es solo software?", "No. CAT es hardware propio y CATY es la capa de inteligencia local que lo potencia."],
      ["¿Qué perfiles encajan mejor?", "Usuarios con dificultades de interacción y organizaciones que necesitan desplegar accesibilidad digital real."],
      ["¿Cómo se trata la privacidad?", "La arquitectura prioriza procesamiento local, minimización de datos y cumplimiento RGPD."],
    ],
    contactTitle: "Agenda una demo. Valida el caso. Decide el piloto.",
    contactText:
      "Una llamada breve para ver CAT, entender cómo CATY encaja en tu contexto y decidir si tiene sentido preparar un piloto.",
    contactPoints: ["Demo guiada de 20 minutos", "Enfoque en tu caso real", "Siguiente paso claro"],
    success: "Solicitud recibida. Te contactaremos en menos de 24 horas.",
    error: "No se pudo enviar. Inténtalo de nuevo o escribe a hola@aintegra.ai.",
    form: {
      name: "Nombre completo",
      email: "Email",
      org: "Organización",
      profile: "Perfil",
      interest: "Interés principal",
      message: "Cuéntanos tu caso (opcional)",
      submit: "Enviar solicitud",
      sending: "Enviando...",
      profiles: ["Usuario", "Asociación/Fundación", "Empresa", "Institución", "Otro"],
      interests: ["Agendar demo", "Solicitar piloto", "Accesibilidad para usuarios", "Inclusión laboral", "Alianza estratégica"],
    },
  },
  en: {
    lang: "ES",
    nav: ["Diagnosis", "System", "Users", "Validation", "FAQ"],
    navCta: "Book demo",
    heroKicker: "CAT + CATY · Intelligent accessibility",
    heroTitle: "Using a computer can feel natural again.",
    heroText:
      "AIntegra combines proprietary hardware and local AI so people facing interaction barriers can gain digital autonomy. A clear, tangible demo built to validate real pilots.",
    primary: "Book demo",
    secondary: "See system",
    proof: ["Local privacy", "Own hardware", "B2B pilots"],
    trust: "Validation ecosystem",
    sectionLabels: {
      diagnosis: "The shift",
      system: "Product",
      users: "Pilots",
      outcomes: "Value",
      validation: "Trust",
      founders: "Founders",
      faq: "Questions",
    },
    diagnosisTitle: "The problem is not the person. It is the interface.",
    diagnosisText:
      "Most tools force the user to adapt to the computer. AIntegra reverses that logic: the system observes the gesture, reads context and executes the right action.",
    pains: [
      ["Rigid interaction", "Mouse, keyboard and standard commands do not represent diverse movement, vision or pace."],
      ["Operational dependence", "Simple tasks end up requiring external support, reducing autonomy and digital confidence."],
      ["Sensitive data", "Health, education and administration need local control, traceability and minimum exposure."],
    ],
    systemTitle: "CAT is the trackpad. CATY is the assistant that understands it.",
    systemText:
      "CAT captures the user's physical gesture. CATY interprets that gesture in context and turns it into useful computer actions.",
    cat: {
      title: "CAT",
      label: "Adaptive trackpad",
      text: "AIntegra's physical device. It learns user variation, tolerates fatigue and enables computer control through personalized gestures.",
    },
    caty: {
      title: "CATY",
      label: "Virtual assistant",
      text: "The virtual assistant that supports the user by voice. It can read, summarize websites and documents, and help execute actions without complex interfaces.",
    },
    process: ["Real gesture", "Local context", "Digital action"],
    usersTitle: "Designed to turn interest into pilots.",
    users: [
      ["Individual user", "Digital autonomy for people with visual, motor, cognitive or age-related barriers.", Users],
      ["Associations and foundations", "Pilots with real communities, impact metrics and implementation support.", Building2],
      ["Companies and institutions", "Workplace inclusion, operational accessibility and controlled deployments.", Target],
    ],
    outcomesTitle: "What the customer understands in the first minutes.",
    outcomes: [
      "Accessibility from design, not as a final patch",
      "Tangible hardware that differentiates the offer",
      "Architecture oriented to privacy and GDPR",
      "Measurable pilots to validate adoption and impact",
    ],
    validationTitle: "Credibility that opens doors.",
    foundersTitle: "Behind AIntegra: product, impact and real-world validation.",
    foundersText:
      "A founding team building from engineering, accessibility and validation with real users.",
    foundersLinks: {
      nerea: "Nerea's portfolio",
      sergio: "Sergio's portfolio",
    },
    founderRoles: {
      nerea: ["Nerea Panadero", "CEO & Co-Founder"],
      sergio: ["Sergio Sabater", "CTO & Co-Founder"],
    },
    validation: [
      "Winners of the ETSE-UV Pre-incubators Network",
      "Best cybersecurity pitch award from Startup Valencia",
      "Support from UVemprén, IAtecUV, Parc Científic UV, ONCE and Fundación ONCE",
      "Next milestone: functional MVP and controlled pilots",
    ],
    faqTitle: "Common questions before booking.",
    faq: [
      ["Is it ready to sell?", "It is in validation and MVP preparation. The demo helps assess pilots, use cases and collaborations."],
      ["Is it software-only?", "No. CAT is proprietary hardware and CATY is the local intelligence layer that powers it."],
      ["Who fits best?", "Users with interaction difficulties and organizations that need to deploy real digital accessibility."],
      ["How is privacy handled?", "The architecture prioritizes local processing, data minimization and GDPR alignment."],
    ],
    contactTitle: "Book a demo. Validate the case. Define the pilot.",
    contactText:
      "A short call to see CAT, understand how CATY fits your context and decide whether a pilot makes sense.",
    contactPoints: ["20-minute guided demo", "Focused on your real case", "Clear next step"],
    success: "Request received. We will contact you within 24 hours.",
    error: "We could not send it. Try again or email hola@aintegra.ai.",
    form: {
      name: "Full name",
      email: "Email",
      org: "Organization",
      profile: "Profile",
      interest: "Main interest",
      message: "Tell us about your case (optional)",
      submit: "Send request",
      sending: "Sending...",
      profiles: ["User", "Association/Foundation", "Company", "Institution", "Other"],
      interests: ["Book demo", "Request pilot", "Accessibility for users", "Inclusive workplace", "Strategic partnership"],
    },
  },
}

const navTargets = ["diagnosis", "system", "users", "validation", "faq"]

const partners = [
  { name: "Startup Valencia", src: "/logos/startupvalencia.png" },
  { name: "Universitat de València", src: "/logos/uv.png" },
  { name: "UVemprén", src: "/logos/uvempren.jpeg" },
  { name: "IAtecUV", src: "/logos/iatecuv.png" },
  { name: "ONCE", src: "/logos/once.png" },
  { name: "Inserta", src: "/logos/inserta.png" },
]

const founderPhotos = [
  "/team/media__1772837796935.png",
  "/team/media__1772837805329.jpg",
  "/team/media__1772837811703.jpg",
  "/team/media__1772837841446.jpg",
]

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("ain_lang") || "es")
  useEffect(() => { localStorage.setItem("ain_lang", lang) }, [lang])
  return { lang, setLang, t: useMemo(() => CONTENT[lang], [lang]) }
}

function NavBar({ lang, setLang, t }) {
  const [open, setOpen] = useState(false)
  const goTo = (event, hash) => {
    event.preventDefault()
    setOpen(false)
    if (window.location.hash !== hash) window.location.hash = hash
    const target = document.querySelector(hash)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <header className="lab-nav">
      <a className="lab-brand" href="#">
        <img src="/assets/logo_blanco.webp" alt="AIntegra" />
        <span>AIntegra Limited</span>
      </a>
      <nav className="lab-nav-links">
        {navTargets.map((target, index) => (
          <a key={target} href={`#${target}`} onClick={(event) => goTo(event, `#${target}`)}>{t.nav[index]}</a>
        ))}
      </nav>
      <div className="lab-nav-actions">
        <button type="button" className="lab-lang" onClick={() => setLang(lang === "en" ? "es" : "en")}>
          {t.lang}
        </button>
        <a className="lab-nav-cta" href="#contact" onClick={(event) => goTo(event, "#contact")}>{t.navCta}</a>
        <button type="button" className="lab-menu" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="lab-mobile-panel">
          {navTargets.map((target, index) => (
            <a key={target} href={`#${target}`} onClick={(event) => goTo(event, `#${target}`)}>{t.nav[index]}</a>
          ))}
          <a href="#contact" onClick={(event) => goTo(event, "#contact")}>{t.navCta}</a>
        </div>
      )}
    </header>
  )
}

function DemoForm({ t }) {
  const initial = { name: "", email: "", org: "", profile: "", interest: "", message: "" }
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState("idle")

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("sending")
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          company: form.org,
          usecase: `${form.profile} · ${form.interest}`,
          message: form.message || "Sin mensaje adicional",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setForm(initial)
      setStatus("sent")
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <form className="lab-form" onSubmit={handleSubmit}>
      <div className="lab-form-grid">
        <input required name="name" value={form.name} onChange={handleChange} placeholder={t.form.name} />
        <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder={t.form.email} />
      </div>
      <input required name="org" value={form.org} onChange={handleChange} placeholder={t.form.org} />
      <div className="lab-form-grid">
        <label>
          <select required name="profile" value={form.profile} onChange={handleChange}>
            <option value="">{t.form.profile}</option>
            {t.form.profiles.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <ChevronDown size={16} />
        </label>
        <label>
          <select required name="interest" value={form.interest} onChange={handleChange}>
            <option value="">{t.form.interest}</option>
            {t.form.interests.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <ChevronDown size={16} />
        </label>
      </div>
      <textarea name="message" value={form.message} onChange={handleChange} placeholder={t.form.message} rows={4} />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t.form.sending : t.form.submit}
        <Send size={17} />
      </button>
      {status === "sent" && <p className="lab-form-success">{t.success}</p>}
      {status === "error" && <p className="lab-form-error">{t.error}</p>}
    </form>
  )
}

function FounderCarousel({ t }) {
  const [active, setActive] = useState(0)
  const current = founderPhotos[active]

  const go = (direction) => {
    setActive((index) => (index + direction + founderPhotos.length) % founderPhotos.length)
  }

  return (
    <section className="lab-founders">
      <div className="lab-founders-copy">
        <span className="lab-kicker">{t.sectionLabels.founders}</span>
        <h2>{t.foundersTitle}</h2>
        <p>{t.foundersText}</p>
        <div className="lab-founder-roles">
          <div>
            <strong>{t.founderRoles.nerea[0]}</strong>
            <span>{t.founderRoles.nerea[1]}</span>
          </div>
          <div>
            <strong>{t.founderRoles.sergio[0]}</strong>
            <span>{t.founderRoles.sergio[1]}</span>
          </div>
        </div>
        <div className="lab-founder-links">
          <a href="https://nereapanadero.github.io/Portfolio_Nerea/" target="_blank" rel="noreferrer">
            {t.foundersLinks.nerea}
          </a>
          <a href="https://sergiosaba12.github.io/portfolio/" target="_blank" rel="noreferrer">
            {t.foundersLinks.sergio}
          </a>
        </div>
      </div>

      <div className="lab-founder-carousel" aria-label={t.sectionLabels.founders}>
        <div className="lab-founder-frame">
          <img src={current} alt="AIntegra founders" />
          <div className="lab-founder-count">{active + 1}/{founderPhotos.length}</div>
        </div>
        <div className="lab-founder-controls">
          <button type="button" onClick={() => go(-1)} aria-label="Previous founder photo">
            <ChevronLeft size={22} />
          </button>
          <div className="lab-founder-dots">
            {founderPhotos.map((photo, index) => (
              <button
                type="button"
                key={photo}
                className={index === active ? "active" : ""}
                onClick={() => setActive(index)}
                aria-label={`Founder photo ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next founder photo">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { lang, setLang, t } = useLang()
  const {
    consent, showBanner, showSettings,
    acceptAll, rejectAll, saveCustom,
    openSettings, closeSettings, reopenBanner,
  } = useCookieConsent()

  useEffect(() => {
    if (consent.analytics) loadGA(import.meta.env.VITE_GA_ID)
  }, [consent.analytics])

  useEffect(() => {
    const scrollToTarget = (target, smooth = false) => {
      const top = target.getBoundingClientRect().top + window.scrollY - 104
      window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" })
    }

    const scrollToHash = () => {
      if (!window.location.hash) {
        window.setTimeout(() => window.scrollTo({ top: 0 }), 0)
        return
      }
      const target = document.querySelector(window.location.hash)
      if (!target) return
      window.setTimeout(() => scrollToTarget(target), 0)
      window.setTimeout(() => scrollToTarget(target), 250)
      window.setTimeout(() => scrollToTarget(target), 800)
    }
    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    window.addEventListener("load", scrollToHash)
    return () => {
      window.removeEventListener("hashchange", scrollToHash)
      window.removeEventListener("load", scrollToHash)
    }
  }, [])

  const scrollTo = (event, hash) => {
    event.preventDefault()
    if (window.location.hash !== hash) window.location.hash = hash
    const target = document.querySelector(hash)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <div className="lab-page">
      <NavBar lang={lang} setLang={setLang} t={t} />

      <main>
        <section className="lab-hero">
          <div className="lab-hero-stage" aria-label="CAT product">
            <div className="lab-stage-top">
              <span>CAT</span>
              <span>Adaptive Control Trackpad</span>
            </div>
            <img src="/assets/cat_trackpad_apple.png" alt="CAT adaptive trackpad" />
            <div className="lab-signal-strip">
              {t.process.map((step) => <span key={step}>{step}</span>)}
            </div>
          </div>

          <div className="lab-hero-copy">
            <span className="lab-kicker">{t.heroKicker}</span>
            <h1>{t.heroTitle}</h1>
            <img className="lab-hero-mini" src="/assets/hero_desktop_trackpad_apple.png" alt="Desktop computer interaction with CAT trackpad and CATY" />
            <p>{t.heroText}</p>
            <div className="lab-actions">
              <a className="lab-btn primary" href="#contact" onClick={(event) => scrollTo(event, "#contact")}>{t.primary}<ArrowRight size={18} /></a>
              <a className="lab-btn secondary" href="#system" onClick={(event) => scrollTo(event, "#system")}>{t.secondary}</a>
            </div>
            <div className="lab-proof-row">
              {t.proof.map((item) => <span key={item}><CheckCircle2 size={16} />{item}</span>)}
            </div>
          </div>
        </section>

        <section className="lab-trust" aria-label={t.trust}>
          <div>
            <span>{t.trust}</span>
          </div>
          <div className="lab-logo-rail">
            {partners.map((partner) => (
              <figure key={partner.name}>
                <img src={partner.src} alt={partner.name} />
              </figure>
            ))}
          </div>
        </section>

        <section id="diagnosis" className="lab-diagnosis lab-section">
          <div className="lab-section-copy">
            <span className="lab-kicker">{t.sectionLabels.diagnosis}</span>
            <h2>{t.diagnosisTitle}</h2>
            <p>{t.diagnosisText}</p>
          </div>
          <div className="lab-pain-grid">
            {t.pains.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="system" className="lab-system">
          <div className="lab-system-copy">
            <span className="lab-kicker">{t.sectionLabels.system}</span>
            <h2>{t.systemTitle}</h2>
            <p>{t.systemText}</p>
          </div>
          <div className="lab-system-grid">
            <article>
              <div className="lab-product-image">
                <img src="/assets/cat_trackpad_apple.png" alt="CAT adaptive trackpad" />
              </div>
              <span>{t.cat.label}</span>
              <h3>{t.cat.title}</h3>
              <p>{t.cat.text}</p>
            </article>
            <article>
              <div className="lab-assistant-visual" aria-label="CATY virtual assistant interface">
                <div className="lab-mac-shell">
                  <div className="lab-mac-topbar">
                    <div>
                      <span />
                      <span />
                      <span />
                    </div>
                    <strong>CATY</strong>
                  </div>
                  <div className="lab-mac-screen">
                    <aside>
                      <span />
                      <span />
                      <span />
                    </aside>
                    <div className="lab-mac-workspace">
                      <div className="lab-mac-document">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="lab-caty-card">
                        <span>CATY</span>
                        <p>{lang === "es" ? "Estoy resumiendo esta web en voz clara." : "Summarizing this web in clear voice."}</p>
                        <div>
                          <strong>{lang === "es" ? "Modo voz" : "Voice mode"}</strong>
                          <small>{lang === "es" ? "Web · Resumen · Lectura guiada" : "Web · Summary · Guided reading"}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span>{t.caty.label}</span>
              <h3>{t.caty.title}</h3>
              <p>{t.caty.text}</p>
            </article>
          </div>
          <div className="lab-process">
            {t.process.map((step, index) => (
              <div key={step}>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="users" className="lab-section lab-users">
          <div className="lab-section-copy compact">
            <span className="lab-kicker">{t.sectionLabels.users}</span>
            <h2>{t.usersTitle}</h2>
          </div>
          <div className="lab-user-grid">
            {t.users.map(([title, text, Icon]) => (
              <article key={title}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="lab-outcomes">
          <div>
            <span className="lab-kicker">{t.sectionLabels.outcomes}</span>
            <h2>{t.outcomesTitle}</h2>
          </div>
          <div className="lab-outcome-list">
            {t.outcomes.map((item) => (
              <div key={item}><Zap size={18} />{item}</div>
            ))}
          </div>
        </section>

        <section id="validation" className="lab-validation lab-section">
          <div className="lab-award">
            <img src="/assets/premio.jpg" alt="AIntegra award" />
          </div>
          <div className="lab-validation-copy">
            <span className="lab-kicker">{t.sectionLabels.validation}</span>
            <h2>{t.validationTitle}</h2>
            <div className="lab-validation-list">
              {t.validation.map((item) => <p key={item}><ShieldCheck size={18} />{item}</p>)}
            </div>
          </div>
        </section>

        <FounderCarousel t={t} />

        <section id="faq" className="lab-section lab-faq">
          <div className="lab-section-copy compact">
            <span className="lab-kicker">{t.sectionLabels.faq}</span>
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="lab-faq-grid">
            {t.faq.map(([question, answer]) => (
              <article key={question}>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="lab-contact">
          <div className="lab-contact-copy">
            <span className="lab-kicker">Demo</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <div className="lab-contact-points">
              {t.contactPoints.map((point) => <span key={point}><Mail size={17} />{point}</span>)}
            </div>
          </div>
          <DemoForm t={t} />
        </section>
      </main>

      <footer className="lab-footer">
        <div>
          <img src="/assets/logo_blanco.webp" alt="AIntegra" />
          <span>AIntegra Limited</span>
        </div>
        <button type="button" onClick={reopenBanner}>Cookies</button>
        <p>© {new Date().getFullYear()} AIntegra Limited.</p>
      </footer>

      <CookieBanner
        show={showBanner}
        consent={consent}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onSaveCustom={saveCustom}
        showSettings={showSettings}
        onOpenSettings={openSettings}
        onCloseSettings={closeSettings}
      />
    </div>
  )
}
