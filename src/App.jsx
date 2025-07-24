import React, { useRef, useEffect, useState } from "react";
import logoBlanco from './img/logo_blanco.png';
import Chart from "chart.js/auto";
import kirakai from './img/kirakai.png';
import kirakaiEN from './img/kirakaiEN.png';
import sergio from './img/sergio2.jpg';
import nerea from './img/nerea1.jpg';
import accesibilidad from './img/accesibilidad.jpeg';
import gestos from './img/gestos.jpeg';
import premio from './img/premio.jpg';


// Paleta y contenido como antes...
const palette = {
  bg: "#f7f9fc",
  card: "#fff",
  blue: "#0068e9",
  blueSoft: "#eaf6ff",
  border: "#e3e7ed",
  shadow: "0 8px 32px #0e357315",
  text: "#222c3a",
  sub: "#6b7a90",
  accent: "#80cfff",
  green: "#12bc65",
  gray: "#e6e9ef",
};
// Añade esto encima del componente App
const iconCardImages = [
  gestos, // Imagen para "Gestos"
  kirakai, // Imagen para "IA personalizada"
  accesibilidad, // Imagen para "Cumplimiento legal"
];

const icons = {
  vision: "🌍",
  mission: "⚡",
  impacto: "💡",
  ventaja: "⭐",
  equipo: "🤝",
  producto: "🖐️",
  ai: "🤖",
  compliance: "🛡️",
  premio: "🏆",
  partner: "🤝",
};

