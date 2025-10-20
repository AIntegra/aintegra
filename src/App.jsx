import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Nav from "./components/Nav"
import ShowcaseVideo from "./components/ShowcaseVideo"; // 👈 añadido aquí
import {
  Cpu, Hand, Keyboard, Languages, Sparkles, Rocket, Shield, Puzzle, Github, Mail, Globe, Linkedin,
  Mic, MousePointerClick, ClipboardList, CheckCircle2, Award, Users, Activity, Cpu as Cpu2, Zap,
  Layers, Settings2, BookOpen, Lock, FileText, Building2, Boxes, MessageCircle, Star, Map, Box
} from "lucide-react"
import {
  Hero,
  Problem,
  Solution,
  FeatureGrid,
  WhyNow,
  Technology,
  UseCases,
  Integrations,
  Market,
  Roadmap,
  Team,
  Demo,
  Hardware,
  Ecosystem,
  Security,
  Partners,
  FAQ,
  Investor,
  Awards,
  CTA,
  Footer,
} from "./components"

import { AIntegraBackground, SectionWrapper, Title, Button } from "./theme/AIntegraTheme"


// -------------------------------------------------------------
// AIntegra — Extended Investor & Public Landing (EN/ES)
// Tech: React + Vite + Tailwind v4 + Framer Motion + lucide-react
// Notes:
// - Tailwind v4 with @tailwindcss/postcss
// - InterVariable font imported in src/index.css
// - Language toggle persisted in localStorage
// - New sections: WhyNow, Technology, UseCases, Integrations, Community, Blog, Hardware,
//   Ecosystem, Security, Press, FAQ, Investor, plus previous ones
// -------------------------------------------------------------

