import { motion } from "framer-motion"
import { ArrowRight, Play, Pause, SkipBack, SkipForward, Maximize2 } from "lucide-react"
import { useRef, useState, useEffect, useCallback } from "react"

// ── Custom video player ─────────────────────────────────────────────
function VideoPlayer() {
  const videoRef = useRef(null)
  const wrapRef = useRef(null)
  const barRef = useRef(null)
  const hideTimer = useRef(null)

  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [showPh, setShowPh] = useState(true)   // placeholder until canplay
  const [showCtrl, setShowCtrl] = useState(false)  // controls overlay
  const [isFull, setIsFull] = useState(false)

  /* ── hide controls after 2.5 s of inactivity ── */
  const scheduleHide = useCallback(() => {
    clearTimeout(hideTimer.current)
    setShowCtrl(true)
    hideTimer.current = setTimeout(() => setShowCtrl(false), 2500)
  }, [])

  /* ── time update ── */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      setProgress(v.currentTime)
      if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1))
    }
    const onMeta = () => setDuration(v.duration)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("loadedmetadata", onMeta)
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("loadedmetadata", onMeta)
    }
  }, [])

  /* ── fullscreen change ── */
  useEffect(() => {
    const onFull = () => setIsFull(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", onFull)
    return () => document.removeEventListener("fullscreenchange", onFull)
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
    scheduleHide()
  }

  const seek = (delta) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + delta))
    scheduleHide()
  }

  const toggleFull = () => {
    const el = wrapRef.current
    if (!document.fullscreenElement) el.requestFullscreen?.()
    else document.exitFullscreen?.()
    scheduleHide()
  }

  const seekByClick = (e) => {
    const v = videoRef.current
    const rect = barRef.current.getBoundingClientRect()
    const frac = (e.clientX - rect.left) / rect.width
    v.currentTime = frac * v.duration
    scheduleHide()
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00"
    const m = Math.floor(s / 60), sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  const pct = duration ? (progress / duration) * 100 : 0
  const buf = duration ? (buffered / duration) * 100 : 0

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000B33", borderRadius: "inherit", overflow: "hidden", cursor: showCtrl ? "default" : "none" }}
      onMouseMove={scheduleHide}
      onMouseLeave={() => setShowCtrl(false)}
      onClick={togglePlay}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src="/assets/hero_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onCanPlay={() => setShowPh(false)}
        onError={() => setShowPh(true)}
      />

      {/* Placeholder */}
      {showPh && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(160deg, #000B33 0%, #0B365F 60%, #071d45 100%)",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.05,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(22,95,151,0.9), rgba(59,130,246,0.85))",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(22,95,151,0.45)", marginBottom: 14,
            animation: "heroPulse 2.6s ease-in-out infinite",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
            AIntegra · Demo video
          </p>
        </div>
      )}

      {/* Controls overlay — fades in/out */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end",
        background: showCtrl ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)" : "transparent",
        opacity: showCtrl ? 1 : 0,
        transition: "opacity 0.3s, background 0.3s",
        pointerEvents: showCtrl ? "auto" : "none",
      }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 8 }}>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              {fmt(progress)}
            </span>
            <div
              ref={barRef}
              onClick={seekByClick}
              style={{ flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.15)", cursor: "pointer", position: "relative" }}
            >
              {/* Buffered */}
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${buf}%`, background: "rgba(255,255,255,0.2)", borderRadius: 4 }} />
              {/* Progress */}
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#165F97,#3E89BB)", borderRadius: 4 }} />
              {/* Thumb */}
              <div style={{ position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: "50%", background: "white", boxShadow: "0 0 6px rgba(0,0,0,0.5)" }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              {fmt(duration)}
            </span>
          </div>

          {/* Buttons row */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Skip back 10s */}
            <button onClick={() => seek(-10)} title="-10s" style={btnStyle}>
              <SkipBack size={16} />
              <span style={{ fontSize: 10 }}>10</span>
            </button>

            {/* Play / Pause */}
            <button onClick={togglePlay} title={playing ? "Pause" : "Play"} style={{ ...btnStyle, width: 36, height: 36, background: "rgba(255,255,255,0.18)" }}>
              {playing ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 1 }} />}
            </button>

            {/* Skip forward 10s */}
            <button onClick={() => seek(10)} title="+10s" style={btnStyle}>
              <span style={{ fontSize: 10 }}>10</span>
              <SkipForward size={16} />
            </button>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Fullscreen */}
            <button onClick={toggleFull} title="Pantalla completa" style={btnStyle}>
              <Maximize2 size={15} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(22,95,151,0.4); transform: scale(1); }
          50%       { box-shadow: 0 0 55px rgba(22,95,151,0.65); transform: scale(1.07); }
        }
      `}</style>
    </div>
  )
}