const strings = {
  es: {
    langBtn: "English",
    menu: {
      inicio: "Inicio",
      equipo: "Equipo",
      producto: "Producto",
      negocio: "Negocio",
      valor: "Valor",
      premios: "Premios",
      roadmap: "Crecimiento",
    },
    hero: {
      lema: "Universaliza tu acceso. El futuro del control digital, para todos.",
      boton: "Descubre la plataforma",
      title: "AIntegra",
    },
    cards: [
      {
        icon: icons.vision,
        title: "Visión",
        desc: "Revolucionar la interacción con ordenadores en todo el mundo, haciéndola natural, inclusiva y eficiente, para que cualquier usuario disfrute de máxima autonomía.",
      },
      {
        icon: icons.mission,
        title: "Misión",
        desc: "Convertirnos en el nuevo estándar universal del control gestual, fusionando accesibilidad, innovación y potencia IA lista para el futuro.",
      },
      {
        icon: icons.impacto,
        title: "Impacto",
        desc: "Promovemos la inclusión real, permitiendo a millones de personas acceder, trabajar y disfrutar del entorno digital, cumpliendo la Ley Europea 2025.",
      },
      {
        icon: icons.ventaja,
        title: "Ventaja Competitiva",
        desc: "Somos el primer reemplazo total del ratón con IA. Universal, asequible, sin etiquetas de discapacidad y validado por ONGs líderes.",
      },
    ],
    equipo: {
      title: `${icons.equipo} Equipo Fundador`,
      sub: "Ingeniería, innovación y pasión social.",
      sergio:
        "Co-fundador, CEO – Ingeniero Telemático, experto en hardware/software accesible y proyectos IA.",
      nerea:
        "Co-fundadora, CTO – Ingeniera Telemática, especializada en accesibilidad y diseño centrado en el usuario.",
    },
    producto: {
      title: "¿Qué es AIntegra?",
      features: [
        "Trackpad inteligente universal: Hardware ergonómico que reconoce gestos y reemplaza el ratón tradicional. Compatible con todos los sistemas operativos.",
        "Software con IA y asistentes virtuales: Automatiza tareas, personaliza la experiencia, permite comandos de voz, describe imágenes y facilita la navegación digital incluso en webs no adaptadas.",
        "Cumplimiento legal y accesibilidad: Solución alineada con las normativas europeas (WCAG 2.2, EN 301 549, Ley 2025) para empresas, instituciones y usuarios particulares.",
        "Modularidad y escalabilidad: Pensado para integrar nuevas funciones, adaptarse a otras discapacidades y evolucionar con el usuario.",
      ],
      icons: [
        { icon: icons.producto, title: "Gestos" },
        { icon: icons.ai, title: "IA personalizada" },
        { icon: icons.compliance, title: "Cumplimiento legal" },
      ],
    },
    negocio: {
      title: "Modelo de negocio",
      lines: [
        {
          title: "B2B/B2G",
          desc: "Licencias y SaaS para empresas, instituciones y universidades.",
        },
        {
          title: "B2C",
          desc: "Venta directa a usuarios, hardware + suscripción software.",
        },
        {
          title: "Consultoría",
          desc: "Servicios premium de formación y accesibilidad digital.",
        },
      ],
      resumen: [
        "Modelo escalable: hardware asequible, software recurrente, servicio global.",
        "Estructura de costes ligera, alianzas para distribución y soporte.",
        "Reinversión continua en I+D, experiencia de usuario y expansión internacional.",
      ],
    },
    valor: {
      title: "¿Por qué elegirnos?",
      reasons: [
        "Universalidad: No es un producto para 'personas con discapacidad', sino el futuro del control digital para todos.",
        "Autonomía: Permite trabajar, estudiar, comunicarse y disfrutar del ocio sin depender de nadie.",
        "Experiencia real validada: Pilotos con ONCE, Inserta, centros educativos y usuarios finales; feedback directo para mejorar cada versión.",
        "Modelo sostenible: Hardware asequible, software bajo suscripción y servicios de formación y consultoría en accesibilidad.",
        "Impacto social y empresarial: Facilita el cumplimiento normativo y mejora la imagen y la responsabilidad social de las organizaciones.",
      ],
    },
    premios: {
      title: "Premios y reconocimientos",
      galeria: [
        {
          tipo: "Premio",
          nombre: "Startup Premiada Red de Preincubadoras ETSE 2025 (Valencia)",
          icon: icons.premio,
        },
        {
          tipo: "Premio",
          nombre: "3er Premio MotivemFest 2024 (Valencia)",
          icon: icons.premio,
        },
        {
          tipo: "Partner",
          nombre: "Colaboración Inserta/ONCE",
          icon: icons.partner,
        },
      ],
    },
    roadmap: {
      title: "Crecimiento y proyección",
      graf1: "Usuarios previstos (escala logarítmica)",
      graf2: "Ingresos anuales previstos (€)",
      usuarios: [0, 500, 2500, 7000, 18000, 38000],
      ingresos: [0, 22000, 110000, 340000, 900000, 1800000],
      years: ["2024", "2025", "2026", "2027", "2028", "2029"],
      tabla: [
        { año: "2025", usuarios: 500, ingresos: "22.000 €" },
        { año: "2026", usuarios: 2500, ingresos: "110.000 €" },
        { año: "2027", usuarios: 7000, ingresos: "340.000 €" },
        { año: "2028", usuarios: 18000, ingresos: "900.000 €" },
        { año: "2029", usuarios: 38000, ingresos: "1.800.000 €" },
      ],
      text: "Nuestro crecimiento está impulsado por la demanda de accesibilidad, la normativa europea y un modelo de negocio escalable y global.",
    },
    video: {
      title: "Conócenos en 1 minuto",
      texto:
        "Descubre en este breve vídeo qué es AIntegra, cuál es nuestro propósito y cómo vamos a cambiar la accesibilidad digital.",
    },
    footer: "Hecho con pasión, propósito y muchas horas de café ☕",
  },
  en: {
    langBtn: "Español",
    menu: {
      inicio: "Home",
      equipo: "Team",
      producto: "Product",
      negocio: "Business",
      valor: "Value",
      premios: "Awards",
      roadmap: "Growth",
    },
    hero: {
      lema: "Universalize your access. The future of digital control, for everyone.",
      boton: "Discover the platform",
      title: "AIntegra",
    },
    cards: [
      {
        icon: icons.vision,
        title: "Vision",
        desc: "Revolutionize computer interaction worldwide, making it natural, inclusive, and efficient, so every user enjoys maximum autonomy.",
      },
      {
        icon: icons.mission,
        title: "Mission",
        desc: "Become the new universal standard for gesture control, fusing accessibility, innovation, and AI power ready for the future.",
      },
      {
        icon: icons.impacto,
        title: "Impact",
        desc: "We foster real inclusion, enabling millions of people to access, work and enjoy digital environments, fully aligned with European Law 2025.",
      },
      {
        icon: icons.ventaja,
        title: "Competitive Edge",
        desc: "We are the first total mouse replacement with AI. Universal, affordable, stigma-free and validated by top NGOs.",
      },
    ],
    equipo: {
      title: `${icons.equipo} Founding Team`,
      sub: "Engineering, innovation and social purpose.",
      sergio:
        "Co-founder, CEO/CTO – Telematics Engineer, expert in accessible hardware/software and AI projects.",
      nerea:
        "Co-founder, COO – Telematics Engineer, specialized in accessibility and user-centered design.",
    },
    producto: {
      title: "What is AIntegra?",
      features: [
        "Universal smart trackpad: Ergonomic hardware that recognizes gestures and replaces the traditional mouse. Compatible with all operating systems.",
        "AI-powered software and virtual assistants: Automates tasks, personalizes experience, supports voice commands, describes images, and enables navigation even on non-accessible websites.",
        "Legal compliance and accessibility: Solution aligned with European regulations (WCAG 2.2, EN 301 549, Law 2025) for companies, institutions, and private users.",
        "Modularity and scalability: Designed to integrate new features, adapt to other disabilities, and evolve with the user.",
      ],
      icons: [
        { icon: icons.producto, title: "Gestures" },
        { icon: icons.ai, title: "Personalized AI" },
        { icon: icons.compliance, title: "Legal compliance" },
      ],
    },
    negocio: {
      title: "Business model",
      lines: [
        {
          title: "B2B/B2G",
          desc: "Licensing and SaaS for companies, institutions and universities.",
        },
        {
          title: "B2C",
          desc: "Direct sale: hardware + software subscription.",
        },
        {
          title: "Consulting",
          desc: "Premium services: training and digital accessibility.",
        },
      ],
      resumen: [
        "Scalable model: affordable hardware, recurring software, global reach.",
        "Lean cost structure, alliances for distribution and support.",
        "Continuous reinvestment in R&D, user experience, and international expansion.",
      ],
    },
    valor: {
      title: "Why choose us?",
      reasons: [
        "Universality: Not just for people with disabilities, but the future of digital control for everyone.",
        "Autonomy: Enables people to work, study, communicate, and enjoy leisure without relying on others.",
        "Real-world validation: Pilots with ONCE, Inserta, schools, and end-users; direct feedback to improve every version.",
        "Sustainable model: Affordable hardware, software subscriptions, training, and consulting services in accessibility.",
        "Social and business impact: Eases legal compliance and enhances organizations' image and social responsibility.",
      ],
    },
    premios: {
      title: "Awards & recognition",
      galeria: [
        {
          tipo: "Award",
          nombre:
            "Award-Winning Startup ETSE Pre-Incubator Network 2025 (Valencia)",
          icon: icons.premio,
        },
        {
          tipo: "Award",
          nombre: "3rd Prize MotivemFest 2024 (Valencia)",
          icon: icons.premio,
        },
        {
          tipo: "Partner",
          nombre: "Inserta/ONCE Collaboration",
          icon: icons.partner,
        },
      ],
      
    },

    
    roadmap: {
      title: "Growth & projection",
      graf1: "Projected users (log scale)",
      graf2: "Projected annual revenue (€)",
      usuarios: [0, 500, 2500, 7000, 18000, 38000],
      ingresos: [0, 22000, 110000, 340000, 900000, 1800000],
      years: ["2024", "2025", "2026", "2027", "2028", "2029"],
      tabla: [
        { año: "2025", usuarios: 500, ingresos: "€22,000" },
        { año: "2026", usuarios: 2500, ingresos: "€110,000" },
        { año: "2027", usuarios: 7000, ingresos: "€340,000" },
        { año: "2028", usuarios: 18000, ingresos: "€900,000" },
        { año: "2029", usuarios: 38000, ingresos: "€1,800,000" },
      ],
      text: "Our growth is driven by accessibility demand, EU legislation and a scalable, global business model.",
    },
    video: {
      title: "Meet us in 1 minute",
      texto:
        "In this short video, discover what AIntegra is, our purpose, and how we are going to change digital accessibility.",
    },
    footer: "Made with passion, purpose and plenty of coffee ☕",
  },
};