const TEXT = {
  en: {
    nav: {
      video: "Video",
      problem: "Problem",
      solution: "Solution",
      features: "Features",
      whynow: "Why Now",
      tech: "Technology",
      usecases: "Use Cases",
      integrations: "Integrations",
      market: "Market & Impact",
      roadmap: "Go‑to‑Market",
      team: "Team",
      demo: "Live Demo",
      awards: "Impact & Awards",
      hardware: "Hardware",
      ecosystem: "Ecosystem",
      security: "Security",
      partners: "Partners",
      faq: "FAQ",
      investor: "Investors",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Universal gesture intelligence",
      title: "Reinventing how humans interact with computers.",
      subtitle:
        "AIntegra replaces the mouse with AI‑powered gestures and voice. Natural, fast, and inclusive by design — ready for the 2025 Accessibility Act.",
      cta1: "Watch demo",
      cta2: "Download whitepaper",
      cta3: "Try AIntegrassist"
    },
    video: {
  title: "Showcase Video",
  subtitle: "See AIntegra’s vision of natural, inclusive computing.", // 🇬🇧
},

    problem: {
      title: "The problem",
      bullets: [
        "The mouse/keyboard paradigm hasn’t evolved in 40 years.",
        "Millions are excluded by design: seniors and people with disabilities struggle with today’s inputs.",
        "Organizations must meet new accessibility regulations (EAA 2025) without sacrificing productivity."
      ]
    },
    solution: {
      title: "The solution",
      hw: {
        title: "Smart Gesture Touchpad",
        body: "A precision trackpad built to fully replace the mouse — taps, drags, right‑click, multi‑finger swipes, and scroll with sub‑ms latency."
      },
      sw: {
        title: "AIntegrassist (AI Companion)",
        body: "Voice + gestures + automations. Kira & Kai learn your habits, trigger shortcuts, transform documents, open apps, and guide navigation."
      }
    },
    features: {
      title: "Feature highlights",
      list: [
        { icon: Cpu, title: "Edge AI", body: "On‑device models for gesture recognition and intent parsing." },
        { icon: Languages, title: "Voice first", body: "Hands‑free control — open apps, read content aloud, dictate actions." },
        { icon: Puzzle, title: "Integrations", body: "Works across browsers, editors, DAWs, design tools, and more." },
        { icon: Shield, title: "Privacy & GDPR", body: "Local by default. Cloud optional. You own your data." },
        { icon: Keyboard, title: "Macros & Shortcuts", body: "Chain routines and per‑app layers for pro workflows." },
        { icon: Globe, title: "Multi‑platform", body: "Windows today; macOS & Linux on the roadmap." },
      ]
    },
    whynow: {
      title: "Why now",
      cards: [
        { icon: Activity, title: "Accessibility Act 2025", body: "Regulation accelerates adoption across Europe: accessibility becomes mandatory." },
        { icon: Zap, title: "AI at the edge", body: "Local models + cheaper compute make real‑time gesture intelligence a reality." },
        { icon: Layers, title: "User expectations", body: "People demand natural, voice‑first, touch‑first workflows that feel human." },
      ]
    },
    tech: {
      title: "Technology — Behind the scenes",
      steps: [
        { icon: Hand, title: "Sense", body: "Raw HID / sensor input captured with sub‑ms latency." },
        { icon: Cpu2, title: "Understand", body: "On‑device ML parses gestures + intent (Kira/Kai)." },
        { icon: Settings2, title: "Act", body: "System hooks & APIs trigger actions, macros and voice responses." },
      ]
    },
    usecases: {
      title: "Use cases",
      items: [
        { title: "Office Productivity", body: "Control your entire desktop with gestures + voice. Less friction, more focus." },
        { title: "Accessibility", body: "Inclusive computing for seniors and people with reduced mobility or low vision." },
        { title: "Education", body: "Inclusive classrooms and faster navigation for teachers and students." },
        { title: "Enterprise", body: "Compliance + productivity: upgrade workstations without changing apps." },
      ]
    },
    integrations: {
      title: "Integrations",
      line: "Works across your workflow — no plugins needed.",
      logos: ["Word", "Chrome", "Photoshop", "Notion", "Zoom", "VS Code"]
    },
    market: {
      title: "Market & impact",
      lines: [
        "Mass‑market appeal (consumers, education, public sector, enterprise).",
        "Accessibility compliance as a growth driver (EAA 2025).",
        "From inclusion to efficiency: doing good also boosts productivity."
      ]
    },
    gtm: {
      title: "Go‑to‑Market",
      items: [
        { q: "2025‑26", title: "Pilot & Validation", body: "Programs with accessibility orgs — collect evidence, refine UX." },
        { q: "2026‑27", title: "National Launch", body: "B2C online + B2B institutional deals; retail partnerships." },
        { q: "2027‑29", title: "Global Expansion", body: "EU & North America; distributors and OEM bundles." }
      ]
    },
    team: {
      title: "Team",
      people: [
        { name: "Nerea Panadero", role: "CTO & Co-Founder", link: "#" },
        { name: "Sergio Sabater", role: "CEO & Co-Founder", link: "#" }
      ]
    },
    demo: {
      title: "AIntegrassist — Live commands",
      subtitle: "Try what the assistant can do in the demo:"
    },
    commands: [
      { icon: Mic, text: "\"Open Word\" — launch desktop apps" },
      { icon: ClipboardList, text: "\"List my notes\" — manage notes in DB" },
      { icon: CheckCircle2, text: "\"Remind me tomorrow at 10am to call the doctor\"" },
      { icon: MousePointerClick, text: "Swipe down (3 fingers) → New note (Ctrl+Shift+N)" },
    ],
    hardware: {
      title: "Hardware",
      bullets: [
        "Aluminum unibody • USB‑C / Bluetooth",
        "Multi‑touch precision • Haptic feedback",
        "Gesture latency < 5 ms • OS‑level accuracy"
      ]
    },
    ecosystem: {
      title: "AIntegrassist Ecosystem",
      items: [
        { icon: FileText, title: "Document transforms", body: "PDF ⇄ DOCX ⇄ TXT with voice prompts." },
        { icon: Boxes, title: "Automations", body: "If‑this‑gesture‑then‑that recipes with conditions." },
        { icon: MessageCircle, title: "Voice OS", body: "Navigate, open apps, read aloud — fully by voice." }
      ]
    },
    security: {
      title: "Security & Ethics",
      lines: [
        "Privacy by design: local processing by default.",
        "GDPR‑ready, WCAG 2.2 and EN 301 549 aligned.",
        "User‑centric AI: inclusive research and testing."
      ]
    },
    partners: {
  title: "Partners & Collaborators",
  subtitle: "Recognitions and strategic alliances with institutions promoting accessibility and innovation.",
},

    faq: {
      title: "FAQ",
      qas: [
        { q: "Is it compatible with macOS?", a: "Windows today; macOS & Linux on the roadmap with feature parity." },
        { q: "Can I train my own gestures?", a: "Yes, pro studio tools allow custom gestures and per‑app layers." },
        { q: "Do you store my data?", a: "No by default. Cloud features are opt‑in and transparent." },
      ]
    },
    investor: {
      title: "Investors",
      points: [
        "Opening pre‑seed for pilots and certification.",
        "B2C/B2B hybrid model with diversified revenue.",
        "First‑mover advantage + regulatory tailwinds."
      ],
      cta: "Request the investor deck"
    },
    awards: {
      title: "Impact & awards",
      items: [
        { title: "ETSE Best Project", body: "Award" },
        { title: "MOTIVEM Fest 2024", body: "3rd place" },
      ]
    },
    cta: { title: "Join the accessibility revolution.", subtitle: "Have questions, proposals, or want to learn more about our project? Send us a message and we’ll get back to you soon.", button: "Contact us" },
    footer: { rights: "All rights reserved." },
    langLabel: "EN",
  },
  es: {
    nav: {
      video: "Video",
      problem: "Problema",
      solution: "Solución",
      features: "Funciones",
      whynow: "Por qué ahora",
      tech: "Tecnología",
      usecases: "Casos de uso",
      integrations: "Integraciones",
      market: "Mercado e Impacto",
      roadmap: "Go‑to‑Market",
      team: "Equipo",
      demo: "Demo",
      awards: "Impacto y Premios",
      hardware: "Hardware",
      ecosystem: "Ecosistema",
      security: "Seguridad",
      partners: "Partners",
      faq: "FAQ",
      investor: "Inversores",
      contact: "Contacto"
    },
    hero: {
      eyebrow: "Inteligencia gestual universal",
      title: "Reinventamos cómo interactúas con el ordenador.",
      subtitle:
        "AIntegra reemplaza el ratón con gestos y voz impulsados por IA. Natural, rápido e inclusivo — listo para la Ley de Accesibilidad 2025.",
      cta1: "Ver demo",
      cta2: "Descargar whitepaper",
      cta3: "Probar AIntegrassist"
    },
    video: {
  title: "Vídeo de presentación",
  subtitle: "Descubre la visión de AIntegra: una informática natural e inclusiva.", // 🇪🇸
},
    problem: {
      title: "El problema",
      bullets: [
        "El paradigma ratón/teclado lleva 40 años casi igual.",
        "Millones quedan fuera por diseño: mayores y personas con discapacidad.",
        "Las organizaciones deben cumplir la EAA 2025 sin perder productividad."
      ]
    },
    solution: {
      title: "La solución",
      hw: { title: "Touchpad de Gestos Inteligente", body: "Trackpad de precisión para reemplazar por completo el ratón — toques, arrastre, clic derecho, gestos multi‑dedo y scroll con latencia sub‑ms." },
      sw: { title: "AIntegrassist (Compañero IA)", body: "Voz + gestos + automatizaciones. Kira y Kai aprenden tus hábitos, disparan atajos, transforman documentos, abren apps y guían la navegación." }
    },
    features: {
      title: "Funciones destacadas",
      list: [
        { icon: Cpu, title: "IA en el dispositivo", body: "Modelos locales para gestos e intención." },
        { icon: Languages, title: "Voz primero", body: "Control manos libres — abre apps, lecturas en voz alta y dictado de acciones." },
        { icon: Puzzle, title: "Integraciones", body: "Funciona con navegadores, editores, DAWs, diseño y más." },
        { icon: Shield, title: "Privacidad & RGPD", body: "Local por defecto. Nube opcional. Tus datos son tuyos." },
        { icon: Keyboard, title: "Macros y atajos", body: "Rutinas encadenadas y capas por app para flujos profesionales." },
        { icon: Globe, title: "Multiplataforma", body: "Windows hoy; macOS y Linux en la hoja de ruta." },
      ]
    },
    whynow: {
      title: "Por qué ahora",
      cards: [
        { icon: Activity, title: "Ley de Accesibilidad 2025", body: "La regulación acelera la adopción: la accesibilidad pasa a ser obligatoria." },
        { icon: Zap, title: "IA en el borde", body: "Modelos locales + cómputo accesible permiten inteligencia gestual en tiempo real." },
        { icon: Layers, title: "Expectativas de usuario", body: "Se demandan flujos naturales, voz‑primero y táctiles que se sientan humanos." },
      ]
    },
    tech: {
      title: "Tecnología — Bajo el capó",
      steps: [
        { icon: Hand, title: "Captar", body: "Entrada Raw HID / sensores con latencia sub‑ms." },
        { icon: Cpu2, title: "Entender", body: "ML en dispositivo interpreta gestos + intención (Kira/Kai)." },
        { icon: Settings2, title: "Actuar", body: "Hooks de sistema y APIs ejecutan acciones, macros y voz." },
      ]
    },
    usecases: {
      title: "Casos de uso",
      items: [
        { title: "Productividad de oficina", body: "Control total del escritorio con gestos + voz. Menos fricción, más foco." },
        { title: "Accesibilidad", body: "Computación inclusiva para mayores y personas con movilidad reducida o baja visión." },
        { title: "Educación", body: "Aulas inclusivas y navegación más rápida para profes y estudiantes." },
        { title: "Empresa", body: "Cumplimiento + productividad: actualiza puestos sin cambiar tus apps." },
      ]
    },
    integrations: { title: "Integraciones", line: "Funciona en tu flujo — sin plugins.", logos: ["Word", "Chrome", "Photoshop", "Notion", "Zoom", "VS Code"] },
    market: { title: "Mercado e impacto", lines: ["Apelación masiva (consumo, educación, sector público, empresa).","El cumplimiento en accesibilidad impulsa la adopción (EAA 2025).","De la inclusión a la eficiencia: hacer el bien también impulsa la productividad."] },
    gtm: { title: "Go‑to‑Market", items: [ { q: "2025‑26", title: "Piloto y validación", body: "Programas con entidades de accesibilidad — evidencia y UX." }, { q: "2026‑27", title: "Lanzamiento nacional", body: "B2C online + acuerdos B2B; retail." }, { q: "2027‑29", title: "Expansión internacional", body: "UE y Norteamérica; distribuidores y bundles con OEM." } ] },
    team: { title: "Equipo", people: [ { name: "Nerea Panadero", role: "CTO & Co-Founder", link: "#" }, { name: "Sergio Sabater", role: "CEO & Co-Founder", link: "#" } ] },
    demo: { title: "AIntegrassist — Comandos en vivo", subtitle: "Prueba lo que puede hacer el asistente en la demo:" },
    commands: [ { icon: Mic, text: "\"Abre Word\" — lanza apps de escritorio" }, { icon: ClipboardList, text: "\"Lista mis notas\" — gestiona notas en BD" }, { icon: CheckCircle2, text: "\"Recuérdame mañana a las 10 llamar al médico\"" }, { icon: MousePointerClick, text: "Swipe 3 dedos hacia abajo → Nueva nota (Ctrl+Shift+N)" } ],
    hardware: { title: "Hardware", bullets: ["Unibody de aluminio • USB‑C / Bluetooth","Precisión multi‑touch • Feedback háptico","Latencia gestual < 5 ms • Precisión a nivel de SO"] },
    ecosystem: { title: "Ecosistema AIntegrassist", items: [ { icon: FileText, title: "Transformación de documentos", body: "PDF ⇄ DOCX ⇄ TXT con prompts por voz." }, { icon: Boxes, title: "Automatizaciones", body: "Recetas si‑este‑gesto‑entonces‑aquello con condiciones." }, { icon: MessageCircle, title: "Sistema por voz", body: "Navega, abre apps, lee en voz alta — totalmente por voz." } ] },
    security: { title: "Seguridad y ética", lines: ["Privacidad desde el diseño: procesamiento local por defecto.","Alineado con RGPD, WCAG 2.2 y EN 301 549.","IA centrada en el usuario: investigación y pruebas inclusivas."] },
    partners: {
  title: "Partners y Colaboradores",
  subtitle: "Reconocimientos y alianzas estratégicas con entidades que impulsan la accesibilidad y la innovación.",
},
    faq: { title: "FAQ", qas: [ { q: "¿Es compatible con macOS?", a: "Windows hoy; macOS y Linux en la hoja de ruta con paridad de funciones." }, { q: "¿Puedo entrenar mis gestos?", a: "Sí, herramientas Pro permiten gestos personalizados y capas por app." }, { q: "¿Guardáis mis datos?", a: "No por defecto. La nube es opcional y transparente." } ] },
    investor: { title: "Inversores", points: ["Abrimos pre‑seed para pilotos y certificación.","Modelo híbrido B2C/B2B con ingresos diversificados.","Ventaja del first‑mover + vientos regulatorios a favor."], cta: "Solicitar investor deck" },
    awards: { title: "Impacto y premios", items: [{ title: "Mejor Proyecto ETSE", body: "Premio" }, { title: "MOTIVEM Fest 2024", body: "3º puesto" } ] },
    cta: { title: "Súmate a la revolución de la accesibilidad.", subtitle: "¿Tienes preguntas, propuestas o quieres saber más sobre nuestro proyecto? Escríbenos y te responderemos pronto.", button: "Contactar" },
    footer: { rights: "Todos los derechos reservados." },
    langLabel: "ES",
  }
}