const btnStyle = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 3,
  width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.12)", color: "white",
  cursor: "pointer", fontSize: 13, padding: 0,
  transition: "background 0.15s",
}

// ── Main Hero component ─────────────────────────────────────────────
export default function Hero({ t }) {
  return (
    <section className="apple-panel rich-dark" style={{ justifyContent: "flex-start", paddingTop: "120px" }}>

      <motion.div
        className="apple-eyebrow"
        style={{ display: "flex", justifyContent: "center" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          background: "rgba(255,255,255,0.075)", border: "1px solid rgba(220,234,240,0.18)",
          padding: "10px 22px 10px 18px", borderRadius: 48,
          backdropFilter: "blur(22px)",
          boxShadow: "0 18px 42px rgba(0,11,51,0.34), inset 0 1px 0 rgba(255,255,255,0.14)"
        }}>
          <img src="/assets/logo_blanco.webp" alt="AIntegra Logo" style={{ height: 38, opacity: 0.95 }} />
          <span className="grad-text" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.02em" }}>
            AIntegra Limited
          </span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="apple-headline-lg"
        style={{ color: "white", marginTop: 8, paddingLeft: 16, paddingRight: 16 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {t.hero.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="apple-sub light-mid"
        style={{ marginTop: 20, paddingLeft: 16, paddingRight: 16 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        {t.hero.subtitle}
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="apple-cta-row"
        style={{
          background: "rgba(255,255,255,0.075)", border: "1px solid rgba(220,234,240,0.16)",
          padding: "6px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 4,
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 44px rgba(0,11,51,0.32)"
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a
          href="#contact"
          style={{
            background: "linear-gradient(135deg, #000B33, #0D406D 55%, #3E89BB)", color: "white",
            padding: "12px 24px", borderRadius: 100, fontSize: 15, fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 10px 24px rgba(0,11,51,0.42), inset 0 1px 0 rgba(255,255,255,0.22)"
          }}
        >
          {t.hero.cta1}
        </a>
        <a
          href="#caty"
          style={{
            color: "rgba(255,255,255,0.8)", padding: "12px 20px 12px 16px",
            borderRadius: 100, fontSize: 15, fontWeight: 500, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s, background 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.06)" }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "transparent" }}
        >
          {t.hero.cta2} <ArrowRight size={16} />
        </a>
      </motion.div>

      {/* Product pills */}
      <motion.div
        className="flex gap-3 mt-10 flex-wrap justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {[
          { name: "CATY", sub: t.hero.catyDesc, href: "#caty", dot: "#165F97" },
          { name: "CAT", sub: t.hero.catDesc, href: "#cat", dot: "#3E89BB" },
        ].map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.075)", border: "1px solid rgba(220,234,240,0.16)", backdropFilter: "blur(18px)" }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.dot, display: "inline-block" }} />
            <span style={{ fontWeight: 600, color: "white", fontSize: 14 }}>{p.name}</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>—&nbsp;{p.sub}</span>
          </a>
        ))}
      </motion.div>

      {/* ── Video player ── */}
      <motion.div
        style={{
          width: "100%", maxWidth: 860, marginTop: 52,
          position: "relative", padding: "0 16px", boxSizing: "border-box"
        }}
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: "-10%",
          background: "radial-gradient(ellipse at 50% 60%, rgba(62,137,187,0.34), transparent 65%)",
          filter: "blur(50px)", zIndex: 0, pointerEvents: "none"
        }} />

        {/* Player */}
        <div style={{
          position: "relative", zIndex: 1,
          borderRadius: 20, overflow: "hidden",
          border: "1px solid rgba(220,234,240,0.16)",
          boxShadow: "0 34px 90px rgba(0,11,51,0.62), 0 0 0 1px rgba(62,137,187,0.14)",
        }}>
          <VideoPlayer />
        </div>
      </motion.div>
    </section>
  )
}
