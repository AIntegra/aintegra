import { motion, AnimatePresence } from "framer-motion"
import { Cookie, Settings } from "lucide-react"
import CookieSettings from "./CookieSettings"

export default function CookieBanner({
    show, consent,
    onAcceptAll, onRejectAll, onSaveCustom,
    showSettings, onOpenSettings, onCloseSettings
}) {
    return (
        <>
            {/* ── Bottom banner ── */}
            <AnimatePresence>
                {show && !showSettings && (
                    <motion.div
                        role="dialog"
                        aria-label="Aviso de cookies"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{
                            position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
                            zIndex: 999, width: "calc(100% - 32px)", maxWidth: 860,
                            background: "rgba(10,10,18,0.96)",
                            backdropFilter: "blur(24px) saturate(180%)",
                            borderRadius: 20,
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
                            padding: "20px 24px",
                        }}
                    >
                        {/* Top glow line */}
                        <div style={{
                            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                            background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),transparent)"
                        }} />

                        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap", flexDirection: "row" }}>
                            {/* Icon - hidden on very small screens to save space if needed, otherwise shrinks */}
                            <div className="hidden sm:flex" style={{
                                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Cookie size={18} color="#a78bfa" />
                            </div>

                            {/* Text */}
                            <div style={{ flex: 1, minWidth: 220 }}>
                                <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: "0 0 4px" }}>
                                    Tu privacidad importa
                                </p>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, margin: 0 }}>
                                    Usamos cookies necesarias para que el sitio funcione y, con tu permiso, cookies analíticas y de personalización.
                                    Conforme al{" "}
                                    <strong style={{ color: "rgba(255,255,255,0.6)" }}>RGPD</strong> puedes gestionar o retirar tu consentimiento en cualquier momento.{" "}
                                    <a href="#" style={{ color: "#a78bfa", textDecoration: "underline" }}>Política de privacidad</a>
                                </p>
                            </div>

                            {/* Actions */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", width: "100%", justifyContent: "flex-end" }}>
                                <button
                                    onClick={onOpenSettings}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 6,
                                        padding: "9px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500,
                                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                                        color: "rgba(255,255,255,0.65)", cursor: "pointer"
                                    }}
                                >
                                    <Settings size={13} /> Personalizar
                                </button>
                                <button
                                    onClick={onRejectAll}
                                    style={{
                                        padding: "9px 16px", borderRadius: 10, fontSize: 13, fontWeight: 500,
                                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                        color: "rgba(255,255,255,0.45)", cursor: "pointer"
                                    }}
                                >
                                    Solo necesarias
                                </button>
                                <button
                                    onClick={onAcceptAll}
                                    style={{
                                        padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                                        background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                                        border: "none", color: "white", cursor: "pointer",
                                        boxShadow: "0 0 16px rgba(124,58,237,0.4)"
                                    }}
                                >
                                    Aceptar todas
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Settings modal ── */}
            <AnimatePresence>
                {showSettings && (
                    <CookieSettings
                        consent={consent}
                        onSave={onSaveCustom}
                        onAcceptAll={onAcceptAll}
                        onClose={onCloseSettings}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
