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
                            position: "fixed", bottom: 20,
                            left: 16, right: 16, margin: "0 auto",
                            zIndex: 999, width: "auto", maxWidth: 860,
                            background: "rgba(255,255,255,0.92)",
                            backdropFilter: "blur(24px) saturate(180%)",
                            borderRadius: 16,
                            border: "1px solid rgba(13,64,109,0.12)",
                            boxShadow: "0 24px 70px rgba(0,11,51,0.14)",
                            padding: "18px",
                            color: "#000B33",
                        }}
                    >
                        <div style={{
                            position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                            background: "linear-gradient(90deg,transparent,rgba(62,137,187,0.55),transparent)"
                        }} />

                        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap", flexDirection: "row" }}>
                            <div className="hidden sm:flex" style={{
                                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                background: "rgba(220,234,240,0.72)", border: "1px solid rgba(13,64,109,0.1)",
                                alignItems: "center", justifyContent: "center"
                            }}>
                                <Cookie size={18} color="#165F97" />
                            </div>

                            <div style={{ flex: 1, minWidth: 220 }}>
                                <p style={{ fontSize: 14, fontWeight: 800, color: "#000B33", margin: "0 0 4px" }}>
                                    Tu privacidad importa
                                </p>
                                <p style={{ fontSize: 13, color: "rgba(0,11,51,0.62)", lineHeight: 1.55, margin: 0 }}>
                                    Usamos cookies necesarias para que el sitio funcione y, con tu permiso, cookies analíticas y de personalización.
                                    Conforme al{" "}
                                    <strong style={{ color: "#0D406D" }}>RGPD</strong> puedes gestionar o retirar tu consentimiento en cualquier momento.{" "}
                                    <a href="#" style={{ color: "#165F97", textDecoration: "underline" }}>Política de privacidad</a>
                                </p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", width: "100%", justifyContent: "flex-end" }}>
                                <button
                                    onClick={onOpenSettings}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 6,
                                        padding: "9px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                                        background: "#F5FAFD", border: "1px solid rgba(13,64,109,0.12)",
                                        color: "#000B33", cursor: "pointer"
                                    }}
                                >
                                    <Settings size={13} /> Personalizar
                                </button>
                                <button
                                    onClick={onRejectAll}
                                    style={{
                                        padding: "9px 16px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                                        background: "white", border: "1px solid rgba(13,64,109,0.12)",
                                        color: "rgba(0,11,51,0.62)", cursor: "pointer"
                                    }}
                                >
                                    Solo necesarias
                                </button>
                                <button
                                    onClick={onAcceptAll}
                                    style={{
                                        padding: "9px 20px", borderRadius: 999, fontSize: 13, fontWeight: 800,
                                        background: "#000B33",
                                        border: "none", color: "white", cursor: "pointer",
                                        boxShadow: "0 14px 28px rgba(0,11,51,0.18)"
                                    }}
                                >
                                    Aceptar todas
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
