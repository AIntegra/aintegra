import { useMemo, useState, useEffect, lazy, Suspense } from "react"
import { Mic, MousePointerClick, ClipboardList, CheckCircle2 } from "lucide-react"
import Nav from "./components/Nav"
import CookieBanner from "./components/CookieBanner"
import FeatureGrid from "./components/FeatureGrid"
import { useCookieConsent } from "./hooks/useCookieConsent"

// ---------- Conditional analytics loader ----------
function loadGA(trackingId) {
  if (!trackingId || document.getElementById("ga-script")) return
  const s = document.createElement("script")
  s.id = "ga-script"
  s.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`
  s.async = true
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag("js", new Date())
  gtag("config", trackingId)
}

// Code-split components
const Hero = lazy(() => import("./components/Hero"))
const Problem = lazy(() => import("./components/Problem"))
const Solution = lazy(() => import("./components/Solution"))   // Kira + C.A.T. panels
const Benefits = lazy(() => import("./components/Benefits"))
const FAQ = lazy(() => import("./components/FAQ"))
const Testimonials = lazy(() => import("./components/Testimonials"))
const Partners = lazy(() => import("./components/Partners"))
const Pricing = lazy(() => import("./components/Pricing"))
const CTA = lazy(() => import("./components/CTA"))
const Footer = lazy(() => import("./components/Footer"))
const Chatbot = lazy(() => import("./components/Chatbot"))
const Team = lazy(() => import("./components/Team"))

// ──────────────────────────────────────────────────────────────────
// BILINGUAL COPY
// ──────────────────────────────────────────────────────────────────
const TEXT = {
  en: {
    nav: {
      problem: "The Problem",
      solution: "Platform",
      segments: "Who It's For",
      benefits: "Results",
      faq: "FAQ",
      contact: "Book a Demo"
    },
    hero: {
      title: "Technology That Redefines Your Interaction With Computers",
      subtitle: "Kira brings AI-powered voice control. C.A.T. replaces the mouse with adaptive gestures. Together, they eliminate the friction between people and technology.",
      cta1: "Request a Demo",
      cta2: "Explore the Platform",
      kiraDesc: "Voice & AI assistant",
      catDesc: "Cognitive input hardware",
    },
    problem: {
      title: "The Interface Is the Bottleneck",
      subtitle: "Organizations are deploying AI, but the way people interact with computers hasn't changed in 30 years. That friction costs productivity, adoption, and competitive edge.",
      bullets: [
        "AI tools underperform because of outdated input paradigms",
        "Onboarding new workflows takes months instead of days",
        "High-friction UX limits AI adoption across teams",
        "Rigid interfaces lock out entire workforce segments",
      ]
    },
    features: {
      badge: "Platform",
      title: "The platform that makes it possible",
      subtitle: "Two products, one architecture — each solving a distinct piece of the interaction problem.",
      items: [
        { emoji: "🎙️", title: "Voice Control 24/7", body: "Control your entire computer with your voice — launch apps, dictate text, navigate menus — without lifting a finger." },
        { emoji: "🖐️", title: "Gesture Trackpad", body: "The C.A.T. replaces the mouse with fluid, precision multi-touch gestures. Ergonomic and ultra-responsive." },
        { emoji: "🔒", title: "100% On-Device AI", body: "All processing happens locally. No audio or data ever leaves your machine. Built for privacy-sensitive environments." },
        { emoji: "⚡", title: "Sub-5ms Latency", body: "Instant response. AIntegra reacts at the speed of thought, not the speed of the network." },
        { emoji: "🌍", title: "Multilingual", body: "Full Spanish and English support out of the box. More languages rolling out in 2026." },
        { emoji: "🔌", title: "Plug & Play", body: "No re-architecture required. AIntegra layers on top of your existing software stack in days." },
      ]
    },
    solution: {
      title: "The AIntegra Platform",
      subtitle: "Two complementary modules. One unified architecture.",
      cat: {
        name: "C.A.T.",
        tagline: "Cognitive Assistive Trackpad",
        subtitle: "Redefining physical input.",
        body: "C.A.T. is an AI-powered gesture trackpad that replaces the traditional mouse with fluid, precision-mapped interactions. Designed for professionals and high-throughput environments.",
        benefits: [
          "Precision multi-touch gesture control",
          "Ergonomic design — reduces repetitive strain",
          "Plug & play with Windows, macOS, Linux",
          "Deep integration with Kira for hybrid control"
        ],
        features: [
          "Natural drag, slide, scroll & pinch",
          "Customizable gesture-to-command mapping",
          "Sub-5ms input latency",
          "Works standalone or paired with Kira"
        ],
        cta: "View C.A.T. Demo"
      },
      kira: {
        name: "Kira",
        tagline: "Intelligent Voice Assistant",
        subtitle: "The AI layer for your operating system.",
        body: "Kira is an AI-native voice assistant that embeds into your workflow. Control apps, automate repetitive tasks, and interact with your computer in natural language — privately and securely.",
        benefits: [
          "Full system control by voice",
          "Natural language automation flows",
          "Context-aware responses",
          "On-device processing — no data sent to cloud"
        ],
        features: [
          "Launch apps, navigate menus by voice",
          "Custom automation triggers",
          "Multilingual (ES/EN, expanding)",
          "Integrates with C.A.T. for full hands-free control"
        ],
        cta: "Try Kira"
      }
    },
    ecosystem: {
      title: "A Complete Control Architecture",
      subtitle: "C.A.T. and Kira work independently or together — a fully adaptive, hands-free interaction layer.",
      points: [
        "Hybrid control: gesture + voice",
        "On-device AI — no cloud dependency",
        "Scales from 1 user to 10,000 seats"
      ]
    },
    segments: {
      badge: "Who It's For",
      title: "Software for People and Organizations",
      subtitle: "AIntegra bridges the gap between technology and users. Built for those who need accessible software, and the organizations that support them.",
      items: [
        {
          badge: "B2C / End Users",
          title: "For Individuals",
          body: "Technology should adapt to you, not the other way around. Gain full control of your computer with your voice or adaptive gestures. Independence and accessibility, right out of the box.",
          features: [
            "Full hands-free computer control",
            "Intuitive learning curve without technical barriers",
            "Regain independence in digital tasks",
            "Personalized settings for specific needs"
          ]
        },
        {
          badge: "B2B / Associations",
          title: "For Companies & Associations",
          body: "Become a distributor of accessibility. Equip your team, members, or clients with tools that eliminate digital friction. Scalable deployment designed for organizations.",
          features: [
            "Bulk licensing for associations & foundations",
            "Corporate deployment for inclusive workplaces",
            "Integration with existing software ecosystems",
            "Centralized support and training"
          ]
        }
      ]
    },
    benefits: {
      badge: "Measurable Impact",
      title: "Results You Can Report",
      subtitle: "AIntegra delivers real productivity gains from day one.",
      metrics: [
        { value: "3", suffix: "×", label: "Faster Task Completion", description: "vs. traditional keyboard & mouse" },
        { value: "5", prefix: "< ", suffix: " ms", label: "AI Response Latency", description: "Edge computing — no cloud roundtrip" },
        { value: "60", suffix: "%", label: "Less UI Friction", description: "Measured in enterprise pilots" },
        { value: "10000", suffix: "+", label: "Scalable Deployment", description: "From 1 seat to enterprise-wide" }
      ],
      highlights: [
        { title: "Deploy in weeks, not months", body: "AIntegra is plug & play at its core. No rearchitecting your stack — it layers on top of your existing tools." },
        { title: "On-device AI — your data stays yours", body: "Kira processes locally. No data is sent to external servers. Designed for environments where privacy is non-negotiable." },
        { title: "One platform, two modules", body: "Use Kira, C.A.T., or both. Pay for what you deploy. Expand as your teams adopt." }
      ]
    },
    faq: {
      title: "Questions",
      qas: [
        { q: "What exactly is AIntegra?", a: "AIntegra is the parent platform encompassing two products: Kira (AI voice assistant) and C.A.T. (gesture-based hardware trackpad). Together they form an adaptive interaction layer for modern computers." },
        { q: "Do I need both Kira and C.A.T.?", a: "No. Each works independently. Many enterprise customers start with Kira and add C.A.T. as adoption grows." },
        { q: "What operating systems are supported?", a: "Currently optimized for Windows. macOS and Linux are on the active roadmap for H2 2026." },
        { q: "How does on-device AI work?", a: "Kira processes language and commands locally. No audio or data is sent to external servers — suitable for high-security environments." },
        { q: "What does enterprise deployment look like?", a: "We provide a structured onboarding program: setup, custom automation config, and team training. Typical time-to-value: 2–4 weeks." }
      ]
    },
    team: {
      badge: "The Founders",
      title: "Built by Engineers. Driven by Impact.",
      subtitle: "AIntegra was born from the realization that technology was leaving people behind. We combined hardware engineering and AI architecture to build a platform that adapts to humans, not the other way around. Today, we're bringing that vision to organizations worldwide.",
      swipeHint: "Swipe to view gallery",
      images: [
        "/team/media__1772837796935.png",
        "/team/media__1772837805329.jpg",
        "/team/media__1772837811703.jpg",
        "/team/media__1772837816721.png",
        "/team/media__1772837822552.png",
        "/team/media__1772837841446.jpg",
        "/team/media__1772838036814.jpg"
      ],
      founders: [
        { name: "Nerea Panadero", role: "CEO & Head of Sales" },
        { name: "Sergio Sabater", role: "CTO & Head of Software" }
      ]
    },
    testimonials: {
      badge: "Early Adopters",
      title: "First Results",
      subtitle: "Feedback from pilots and early enterprise testers",
      items: [
        { quote: "We deployed Kira in two weeks. The reduction in tool-switching was immediately visible in our workflow metrics.", name: "Jaime Torres", role: "Head of Operations, TechCorp" },
        { quote: "The C.A.T. device changed how our design team moves through Figma. They won't go back to a mouse.", name: "Laura Sánchez", role: "Creative Director, Studio D" },
        { quote: "On-device processing was a hard requirement for us. AIntegra was the only solution that delivered without data exposure.", name: "Marcos Ibáñez", role: "IT Director, Municipal Admin" }
      ]
    },
    partners: {
      title: "Backed By",
      subtitle: "Supported by leading technology incubators and innovation programs",
    },
    cta: { title: "Ready to See AIntegra in Action?", subtitle: "Book a 30-minute personalized demo.", button: "Book a Demo" },
    footer: { rights: "All rights reserved." },
    langLabel: "EN",
  },

  // ────────────────── ESPAÑOL ──────────────────
  es: {
    nav: {
      problem: "El Problema",
      solution: "Plataforma",
      segments: "Para quién",
      benefits: "Resultados",
      faq: "FAQ",
      contact: "Solicitar Demo"
    },
    hero: {
      title: "Tecnología que redefine tu interacción con el ordenador",
      subtitle: "Kira lleva el control por voz con IA. C.A.T. reemplaza el ratón con gestos adaptativos. Juntos, eliminan la fricción entre las personas y la tecnología.",
      cta1: "Solicitar Demo",
      cta2: "Explorar la Plataforma",
      kiraDesc: "Asistente de voz con IA",
      catDesc: "Hardware cognitivo de entrada",
    },
    problem: {
      title: "La Interfaz es el Cuello de Botella",
      subtitle: "Las organizaciones despliegan IA, pero la forma de interactuar con el ordenador no ha cambiado en 30 años. Esa fricción te cuesta productividad, adopción y ventaja competitiva.",
      bullets: [
        "Las herramientas de IA rinden menos por paradigmas de entrada obsoletos",
        "Adoptar nuevos flujos de trabajo lleva meses en lugar de días",
        "Alta fricción de UX limita la adopción de IA en los equipos",
        "Los interfaces rígidos excluyen segmentos enteros de la plantilla",
      ]
    },
    features: {
      badge: "Plataforma",
      title: "La plataforma que lo hace posible",
      subtitle: "Dos productos, una arquitectura — cada uno resuelve un problema distinto de interacción con el ordenador.",
      items: [
        { emoji: "🎙️", title: "Control por Voz 24/7", body: "Controla tu ordenador con la voz — abre apps, dicta texto, navega menús — sin tocar el teclado ni el ratón." },
        { emoji: "🖐️", title: "Trackpad Gestual", body: "El C.A.T. sustituye el ratón con gestos multitáctiles fluidos y de alta precisión. Ergonómico y ultrarrápido." },
        { emoji: "🔒", title: "IA 100% en el Dispositivo", body: "Todo el procesamiento ocurre localmente. Ningún audio ni dato sale de tu máquina. Diseñado para entornos privados." },
        { emoji: "⚡", title: "Latencia < 5 ms", body: "Respuesta instantánea. AIntegra reacciona a la velocidad del pensamiento, no de la red." },
        { emoji: "🌍", title: "Multilingüe", body: "Soporte completo en español e inglés desde el primer día. Más idiomas en 2026." },
        { emoji: "🔌", title: "Plug & Play", body: "Sin reestructurar tu stack. AIntegra se superpone a tu software existente en cuestión de días." },
      ]
    },
    solution: {
      title: "La Plataforma AIntegra",
      subtitle: "Dos módulos complementarios. Una arquitectura unificada.",
      cat: {
        name: "C.A.T.",
        tagline: "Cognitive Assistive Trackpad",
        subtitle: "Redefiniendo el control físico.",
        body: "C.A.T. es un trackpad gestual impulsado por IA que sustituye el ratón tradicional con interacciones fluidas de alta precisión. Diseñado para profesionales y entornos de alto rendimiento.",
        benefits: [
          "Control multitáctil de precisión",
          "Diseño ergonómico — reduce fatiga repetitiva",
          "Plug & play con Windows, macOS, Linux",
          "Integración profunda con Kira para control híbrido"
        ],
        features: [
          "Arrastrar, deslizar, scroll y pellizcar de forma natural",
          "Mapeo gesto-a-comando personalizable",
          "Latencia de entrada < 5ms",
          "Funciona solo o combinado con Kira"
        ],
        cta: "Ver Demo de C.A.T."
      },
      kira: {
        name: "Kira",
        tagline: "Asistente de Voz Inteligente",
        subtitle: "La capa de IA para tu sistema operativo.",
        body: "Kira es un asistente de voz nativo de IA que se integra en tu flujo de trabajo. Controla aplicaciones, automatiza tareas repetitivas e interactúa con tu ordenador en lenguaje natural — con privacidad y seguridad.",
        benefits: [
          "Control total del sistema por voz",
          "Flujos de automatización en lenguaje natural",
          "Respuestas contextuales e inteligentes",
          "Procesamiento en el dispositivo — sin datos en la nube"
        ],
        features: [
          "Abre apps, navega menús por voz",
          "Triggers de automatización personalizados",
          "Multilingüe (ES/EN, en expansión)",
          "Integra con C.A.T. para control 100% manos libres"
        ],
        cta: "Probar Kira"
      }
    },
    ecosystem: {
      title: "Una Arquitectura de Control Completa",
      subtitle: "C.A.T. y Kira funcionan solos o juntos — una capa de interacción totalmente adaptativa.",
      points: [
        "Control híbrido: gestos + voz",
        "IA en el dispositivo — sin dependencia de la nube",
        "Escala de 1 usuario a 10.000 puestos"
      ]
    },
    segments: {
      badge: "Para quién es",
      title: "Software para Personas y Organizaciones",
      subtitle: "AIntegra cierra la brecha entre tecnología y usuarios. Creado para quienes necesitan software accesible y las organizaciones que los apoyan.",
      items: [
        {
          badge: "B2C / Usuarios Finales",
          title: "Para Personas",
          body: "La tecnología debe adaptarse a ti. Recupera el control total de tu ordenador usando tu voz o gestos adaptativos. Independencia y accesibilidad desde el primer minuto.",
          features: [
            "Control 100% manos libres del PC",
            "Curva de aprendizaje natural y sin barreras",
            "Recupera la independencia en tareas digitales",
            "Ajustes hiper-personalizados según necesidad"
          ]
        },
        {
          badge: "B2B / Asociaciones",
          title: "Para Empresas y Asociaciones",
          body: "Conviértete en distribuidor de accesibilidad. Equipa a tu equipo, socios o clientes con herramientas que eliminan la brecha digital. Despliegue escalable para organizaciones.",
          features: [
            "Licencias por volumen para asociaciones",
            "Despliegue corporativo para inclusión laboral",
            "Integración con ecosistemas de software actuales",
            "Soporte centralizado y formación continua"
          ]
        }
      ]
    },
    benefits: {
      badge: "Impacto Medible",
      title: "Resultados que Puedes Reportar",
      subtitle: "AIntegra genera ganancias reales de productividad desde el primer día.",
      metrics: [
        { value: "3", suffix: "×", label: "Más Rápido en Tareas", description: "vs. teclado y ratón tradicional" },
        { value: "5", prefix: "< ", suffix: " ms", label: "Latencia de IA", description: "Edge computing — sin roundtrip a la nube" },
        { value: "60", suffix: "%", label: "Menos Fricción de UX", description: "Medido en pilotos empresariales" },
        { value: "10000", suffix: "+", label: "Puestos Escalables", description: "Desde 1 usuario hasta empresa" }
      ],
      highlights: [
        { title: "Desplegado en semanas, no meses", body: "AIntegra es plug & play en su núcleo. Sin reestructurar tu stack — se superpone a tus herramientas existentes." },
        { title: "IA en el dispositivo — tus datos son tuyos", body: "Kira procesa localmente. Ningún dato se envía a servidores externos. Diseñado para entornos donde la privacidad no es negociable." },
        { title: "Una plataforma, dos módulos", body: "Usa Kira, C.A.T. o los dos. Paga lo que despliegas. Expande a medida que tu equipo adopta." }
      ]
    },
    faq: {
      title: "Preguntas",
      qas: [
        { q: "¿Qué es exactamente AIntegra?", a: "AIntegra es la plataforma matriz que engloba dos productos: Kira (asistente de voz con IA) y C.A.T. (trackpad hardware de control gestual). Juntos forman una capa de interacción adaptativa para ordenadores modernos." },
        { q: "¿Necesito tanto Kira como C.A.T.?", a: "No. Cada producto funciona de forma independiente. Muchos clientes empresariales empiezan con Kira y añaden C.A.T. a medida que crece la adopción." },
        { q: "¿Qué sistemas operativos soporta?", a: "Actualmente optimizado para Windows. El soporte de macOS y Linux está en el roadmap activo para H2 2026." },
        { q: "¿Cómo funciona la IA en el dispositivo?", a: "Kira procesa el lenguaje y los comandos localmente. Ningún audio ni dato se envía a servidores externos. Adecuado para entornos de alta seguridad." },
        { q: "¿Cómo es el despliegue para una empresa?", a: "Ofrecemos un programa de onboarding estructurado con configuración, automatizaciones personalizadas y formación. Tiempo típico hasta el primer valor: 2–4 semanas." }
      ]
    },
    team: {
      badge: "Los Fundadores",
      title: "Desarrollado por Ingenieros. Impulsado por el Impacto.",
      subtitle: "AIntegra nació al darnos cuenta de que la tecnología dejaba a personas atrás. Combinamos la ingeniería de hardware y la arquitectura de IA para construir una plataforma que se adapta a las personas, y no al revés. Hoy, llevamos esa visión a organizaciones de todo el mundo.",
      swipeHint: "Desliza para ver fotos",
      images: [
        "/team/media__1772837796935.png",
        "/team/media__1772837805329.jpg",
        "/team/media__1772837811703.jpg",
        "/team/media__1772837816721.png",
        "/team/media__1772837822552.png",
        "/team/media__1772837841446.jpg",
        "/team/media__1772838036814.jpg"
      ],
      founders: [
        { name: "Nerea Panadero", role: "CEO & Head of Sales" },
        { name: "Sergio Sabater", role: "CTO & Head of Software" }
      ]
    },
    testimonials: {
      badge: "Early Adopters",
      title: "Primeros Resultados",
      subtitle: "Feedback de pilotos y primeros testers empresariales",
      items: [
        { quote: "Desplegamos Kira en dos semanas. La reducción de cambios entre herramientas fue inmediatamente visible en nuestras métricas.", name: "Jaime Torres", role: "Director de Operaciones, TechCorp" },
        { quote: "El C.A.T. cambió cómo nuestro equipo navega Figma y Notion. Tardaron tres días en dominarlo — y no quieren volver al ratón.", name: "Laura Sánchez", role: "Directora Creativa, Studio D" },
        { quote: "Para nuestra institución, el procesamiento en el dispositivo era un requisito estricto. AIntegra fue la única solución que lo cumplió.", name: "Marcos Ibáñez", role: "Director de TI, Administración Municipal" }
      ]
    },
    partners: {
      title: "Respaldados por",
      subtitle: "Apoyados por incubadoras tecnológicas líderes y programas de innovación",
    },
    cta: { title: "¿Listo para ver AIntegra en acción?", subtitle: "Agenda una demo de 30 minutos personalizada.", button: "Agendar Demo" },
    footer: { rights: "Todos los derechos reservados." },
    langLabel: "ES",
  }
}

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("ain_lang") || "es")
  useEffect(() => { localStorage.setItem("ain_lang", lang) }, [lang])
  const t = useMemo(() => TEXT[lang], [lang])
  return { lang, setLang, t }
}

function Loader() {
  return (
    <div style={{ minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center", background: "#03030a" }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "#7c3aed", animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  const { lang, setLang, t } = useLang()
  const {
    consent, showBanner, showSettings,
    acceptAll, rejectAll, saveCustom,
    openSettings, closeSettings, reopenBanner
  } = useCookieConsent()

  // Load Google Analytics only when analytics consent is granted
  useEffect(() => {
    if (consent.analytics) {
      loadGA(import.meta.env.VITE_GA_ID) // set VITE_GA_ID=G-XXXXXXXX in .env
    }
  }, [consent.analytics])

  return (
    <div style={{ background: "#03030a", color: "white", minHeight: "100vh", overflowX: "hidden", position: "relative", width: "100%" }}>
      {/* ── AMBIENT BACKGROUND GLOW ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none', zIndex: 0, overflow: 'hidden'
      }}>
        {/* Top left purple */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vh',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }} />
        {/* Top right cyan */}
        <div style={{
          position: 'absolute', top: '10%', right: '-20%', width: '60vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 60%)',
          filter: 'blur(100px)'
        }} />
        {/* Bottom center blue */}
        <div style={{
          position: 'absolute', bottom: '-20%', left: '20%', width: '60vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 60%)',
          filter: 'blur(100px)'
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Sticky ultra-thin nav */}
        <Nav t={t} lang={lang} setLang={setLang} />

        <main>
          {/* 1. Hero (hook) */}
          <Suspense fallback={<Loader />}>
            <Hero t={t} />
          </Suspense>

          {/* 2. Partners (early social proof) */}
          <Suspense fallback={null}>
            <Partners t={t} />
          </Suspense>

          {/* 3. Problem (agitate pain point) */}
          <Suspense fallback={null}>
            <Problem t={t} />
          </Suspense>

          {/* 4. FeatureGrid (introduce value proposition) */}
          <FeatureGrid
            variant="emoji"
            badge={t.features.badge}
            title={t.features.title}
            subtitle={t.features.subtitle}
            items={t.features.items}
          />

          {/* 5. Solution — Kira & C.A.T. (deep dive into the product) */}
          <Suspense fallback={null}>
            <Solution t={t} />
          </Suspense>

          {/* 6. Benefits (ROI / stats) */}
          <Suspense fallback={null}>
            <Benefits t={t} />
          </Suspense>

          {/* 6.5 Founders */}
          <Suspense fallback={null}>
            <Team t={t} />
          </Suspense>

          {/* 7. Testimonials (deep social proof) */}
          <Suspense fallback={null}>
            <Testimonials t={t} />
          </Suspense>

          {/* 8. Pricing (how much is it?) */}
          <Suspense fallback={null}>
            <Pricing lang={lang} />
          </Suspense>

          {/* 9. FAQ (overcome final objections) */}
          <Suspense fallback={null}>
            <FAQ t={t} />
          </Suspense>

          {/* 10. CTA (close the sale / book demo) */}
          <Suspense fallback={null}>
            <CTA lang={lang} />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer rights={t.footer.rights} onReopenCookies={reopenBanner} lang={lang} />
        </Suspense>

        {/* Chatbot */}
        <Suspense fallback={null}>
          <Chatbot lang={lang} />
        </Suspense>

        {/* Cookie consent system */}
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
    </div>
  )
}