function useLang() {
  const [lang, setLang] = useState(() => localStorage.getItem("ain_lang") || "en")
  useEffect(() => { localStorage.setItem("ain_lang", lang) }, [lang])
  const t = useMemo(() => TEXT[lang], [lang])
  return { lang, setLang, t }
}

export default function App() {
  const { lang, setLang, t } = useLang()
  return (
     <div className="min-h-screen gradient-bg text-white">
      {/* Fondo animado del theme */}
      <AIntegraBackground />

      {/* Navbar */}
      <Nav t={t} lang={lang} setLang={setLang} />

      {/* Secciones con theme aplicado */}
      <main className="relative">
        <SectionWrapper>
          <Hero t={t} />
        </SectionWrapper>

        <SectionWrapper>
  <div className="text-center mb-10">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-4xl md:text-5xl font-semibold mb-4"
    >
      <span className="bg-gradient-to-r from-[#5AA9E6] via-[#7B61FF] to-[#F178B6] text-transparent bg-clip-text">
        {t.video.title}
      </span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
      className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto"
    >
      {t.video.subtitle}
    </motion.p>
  </div>

  <ShowcaseVideo t={t} />
</SectionWrapper>


        <SectionWrapper>
          <Section id="problem"><Problem t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="solution"><Solution t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="features"><FeatureGrid items={t.features.list} title={t.features.title} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="whynow"><WhyNow t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="tech"><Technology t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="usecases"><UseCases t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="integrations"><Integrations t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="market"><Market t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="roadmap"><Roadmap items={t.gtm.items} title={t.gtm.title} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="team"><Team t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="demo"><Demo t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="hardware"><Hardware t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="ecosystem"><Ecosystem t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="security"><Security t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
        <Section id="partners"><Partners t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="faq"><FAQ t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="investor"><Investor t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="awards"><Awards t={t} /></Section>
        </SectionWrapper>

        <SectionWrapper>
          <Section id="contact"><CTA lang={lang} />
</Section>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <Footer rights={t.footer.rights} />
    </div>
  )
}


function GradientBg() {
  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      animate={{
        background: [
          "radial-gradient(800px 500px at 20% 10%, rgba(99,102,241,0.15), transparent 60%)",
          "radial-gradient(800px 500px at 80% 20%, rgba(56,189,248,0.15), transparent 60%)",
          "radial-gradient(800px 500px at 50% 80%, rgba(139,92,246,0.15), transparent 60%)",
        ],
      }}
      transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}




function Section({ id, children }) {
  return (
    <motion.section
      id={id}
      className="relative py-16 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </motion.section>
  )
}