// Helper para animaciones on scroll (custom hook)
function useRevealOnScroll(ref, className = "fade-in") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(className);
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 70) el.classList.add(className);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, className]);
}

function App() {
  const [lang, setLang] = useState("es");
  const t = strings[lang];

  const sections = [
    "inicio",
    "equipo",
    "producto",
    "negocio",
    "premios",
    "roadmap",
  ];
  const [activeSection, setActiveSection] = useState("inicio");
  const sectionRefs = Object.fromEntries(
    sections.map((s) => [s, useRef(null)])
  );

  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animaciones reveal
  const revealRefs = sections.reduce(
    (acc, s) => ({ ...acc, [s]: useRef(null) }),
    {}
  );
  sections.forEach((s) => useRevealOnScroll(revealRefs[s]));

  // Charts
  const usuariosRef = useRef(null);
  const ingresosRef = useRef(null);
  const usuariosChartRef = useRef(null);
  const ingresosChartRef = useRef(null);

  useEffect(() => {
    if (usuariosChartRef.current) usuariosChartRef.current.destroy();
    if (usuariosRef.current) {
      usuariosChartRef.current = new Chart(usuariosRef.current, {
        type: "line",
        data: {
          labels: t.roadmap.years,
          datasets: [
            {
              label: t.roadmap.graf1,
              data: t.roadmap.usuarios,
              borderColor: palette.blue,
              backgroundColor: palette.blueSoft,
              tension: 0.28,
              pointBackgroundColor: palette.blue,
              pointRadius: 4,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: {
              type: "logarithmic",
              min: 1,
              max: 40000,
              ticks: { color: palette.sub },
            },
            x: { ticks: { color: palette.sub } },
          },
        },
      });
    }
    if (ingresosChartRef.current) ingresosChartRef.current.destroy();
    if (ingresosRef.current) {
      ingresosChartRef.current = new Chart(ingresosRef.current, {
        type: "line",
        data: {
          labels: t.roadmap.years,
          datasets: [
            {
              label: t.roadmap.graf2,
              data: t.roadmap.ingresos,
              borderColor: palette.green,
              backgroundColor: "#eafbe7",
              tension: 0.23,
              pointBackgroundColor: palette.green,
              pointRadius: 4,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { color: palette.sub } },
            x: { ticks: { color: palette.sub } },
          },
        },
      });
    }
    return () => {
      if (usuariosChartRef.current) usuariosChartRef.current.destroy();
      if (ingresosChartRef.current) ingresosChartRef.current.destroy();
    };
  }, [lang, t]);

  const scrollToSection = (key) => {
    setActiveSection(key);
    sectionRefs[key].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const [bloqueActivo, setBloqueActivo] = useState(null);

  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
        minHeight: "100vh",
        fontFamily: "Segoe UI, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        body { background: ${palette.bg}; }
        nav {
          background: transparent; padding: 1.5rem 0 1.2rem 0; text-align: center;
          border-bottom: 1.5px solid ${palette.gray}; position: sticky; top: 0; z-index: 10;
        }
        nav a {
          color: ${palette.text}; text-decoration: none; margin: 0 1.5rem; font-weight: 600; font-size: 1.13rem;
          letter-spacing: 0.5px; padding: 0.38rem 0.8rem; border-radius: 15px;
          transition: background 0.18s, color 0.14s;
          position: relative; display: inline-block; outline: none;
        }
        nav a:after {
          content: '';
          display: block;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #80cfff, #0068e9 80%);
          transition: width 0.3s cubic-bezier(.4,2.2,.6,1), background .3s;
          border-radius: 2px; position: absolute; bottom: -5px; left: 22%;
        }
        nav a.active:after, nav a:hover:after { width: 55%; }
        nav a.active, nav a:hover {
          background: ${palette.blueSoft};
          color: ${palette.blue};
        }
          .gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 40px;
  padding: 0 20px;
}

.gallery-item {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 8px 32px #0e357315;
  border: 1.5px solid #e3e7ed;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}

.gallery-tipo {
  font-weight: bold;
  color: #6b7a90;
  margin-bottom: 6px;
}

.gallery-nombre {
  color: #222c3a;
}

        .card-img-wrap {
          margin-top: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeSlideDown 0.62s cubic-bezier(.6,1.8,.4,1) 1;
        }
        .card-img-animada {
          max-width: 180px;
          max-height: 120px;
          border-radius: 14px;
          box-shadow: 0 8px 40px #a8e2ff28;
          background: #f5faff;
          opacity: 0;
          transform: translateY(-28px) scale(0.98);
          animation: fadeImg .75s cubic-bezier(.5,1.7,.4,1.05) 1 forwards;
        }
        @keyframes fadeImg {
          from { opacity: 0; transform: translateY(-28px) scale(0.98);}
          to   { opacity: 1; transform: translateY(0) scale(1);}
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-30px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        
        .lang-switch {
          position: fixed; top: 22px; right: 32px; z-index: 120;
          background: ${palette.card}; color: ${palette.blue}; font-weight: bold;
          border-radius: 18px; border: 1.5px solid ${palette.border};
          padding: 0.42rem 1.25rem; cursor: pointer; font-size: 1.03rem;
          box-shadow: 0 1px 9px #b8e0fc26;
          transition: background .14s, color .11s, transform .18s;
          animation: bounceIn .9s cubic-bezier(.8,-0.05,.7,1.25) 1;
        }
        .lang-switch:hover { background: ${palette.blueSoft}; color: #1568e2; transform: scale(1.09); }
        .hero-bg {
          background: #fff; box-shadow: ${palette.shadow}; border-radius: 0 0 30px 30px;
          margin-bottom: 38px; animation: fadeInUp 1.1s cubic-bezier(.6,2.4,.4,1) 1;
        }
        .hero-content { max-width: 880px; margin: 0 auto; text-align: center; padding: 3.1rem 1.1rem 2.6rem 1.1rem; }
        .logo { width: 130px; margin-bottom: 18px; border-radius: 30px; background: #f7f9fc; padding: 0.9rem; box-shadow: 0 0 0 3px #e3f3fe;
          animation: bounceLogo 2.8s infinite; }
        @keyframes bounceLogo { 0%,100% { transform: translateY(0); } 16% { transform: translateY(-12px) scale(1.07); } 22% { transform: translateY(2px) scale(0.96); } 30% { transform: translateY(-7px) scale(1.02); } 36% { transform: translateY(0) scale(1); } }
        .hero-title { font-size: 2.5rem; color: ${palette.blue}; font-weight: 800; letter-spacing: 1.1px; margin-bottom: 0.45rem; }
        .hero-lema { font-size: 1.21rem; color: ${palette.sub}; margin-bottom: 1.2rem; }
        .cta { background: linear-gradient(90deg, #80cfff 45%, #0068e9 100%);
          color: #fff; border: none; font-weight: 700; font-size: 1.11rem; padding: 0.85rem 2.2rem; border-radius: 26px;
          box-shadow: 0 3px 14px #80cfff28;
          cursor: pointer; margin: 1.5rem 0 1.5rem 0;
          transition: background .17s, transform .16s, color .14s;
          animation: popFadeIn .7s cubic-bezier(.7,1.3,.3,1) .7s 1;
        }
        .cta:hover { background: linear-gradient(90deg, #a7e5ff 15%, #0068e9 100%); color: #f5fdff; transform: scale(1.08);}
        @keyframes bounceIn { 0%{transform:scale(.7); opacity:0;} 65%{transform:scale(1.15); opacity:1;} 80%{transform:scale(.97);} 100%{transform:scale(1);} }
        @keyframes fadeInUp { from{opacity:0; transform:translateY(80px);} to{opacity:1; transform:none;} }
        @keyframes popFadeIn { 0%{transform:scale(.93); opacity:0;} 80%{transform:scale(1.05);} 100%{transform:scale(1); opacity:1;} }
        .fade-in { animation: fadeInUp 0.88s cubic-bezier(.7,2.5,.2,1) 1; opacity:1!important; }
        .slide-in { animation: slideInLeft 1.1s cubic-bezier(.5,1.8,.3,1) 1; opacity:1!important; }
        @keyframes slideInLeft { from{opacity:0; transform:translateX(-60px);} to{opacity:1; transform:none;} }
        .icon-cards { display: flex; flex-wrap: wrap; gap: 1.7rem; justify-content: center; margin-bottom: 1.6rem; margin-top: 2.4rem; }
        .icon-card { background: #fff; border-radius: 19px; flex: 1 1 180px; min-width: 190px; max-width: 250px; padding: 1.45rem 1.1rem 1.15rem 1.1rem;
          text-align: center; cursor: pointer; box-shadow: 0 2px 18px #89cffb22, 0 1px 1.5px #c9d5e6;
          border: 1.2px solid #e6e9ef; transition: box-shadow .18s, transform .18s;
          will-change: transform, box-shadow;
        }
        .icon-card:hover, .icon-card.activa {
          box-shadow: 0 10px 32px #b5e8ff70, 0 3px 9px #b8e6fc44;
          border-color: #90e0ff;
          transform: translateY(-5px) scale(1.04);
        }
        .icon-emoji { font-size: 2.3rem; margin-bottom: 0.17rem;}
        .icon-title { color: ${palette.blue}; font-weight: 700; font-size: 1.17rem; margin-bottom: 0.23rem; letter-spacing: .3px;}
        .icon-desc { color: ${palette.sub}; font-size: 1.02rem; line-height: 1.5;}
        .section-title { color: ${palette.blue}; font-size: 1.36rem; font-weight: 700; letter-spacing: 1.1px; margin-bottom: 1.05rem; text-align: center;}
        .team-wrap { display: flex; gap: 2.6rem; justify-content: center; align-items: center; margin-bottom: 1.2rem; }
        .team-avatar { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; box-shadow: 0 2px 11px #98e3ff35, 0 0 0 2px #e3e7ed; background: #f5f8fb; transition: transform .25s;}
        .team-avatar:hover { transform: scale(1.08) rotate(-3deg);}
        .team-info { color: #384f69; font-size: 1.09rem; max-width: 350px; }
        .team-name { color: ${palette.blue}; font-weight: 600;}
        .section-sub { color: #8da6c5; font-size: 1.03rem; text-align: center; margin-bottom: 1.3rem;}
        .features-list { max-width: 650px; margin: 0 auto; color: #425e78; font-size: 1.08rem; margin-bottom: 1.6rem; }
        .features-list li { margin-bottom: 1.04rem; line-height: 1.7;}
        .features-icons { display: flex; gap: 1.3rem; justify-content: center; margin: 2.0rem 0;}
        .feat-ico-card {
          background: linear-gradient(115deg, #f2faff 80%, #e4f0ff 100%);
          border-radius: 13px; padding: 1.0rem 1.2rem; color: ${palette.blue}; font-size: 2.01rem; box-shadow: 0 2px 10px #19bfff18;
          display: flex; flex-direction: column; align-items: center; min-width: 74px; max-width: 130px; border:1.1px solid #e6e9ef;
          transition: transform .15s;
        }
        .feat-ico-card:hover { transform: scale(1.11) rotate(5deg);}
        .feat-ico-title { color: #2d4059; font-size: 1.01rem; margin-top: 0.36rem;}
        .negocio-list, .negocio-resumen { max-width: 600px; margin: 0 auto; }
        .negocio-list li, .negocio-resumen li { color: #566e85; margin-bottom: 0.75rem; font-size: 1.03rem; }
        .premios-wrap { display: flex; flex-wrap: wrap; justify-content: center; gap: 2.0rem; margin: 2.2rem 0;}
        .premio-card {
          background: #fff; border-radius: 14px; box-shadow: 0 2px 18px #89cffb22, 0 1px 2px #b9d5e6;
          padding: 1.02rem 1.7rem; min-width: 220px; display: flex; align-items: center; gap: 1.12rem;
          border: 1.2px solid #e6e9ef; font-size: 1.11rem; color: #2875ae; font-weight: 600;
          transition: box-shadow .18s, transform .18s;
          will-change: transform, box-shadow;
          cursor: pointer;
        }
        .premio-card:hover {
          box-shadow: 0 10px 30px #e3f6ff80;
          transform: translateY(-6px) scale(1.04) rotate(-1.3deg);
        }
        .premio-icon { font-size: 2.1rem; margin-right: 0.55rem;}
        .charts-row { display: flex; flex-wrap: wrap; gap: 2.5rem; justify-content: center; align-items: flex-start; margin: 2.5rem 0 0.3rem 0;}
        .chart-box { background: #f2faff; border-radius: 21px; padding: 1.13rem 1.7rem; box-shadow: 0 4px 30px #89d8fc22;
          margin: 0 0 1.2rem 0; min-width: 270px; max-width: 340px; text-align: center; border: 1.1px solid #e0e6ee;}
        .chart-box h3 { color: ${palette.blue}; margin-bottom: 1rem; font-size: 1.08rem; font-weight: 600;}
        .roadmap-table { width:100%; border-collapse:collapse; margin: 1.3rem auto 0 auto; max-width: 470px;}
        .roadmap-table th, .roadmap-table td { padding: 0.55rem 1.1rem; border-bottom: 1px solid #e6e9ef; text-align: center;}
        .roadmap-table th { color: ${palette.blue}; background: #f7fbff; }
        .roadmap-table tr:last-child td { border-bottom: none;}
        .footer {
          margin-top: 2.6rem; color: #7689a2; font-size: 0.98rem; opacity: 0.89;
          text-align: center; padding-bottom: 1.1rem; letter-spacing: 0.23px;
        }
        /* Animaciones reveal */
        .fade-in { opacity:0; animation: fadeInUp 1.15s cubic-bezier(.55,2.2,.2,1) 1 forwards;}
        .slide-in { opacity:0; animation: slideInLeft 1s cubic-bezier(.6,2,.1,1) 1 forwards;}
        @media (max-width: 980px) {
          .hero-content { padding: 1rem 0.5rem;}
          .icon-cards { flex-direction: column; gap: 1.1rem;}
          .team-wrap { flex-direction: column; gap: 1.1rem;}
          .charts-row { flex-direction: column; gap: 1.2rem;}
          .features-icons { flex-direction: column;}
          .premios-wrap { flex-direction: column;}
          
        }
      `}</style>

      {/* BOTÓN IDIOMA */}
      <button
        className="lang-switch"
        onClick={() => setLang(lang === "es" ? "en" : "es")}
      >
        {t.langBtn} {lang === "es" ? "🇬🇧" : "🇪🇸"}
      </button>

      {/* NAV */}
      <nav
        className={navScrolled ? "nav-scrolled" : ""}
        style={{
          background: navScrolled ? "#fff" : "rgba(255,255,255,0.86)",
          boxShadow: navScrolled ? "0 2px 12px #c4e6ff33" : "none",
          backdropFilter: navScrolled ? "saturate(160%) blur(10px)" : "none",
          transition: "all .27s cubic-bezier(.3,1.6,.3,1)",
          padding: "1.3rem 0 1.13rem 0",
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: navScrolled ? "1.5px solid #e3e7ed" : "none",
        }}
      >
        {sections.map((key) => (
          <a
            key={key}
            href={`#${key}`}
            className={activeSection === key ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(key);
            }}
          >
            {t.menu[key]}
          </a>
        ))}
      </nav>

      {/* HERO */}
      <div className="hero-bg" ref={sectionRefs.inicio}>
        <div className="hero-content fade-in" ref={revealRefs.inicio}>
          <img src={logoBlanco} alt="Logo AIntegra" className="logo" />
          <div className="hero-title">{t.hero.title}</div>
          <div className="hero-lema">{t.hero.lema}</div>
          <button className="cta" onClick={() => scrollToSection("producto")}>
            {t.hero.boton}
          </button>
          {/* ICON CARDS con imágenes animadas */}
          <div className="icon-cards">
            {t.producto.icons.map((ico, i) => (
              <div
                className={`icon-card${bloqueActivo === i ? " activa" : ""}`}
                key={ico.title}
                onClick={() => setBloqueActivo(bloqueActivo === i ? null : i)}
                tabIndex={0}
                style={{ animationDelay: `${0.1 * i + 0.1}s` }}
              >
                <div className="icon-emoji">{ico.icon}</div>
                <div className="icon-title">{ico.title}</div>
                {/* Solo muestra la imagen si está activo */}
                {bloqueActivo === i && (
                  <div className="card-img-wrap">
                    <img
                      src={iconCardImages[i]}
                      alt={ico.title}
                      className="card-img-animada"
                      draggable={false}
                      style={{ margin: "0 auto" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EQUIPO */}
      <div ref={sectionRefs.equipo}>
        <div className="section-title fade-in" ref={revealRefs.equipo}>
          {t.equipo.title}
        </div>
        <div className="section-sub">{t.equipo.desc}</div>
        <div className="team-wrap fade-in" ref={revealRefs.equipo}>
          <img src={sergio} alt="Sergio" className="team-avatar" />
          <img src={nerea} alt="Nerea" className="team-avatar" />
          <div className="team-info">
            <div className="team-name">{t.equipo.sergio}</div>
            <br />
            <div className="team-name">{t.equipo.nerea}</div>
          </div>
        </div>
      </div>

      {/* PRODUCTO */}
      <div ref={sectionRefs.producto}>
        <div className="section-title fade-in" ref={revealRefs.producto}>
          {t.producto.title}
        </div>
        <div className="section-sub">{t.producto.desc}</div>
        <ul className="features-list">
          {t.producto.features.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="features-icons">
          {t.producto.icons.map((ico, i) => (
            <div
              className="feat-ico-card"
              key={ico.title}
              style={{ animationDelay: `${0.12 * i}s` }}
            >
              <span>{ico.icon}</span>
              <div className="feat-ico-title">{ico.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NEGOCIO */}
      <div ref={sectionRefs.negocio}>
        <div className="section-title fade-in" ref={revealRefs.negocio}>
          {t.negocio.title}
        </div>
        <ul className="negocio-list">
          {t.negocio.lines.map((l, i) => (
            <li key={i}>
              <b>{l.title}:</b> {l.desc}
            </li>
          ))}
        </ul>
        <ul className="negocio-resumen">
          {t.negocio.resumen.map((txt, i) => (
            <li key={i}>{txt}</li>
          ))}
        </ul>
      </div>

  {/* PREMIOS */}
<div ref={sectionRefs.premios}>
  <div className="section-title fade-in" ref={revealRefs.premios}>
    {t.premios.title}
  </div>
  <div className="gallery">
    {t.premios.galeria.map((item, idx) => (
      <div key={idx} className="gallery-item fade-in">
        <div className="gallery-icon">{item.icon}</div>
        <div className="gallery-tipo">{item.tipo}</div>
        <div className="gallery-nombre">{item.nombre}</div>
      </div>
    ))}
  </div>
</div>


{/* Imagen destacada antes del Roadmap */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    margin: "60px auto",
  }}
>
  <div
    style={{
      background: palette.card,
      padding: "24px",
      borderRadius: "24px",
      boxShadow: palette.shadow,
      border: `1.5px solid ${palette.border}`,
      maxWidth: "380px",
      width: "100%",
      textAlign: "center",
    }}
  >
    <img
      src={premio}
      alt="Accesibilidad"
      style={{
        width: "100%",
        borderRadius: "16px",
        objectFit: "cover",
        marginBottom: "12px",
      }}
    />
    <h3
      style={{
        margin: 0,
        fontSize: "1.1rem",
        color: palette.text,
        fontWeight: 600,
      }}
    >
      Nuestro compromiso con la accesibilidad
    </h3>
  </div>
</div>

      {/* ROADMAP Y GRÁFICAS */}
      <div ref={sectionRefs.roadmap}>
        <div className="section-title fade-in" ref={revealRefs.roadmap}>
          {t.roadmap.title}
        </div>
        <div className="charts-row">
          <div className="chart-box fade-in">
            <h3>{t.roadmap.graf1}</h3>
            <canvas ref={usuariosRef} width={300} height={210}></canvas>
          </div>
          <div className="chart-box fade-in">
            <h3>{t.roadmap.graf2}</h3>
            <canvas ref={ingresosRef} width={300} height={210}></canvas>
          </div>
        </div>
        <table className="roadmap-table fade-in">
          <thead>
            <tr>
              <th>{lang === "es" ? "Año" : "Year"}</th>
              <th>{lang === "es" ? "Usuarios" : "Users"}</th>
              <th>{lang === "es" ? "Ingresos" : "Revenue"}</th>
            </tr>
          </thead>
          <tbody>
            {t.roadmap.tabla.map((fila, i) => (
              <tr key={i}>
                <td>{fila.año}</td>
                <td>{fila.usuarios.toLocaleString("en-US")}</td>
                <td>{fila.ingresos}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="section-sub" style={{ marginTop: "1.2rem" }}>
          {t.roadmap.text}
        </div>
      </div>

      {/* VIDEO */}
      <div
        className="slide fade-in"
        style={{ background: "none", boxShadow: "none", marginTop: 30 }}
      >
        <div className="section-title">{t.video.title}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            width="360"
            height="640"
            src="https://www.youtube.com/embed/1LTzhi8daEU"
            title="Presentación AIntegra"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              borderRadius: "20px",
              boxShadow: "0 0 20px #19bfff33",
            }}
          ></iframe>
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: palette.sub,
            fontSize: "1.08rem",
          }}
        >
          {t.video.texto}
        </p>
      </div>

      {/* FOOTER */}
      <div className="footer">{t.footer}</div>
    </div>
  );
}

export default App;
