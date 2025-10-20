import { useEffect, useMemo, useState, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import Nav from "./components/Nav"
import ShowcaseVideo from "./components/ShowcaseVideo"
import {
  Mic, MousePointerClick, ClipboardList, CheckCircle2
} from "lucide-react"

// 🚀 Code Splitting: Lazy load components
const Hero = lazy(() => import("./components/Hero"))
const Problem = lazy(() => import("./components/Problem"))
const Solution = lazy(() => import("./components/Solution"))
const UseCases = lazy(() => import("./components/UseCases"))
const Team = lazy(() => import("./components/Team"))
const Demo = lazy(() => import("./components/Demo"))
const Partners = lazy(() => import("./components/Partners"))
const FAQ = lazy(() => import("./components/FAQ"))
const Awards = lazy(() => import("./components/Awards"))
const Testimonials = lazy(() => import("./components/Testimonials"))
const Investors = lazy(() => import("./components/Investors"))
const Newsletter = lazy(() => import("./components/Newsletter"))
const Roadmap = lazy(() => import("./components/Roadmap"))
const Comparison = lazy(() => import("./components/Comparison"))
const CTA = lazy(() => import("./components/CTA"))
const Footer = lazy(() => import("./components/Footer"))
const Chatbot = lazy(() => import("./components/Chatbot"))

import { SectionWrapper } from "./theme/AIntegraTheme"


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
      solution: "Our Products",
      features: "Features",
      demo: "Live Demo",
      usecases: "Use Cases",
      team: "Team",
      comparison: "Compare",
      roadmap: "Roadmap",
      faq: "FAQ",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Technology that redefines your interaction with computers",
      title: "Technology that redefines your interaction with computers",
      subtitle:
        "Control your device with intelligent gestures and natural voice — accessible, intuitive, and barrier-free.",
      cta1: "Try C.A.T. Demo",
      cta2: "Early Access to Kira"
    },
    video: {
      title: "See AIntegra in Action",
      subtitle: "Discover how C.A.T. and Kira transform human-computer interaction",
    },

    aboutUs: {
      title: "Innovation in Human-Machine Interaction",
      body: "AIntegra Limited is a technology startup focused on digital accessibility and human-machine interaction through artificial intelligence and intelligent hardware. We were born to eliminate barriers in computer use, creating natural, efficient solutions adapted to each person.",
      highlights: [
        "Founded by Sergio Sabater Ruiz and Nerea Panadero Alfonso",
        "Selected for the IAtecUV incubator (Universitat de València)",
        "Focus on accessibility, ergonomics, and digital innovation"
      ]
    },

    problem: {
      title: "Digital Interaction is Stuck",
      subtitle: "Computers are still designed for a traditional mouse and keyboard model that isn't accessible to everyone and doesn't leverage the potential of artificial intelligence.",
      bullets: [
        "Difficulty for people with reduced mobility",
        "Inefficient processes for everyday tasks",
        "Unintuitive interaction with machines",
        "Limitations of traditional manual control"
      ]
    },

    solution: {
      title: "AIntegra Ecosystem",
      cat: {
        name: "C.A.T.",
        tagline: "Cognitive Assistive Trackpad",
        subtitle: "A new standard of control",
        body: "C.A.T. is an intelligent gesture-based trackpad that replaces the traditional mouse and enables more intuitive, fluid, and accessible navigation.",
        benefits: [
          "Advanced gesture control",
          "More ergonomic navigation",
          "Improved digital accessibility",
          "AI integration"
        ],
        features: [
          "Multi-touch gestures",
          "Natural drag, slide, and scroll",
          "Designed to reduce fatigue",
          "Integration with virtual assistants like Kira"
        ],
        cta: "View Demo"
      },
      kira: {
        name: "Kira",
        tagline: "Intelligent Virtual Assistant",
        subtitle: "The voice that understands your computer",
        body: "Kira is an AI virtual assistant that allows you to control system functions by voice and converse naturally with your computer.",
        benefits: [
          "Voice commands for complete tasks",
          "Natural conversation with the system",
          "Automation of repetitive flows",
          "File access and management through natural language"
        ],
        features: [
          "Open applications by voice",
          "Navigate menus and documents",
          "Contextual responses",
          "Integration with C.A.T. for hybrid experience"
        ],
        cta: "Try Kira Now"
      }
    },

    ecosystem: {
      title: "A Complete Ecosystem",
      subtitle: "C.A.T. and Kira combine to offer a completely natural interaction experience: physical control through gestures and conversational communication by voice, adapted to each user.",
      points: [
        "Hybrid control: gestures + voice",
        "Personalized experience",
        "Reduction of digital barriers"
      ]
    },

    usecases: {
      title: "Who is AIntegra For?",
      items: [
        {
          title: "People with Reduced Mobility",
          body: "Natural access and ergonomic control for everyone"
        },
        {
          title: "Creative Professionals",
          body: "Faster interaction speed without physical fatigue"
        },
        {
          title: "Corporate and Remote Teams",
          body: "Efficient collaboration with voice and gesture controls"
        },
        {
          title: "Accessible Educational Environments",
          body: "Intuitive access for students with different needs"
        },
      ]
    },

    team: {
      title: "Meet the Team",
      people: [
        { name: "Nerea Panadero", role: "CTO • Engineering & AI" },
        { name: "Sergio Sabater", role: "CEO • Leadership & Innovation" }
      ]
    },

    demo: {
      title: "AIntegra in Action",
      subtitle: "Try what you can do with our technology:"
    },

    commands: [
      { icon: Mic, text: "\"Open Word\" — launch desktop apps" },
      { icon: ClipboardList, text: "\"List my notes\" — manage your files" },
      { icon: CheckCircle2, text: "\"Remind me tomorrow at 10am\"" },
      { icon: MousePointerClick, text: "Swipe down (3 fingers) → New note" },
    ],

    awards: {
      title: "Recognition and Support",
      subtitle: "AIntegra Limited has been selected by IAtecUV, the technology incubator of the Universitat de València, to accelerate its development and technological validation.",
      items: [
        { title: "MOTIVEM Fest 2024", body: "3rd place" },
        { title: "IAtecUV Incubator", body: "Selected Startup" },
        { title: "Best Project - School of Engineering UV", body: "Xarxa de Preincubadors by UVemprén" },
        { title: "Startup Valencia Incubator", body: "Selected Startup" },
        { title: "Valencia Digital Summit", body: "Official Presentation" },
      ]
    },

    partners: {
      title: "Partners & Collaborators",
      subtitle: "Strategic alliances with institutions promoting accessibility and innovation",
    },

    faq: {
      title: "Frequently Asked Questions",
      qas: [
        {
          q: "What is C.A.T. and how does it help?",
          a: "C.A.T. is an intelligent trackpad that replaces the mouse with intuitive gestures, offering more ergonomic and accessible navigation."
        },
        {
          q: "Do I need special hardware to use Kira?",
          a: "No, Kira works with your existing computer. C.A.T. enhances the experience but isn't required."
        },
        {
          q: "Does it work with Windows, macOS, and Linux?",
          a: "Currently optimized for Windows. macOS and Linux support is on our roadmap."
        },
        {
          q: "Is Kira available in multiple languages?",
          a: "Yes, Kira supports Spanish and English, with more languages coming soon."
        },
      ]
    },

    testimonials: {
      badge: "Early Testers",
      title: "First Impressions",
      subtitle: "Feedback from our early testers and accessibility experts",
      items: [
        {
          quote: "The concept behind AIntegra is exactly what the accessibility community has been waiting for. I can't wait to see the final product.",
          name: "María García",
          role: "Accessibility Consultant"
        },
        {
          quote: "As someone with visual impairment, I'm excited about this technology. Finally, a team designing with us in mind from the start.",
          name: "Carlos Rodríguez",
          role: "Software Developer"
        },
        {
          quote: "The gesture control prototype shows incredible promise. This could revolutionize how we interact with computers.",
          name: "Ana Martínez",
          role: "University Professor"
        }
      ]
    },

    investors: {
      badge: "Investment Opportunity",
      title: "Join Our Journey",
      subtitle: "Be part of the revolution in accessible human-computer interaction",
      metrics: [
        { value: "€45B", label: "Global Assistive Tech Market" },
        { value: "1M+", label: "Potential Early Adopters" },
        { value: "20K", label: "Target Users in Spain" },
        { value: "2", label: "Active Incubators" },
        { value: "MVP", label: "In Development" },
        { value: "5", label: "Awards & Recognitions" }
      ],
      opportunity: {
        title: "Pre-Seed Investment Round",
        description: "We are looking for strategic investors who share our vision of making technology accessible to everyone. Join us in eliminating digital barriers and democratizing access to technology.",
        highlights: [
          "MVP in active development",
          "Selected by IAtecUV and Startup Valencia",
          "First-mover advantage in inclusive AI interfaces",
          "Experienced founding team from Universitat de València"
        ],
        seeking: "Currently Seeking",
        amount: "€150K",
        round: "Pre-Seed Round",
        cta: "Schedule a Meeting"
      }
    },

    newsletter: {
      title: "Stay Updated",
      subtitle: "Join our newsletter to receive exclusive updates, early access opportunities, and insider news about AIntegra's development.",
      placeholder: "Enter your email",
      button: "Subscribe",
      success: "Thanks for subscribing! Check your email.",
      privacy: "We respect your privacy. Unsubscribe at any time."
    },

    roadmap: {
      badge: "Our Journey",
      title: "Product Roadmap",
      subtitle: "From concept to market: follow our path to revolutionizing accessibility",
      milestones: [
        {
          date: "Q3 2025",
          title: "Idea & Team Formation",
          description: "Project born at Universitat de València. Core team assembled.",
          status: "completed"
        },
        {
          date: "Q4 2025",
          title: "Incubator Selection",
          description: "Selected by IAtecUV and Startup Valencia. Won ETSE Best Project award.",
          status: "completed"
        },
        {
          date: "Q1 2026",
          title: "MVP Development",
          description: "Building core AI assistant and gesture recognition prototypes.",
          status: "current"
        },
        {
          date: "Q2 2026",
          title: "Beta Testing",
          description: "Closed beta with accessibility community and early adopters.",
          status: "upcoming"
        },
        {
          date: "Q3 2026",
          title: "Public Launch",
          description: "Official product launch and hardware pre-orders begin.",
          status: "upcoming"
        }
      ]
    },

    comparison: {
      badge: "Why AIntegra",
      title: "How We Compare",
      subtitle: "See how AIntegra stands out from traditional accessibility solutions",
      featureLabel: "Feature",
      recommended: "✨ Our Solution",
      competitors: [
        { name: "AIntegra", isUs: true },
        { name: "Screen Readers", isUs: false },
        { name: "Voice Assistants", isUs: false }
      ],
      features: [
        { name: "Voice Control", values: [true, false, true] },
        { name: "Gesture Recognition", values: [true, false, false] },
        { name: "Custom Hardware", values: [true, false, false] },
        { name: "AI-Powered Automation", values: [true, false, "partial"] },
        { name: "Designed for Accessibility", values: [true, true, false] },
        { name: "Works Offline", values: [true, true, false] },
        { name: "Multi-language Support", values: [true, true, true] },
        { name: "Personalization", values: [true, "partial", "partial"] }
      ],
      legend: {
        yes: "Full Support",
        no: "Not Available",
        partial: "Limited"
      }
    },

    cta: {
      title: "Join the New Era of Human Interaction",
      subtitle: "Request early access, a demo, or sign up to receive news and exclusive offers.",
      button: "Contact Us"
    },
    footer: { rights: "All rights reserved." },
    langLabel: "EN",
  },
  es: {
    nav: {
      video: "Video",
      problem: "Problema",
      solution: "Nuestros Productos",
      features: "Características",
      demo: "Demo en Vivo",
      usecases: "Casos de Uso",
      team: "Equipo",
      comparison: "Comparativa",
      roadmap: "Roadmap",
      faq: "FAQ",
      contact: "Contacto"
    },
    hero: {
      eyebrow: "Tecnología que redefine tu interacción con el ordenador",
      title: "Tecnología que redefine tu interacción con el ordenador",
      subtitle:
        "Controla tu dispositivo con gestos inteligentes y voz natural — accesible, intuitivo y sin barreras.",
      cta1: "Probar demo de C.A.T.",
      cta2: "Acceso anticipado a Kira"
    },
    video: {
      title: "Ver AIntegra en Acción",
      subtitle: "Descubre cómo C.A.T. y Kira transforman la interacción humano-ordenador",
    },

    aboutUs: {
      title: "Innovación en Interacción Humano-Máquina",
      body: "AIntegra Limited es una startup tecnológica centrada en accesibilidad digital e interacción humano-máquina mediante inteligencia artificial y hardware inteligente. Nace para eliminar barreras en el uso de ordenadores, creando soluciones naturales, eficientes y adaptadas a cada persona.",
      highlights: [
        "Fundada por Sergio Sabater Ruiz y Nerea Panadero Alfonso",
        "Seleccionada para la incubadora IAtecUV (Universitat de València)",
        "Enfoque en accesibilidad, ergonomía e innovación digital"
      ]
    },

    problem: {
      title: "La Interacción Digital está Atascada",
      subtitle: "Los ordenadores siguen diseñados para un modelo tradicional de ratón y teclado que no es accesible para todos y no aprovecha el potencial de la inteligencia artificial.",
      bullets: [
        "Dificultad para personas con movilidad reducida",
        "Procesos ineficientes para tareas cotidianas",
        "Interacción poco intuitiva con máquinas",
        "Limitaciones del control manual tradicional"
      ]
    },

    solution: {
      title: "Ecosistema AIntegra",
      cat: {
        name: "C.A.T.",
        tagline: "Cognitive Assistive Trackpad",
        subtitle: "Un nuevo estándar de control",
        body: "C.A.T. es un trackpad inteligente basado en gestos que reemplaza el ratón tradicional y permite una navegación más intuitiva, fluida y accesible.",
        benefits: [
          "Control por gestos avanzados",
          "Navegación más ergonómicaç",
          "Mejora de accesibilidad digital",
          "Integración con inteligencia artificial"
        ],
        features: [
          "Gestos multitáctiles",
          "Arrastrar, deslizar y hacer scroll de forma natural",
          "Diseño pensado para reducir fatiga",
          "Integración con asistentes virtuales como Kira"
        ],
        cta: "Ver Demo"
      },
      kira: {
        name: "Kira",
        tagline: "Asistente Virtual Inteligente",
        subtitle: "La voz que entiende tu ordenador",
        body: "Kira es un asistente virtual de inteligencia artificial que permite controlar funciones del sistema por voz y conversar de forma natural con tu ordenador.",
        benefits: [
          "Comandos por voz para tareas completas",
          "Conversación natural con el sistema",
          "Automatización de flujos repetitivos",
          "Acceso y gestión de archivos por lenguaje natural"
        ],
        features: [
          "Abrir aplicaciones por voz",
          "Navegar por menús y documentos",
          "Respuestas contextuales",
          "Integración con C.A.T. para experiencia híbrida"
        ],
        cta: "Probar Kira Ahora"
      }
    },

    ecosystem: {
      title: "Un Ecosistema Completo",
      subtitle: "C.A.T. y Kira se combinan para ofrecer una experiencia de interacción totalmente natural: control físico por gestos y comunicación conversacional por voz, adaptada a cada usuario.",
      points: [
        "Control híbrido: gestos + voz",
        "Experiencia personalizada",
        "Reducción de barreras digitales"
      ]
    },

    usecases: {
      title: "¿Para Quién es AIntegra?",
      items: [
        {
          title: "Personas con Movilidad Reducida",
          body: "Acceso natural y control ergonómico para todos"
        },
        {
          title: "Profesionales Creativos",
          body: "Mayor velocidad de interacción sin fatiga física"
        },
        {
          title: "Equipos Corporativos y Remotos",
          body: "Colaboración eficiente con voz y controles gestuales"
        },
        {
          title: "Entornos Educativos Accesibles",
          body: "Acceso intuitivo para estudiantes con distintas necesidades"
        },
      ]
    },

    team: {
      title: "Conoce al Equipo",
      people: [
        { name: "Nerea Panadero", role: "CTO • Ingeniería e IA" },
        { name: "Sergio Sabater", role: "CEO • Dirección e Innovación" }
      ]
    },

    demo: {
      title: "AIntegra en Acción",
      subtitle: "Prueba lo que puedes hacer con nuestra tecnología:"
    },

    commands: [
      { icon: Mic, text: "\"Abre Word\" — lanza aplicaciones de escritorio" },
      { icon: ClipboardList, text: "\"Lista mis notas\" — gestiona tus archivos" },
      { icon: CheckCircle2, text: "\"Recuérdame mañana a las 10\"" },
      { icon: MousePointerClick, text: "Desliza hacia abajo (3 dedos) → Nueva nota" },
    ],

    awards: {
      title: "Reconocimientos y Apoyo",
      subtitle: "AIntegra Limited ha sido seleccionada por IAtecUV, la incubadora tecnológica de la Universitat de València, para acelerar su desarrollo y validación tecnológica.",
      items: [
        { title: "MOTIVEM Fest 2024", body: "3º puesto" },
        { title: "Incubadora IAtecUV", body: "Startup Seleccionada" },
        { title: "Mejor Proyecto - Escuela de Ingeniería UV", body: "Xarxa de Preincubadors de UVemprén" },
        { title: "Incubadora Startup Valencia", body: "Startup Seleccionada" },
        { title: "Valencia Digital Summit", body: "Presentación Oficial" },
      ]
    },

    partners: {
      title: "Partners y Colaboradores",
      subtitle: "Alianzas estratégicas con instituciones que impulsan la accesibilidad y la innovación",
    },

    faq: {
      title: "Preguntas Frecuentes",
      qas: [
        {
          q: "¿Qué es C.A.T. y cómo ayuda?",
          a: "C.A.T. es un trackpad inteligente que reemplaza el ratón con gestos intuitivos, ofreciendo navegación más ergonómica y accesible."
        },
        {
          q: "¿Necesito hardware especial para usar Kira?",
          a: "No, Kira funciona con tu ordenador actual. C.A.T. mejora la experiencia pero no es obligatorio."
        },
        {
          q: "¿Funciona con Windows, macOS y Linux?",
          a: "Actualmente optimizado para Windows. Soporte para macOS y Linux en nuestra hoja de ruta."
        },
        {
          q: "¿Kira está disponible en varios idiomas?",
          a: "Sí, Kira soporta español e inglés, con más idiomas próximamente."
        },
      ]
    },

    testimonials: {
      badge: "Primeros Testers",
      title: "Primeras Impresiones",
      subtitle: "Feedback de nuestros primeros testers y expertos en accesibilidad",
      items: [
        {
          quote: "El concepto detrás de AIntegra es exactamente lo que la comunidad de accesibilidad ha estado esperando. No puedo esperar a ver el producto final.",
          name: "María García",
          role: "Consultora de Accesibilidad"
        },
        {
          quote: "Como persona con discapacidad visual, estoy emocionado con esta tecnología. Por fin un equipo que diseña pensando en nosotros desde el principio.",
          name: "Carlos Rodríguez",
          role: "Desarrollador de Software"
        },
        {
          quote: "El prototipo de control por gestos muestra un potencial increíble. Esto podría revolucionar cómo interactuamos con los ordenadores.",
          name: "Ana Martínez",
          role: "Profesora Universitaria"
        }
      ]
    },

    investors: {
      badge: "Oportunidad de Inversión",
      title: "Únete a Nuestro Viaje",
      subtitle: "Forma parte de la revolución en interacción humano-ordenador accesible",
      metrics: [
        { value: "€45B", label: "Mercado Global Tech Asistiva" },
        { value: "1M+", label: "Early Adopters Potenciales" },
        { value: "20K", label: "Usuarios Objetivo en España" },
        { value: "2", label: "Incubadoras Activas" },
        { value: "MVP", label: "En Desarrollo" },
        { value: "5", label: "Premios y Reconocimientos" }
      ],
      opportunity: {
        title: "Ronda de Inversión Pre-Seed",
        description: "Buscamos inversores estratégicos que compartan nuestra visión de hacer la tecnología accesible para todos. Únete a nosotros para eliminar barreras digitales y democratizar el acceso a la tecnología.",
        highlights: [
          "MVP en desarrollo activo",
          "Seleccionados por IAtecUV y Startup Valencia",
          "Ventaja de pioneros en interfaces IA inclusivas",
          "Equipo fundador con experiencia de la Universitat de València"
        ],
        seeking: "Buscando Actualmente",
        amount: "€150K",
        round: "Ronda Pre-Seed",
        cta: "Agendar Reunión"
      }
    },

    newsletter: {
      title: "Mantente Actualizado",
      subtitle: "Únete a nuestra newsletter para recibir actualizaciones exclusivas, acceso anticipado y noticias sobre el desarrollo de AIntegra.",
      placeholder: "Tu email",
      button: "Suscribirse",
      success: "¡Gracias por suscribirte! Revisa tu email.",
      privacy: "Respetamos tu privacidad. Cancela cuando quieras."
    },

    roadmap: {
      badge: "Nuestro Camino",
      title: "Hoja de Ruta",
      subtitle: "Del concepto al mercado: sigue nuestro camino para revolucionar la accesibilidad",
      milestones: [
        {
          date: "Q3 2025",
          title: "Idea y Formación del Equipo",
          description: "Proyecto nacido en la Universitat de València. Equipo fundador formado.",
          status: "completed"
        },
        {
          date: "Q4 2025",
          title: "Selección en Incubadoras",
          description: "Seleccionados por IAtecUV y Startup Valencia. Premio Mejor Proyecto ETSE.",
          status: "completed"
        },
        {
          date: "Q1 2026",
          title: "Desarrollo del MVP",
          description: "Construyendo el asistente IA y prototipos de reconocimiento gestual.",
          status: "current"
        },
        {
          date: "Q2 2026",
          title: "Beta Testing",
          description: "Beta cerrada con comunidad de accesibilidad y early adopters.",
          status: "upcoming"
        },
        {
          date: "Q3 2026",
          title: "Lanzamiento Público",
          description: "Lanzamiento oficial del producto y pre-pedidos del hardware.",
          status: "upcoming"
        }
      ]
    },

    comparison: {
      badge: "Por Qué AIntegra",
      title: "Cómo Nos Comparamos",
      subtitle: "Descubre cómo AIntegra destaca frente a las soluciones de accesibilidad tradicionales",
      featureLabel: "Característica",
      recommended: "✨ Nuestra Solución",
      competitors: [
        { name: "AIntegra", isUs: true },
        { name: "Lectores de Pantalla", isUs: false },
        { name: "Asistentes de Voz", isUs: false }
      ],
      features: [
        { name: "Control por Voz", values: [true, false, true] },
        { name: "Reconocimiento de Gestos", values: [true, false, false] },
        { name: "Hardware Propio", values: [true, false, false] },
        { name: "Automatización con IA", values: [true, false, "partial"] },
        { name: "Diseñado para Accesibilidad", values: [true, true, false] },
        { name: "Funciona Offline", values: [true, true, false] },
        { name: "Soporte Multi-idioma", values: [true, true, true] },
        { name: "Personalización", values: [true, "partial", "partial"] }
      ],
      legend: {
        yes: "Soporte Completo",
        no: "No Disponible",
        partial: "Limitado"
      }
    },

    cta: {
      title: "Únete a la Nueva Era de la Interacción Humana",
      subtitle: "Solicita acceso anticipado, una demo o inscríbete para recibir noticias y ofertas exclusivas.",
      button: "Contactar"
    },
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
    <motion.div
      className="min-h-screen gradient-bg text-white"
      initial={false}
      animate={false}
    >
      {/* Navbar */}
      <Nav t={t} lang={lang} setLang={setLang} />

      {/* Secciones con theme aplicado */}
      <main className="relative">
        <SectionWrapper>
          <Suspense fallback={<LoadingSection />}>
            <Hero t={t} />
          </Suspense>
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

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="problem"><Problem t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="solution"><Solution t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="usecases"><UseCases t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="team"><Team t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="demo"><Demo t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="partners"><Partners t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="awards"><Awards t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="testimonials"><Testimonials t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="investors"><Investors t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="comparison"><Comparison t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="roadmap"><Roadmap t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="faq"><FAQ t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="newsletter"><Newsletter t={t} /></Section>
          </SectionWrapper>
        </Suspense>

        <Suspense fallback={<LoadingSection />}>
          <SectionWrapper>
            <Section id="contact"><CTA lang={lang} />
            </Section>
          </SectionWrapper>
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer rights={t.footer.rights} />
      </Suspense>

      {/* Chatbot */}
      <Suspense fallback={null}>
        <Chatbot lang={lang} />
      </Suspense>
    </motion.div>
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


// Loading fallback component
function LoadingSection() {
  return (
    <div className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[200px]">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
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


