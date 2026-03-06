import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, BarChart2, Megaphone, SlidersHorizontal, ChevronDown } from "lucide-react"
import { CATEGORIES } from "../hooks/useCookieConsent"

const CATEGORY_META = {
    necessary: { icon: Shield, color: "#10b981", desc: "Imprescindibles para el funcionamiento básico del sitio. No se pueden desactivar.", examples: "Sesión, seguridad, idioma." },
    analytics: { icon: BarChart2, color: "#7c3aed", desc: "Nos ayudan a entender cómo los usuarios interactúan con el sitio para mejorarlo.", examples: "Google Analytics, Plausible." },
    marketing: { icon: Megaphone, color: "#f59e0b", desc: "Usadas para mostrarte anuncios relevantes en otras plataformas.", examples: "Meta Pixel, Google Ads." },
    preferences: { icon: SlidersHorizontal, color: "#3b82f6", desc: "Recuerdan tus preferencias como idioma o región.", examples: "Idioma seleccionado, región." },
}

function Toggle({ checked, onChange, disabled }) {
    return (
        <button
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            style={{
                flexShrink: 0, width: 44, height: 24, borderRadius: 12, padding: 2,
                background: checked ? "#7c3aed" : "rgba(255,255,255,0.1)",
                border: "none", cursor: disabled ? "not-allowed" : "pointer",
                transition: "background 0.2s", position: "relative", display: "flex", alignItems: "center"
            }}
            aria-checked={checked}
            role="switch"
        >
            <span style={{
                width: 20, height: 20, borderRadius: "50%", background: "white",
                transform: checked ? "translateX(20px)" : "translateX(0)",
                transition: "transform 0.2s", display: "block"
            }} />
        </button>
    )
}

function CategoryRow({ id, meta, checked, onChange }) {
    const [open, setOpen] = useState(false)
    const { icon: Icon, color, desc, examples } = meta
    const cat = CATEGORIES[id]

    return (
        <div style={{
            borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)", overflow: "hidden"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
                {/* Icon */}
                <div style={{
                    width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center",
                    justifyContent: "center", background: `${color}18`, flexShrink: 0
                }}>
                    <Icon size={16} color={color} />
                </div>

                {/* Label */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{cat.label}</span>
                        {cat.required && (
                            <span style={{
                                fontSize: 10, fontWeight: 700, color, background: `${color}20`,
                                padding: "2px 7px", borderRadius: 20, letterSpacing: "0.06em"
                            }}>Requerida</span>
                        )}
                    </div>
                </div>

                {/* Expand + toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                        onClick={() => setOpen(o => !o)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 4, lineHeight: 0 }}
                    >
                        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                    <Toggle checked={checked} onChange={onChange} disabled={cat.required} />
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}
                    >
                        <div style={{ padding: "14px 20px 16px 70px" }}>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 6px" }}>{desc}</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                                <strong style={{ color: "rgba(255,255,255,0.45)" }}>Ejemplos:</strong> {examples}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function CookieSettings({ consent, onSave, onAcceptAll, onClose }) {
    const [local, setLocal] = useState({
        necessary: true,
        analytics: consent.analytics,
        marketing: consent.marketing,
        preferences: consent.preferences,
    })

    const toggle = (key) => setLocal(s => ({ ...s, [key]: !s[key] }))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: 16
            }}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                style={{
                    width: "100%", maxWidth: 560, maxHeight: "90vh",
                    background: "#0d0d12", borderRadius: 24,
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
                    display: "flex", flexDirection: "column", overflow: "hidden"
                }}
            >
                {/* Header */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "24px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)"
                }}>
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "0 0 4px" }}>
                            Preferencias de privacidad
                        </h2>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                            AIntegra Limited · RGPD Compliant
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "rgba(255,255,255,0.07)", border: "none", borderRadius: 10,
                            width: 36, height: 36, cursor: "pointer", color: "rgba(255,255,255,0.6)",
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Categories */}
                <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 8px" }}>
                        Usamos cookies para garantizar el funcionamiento del sitio y, con tu consentimiento, para analytics y personalización. Puedes gestionar tus preferencias en cualquier momento.
                    </p>
                    {Object.keys(CATEGORIES).map(id => (
                        <CategoryRow
                            key={id}
                            id={id}
                            meta={CATEGORY_META[id]}
                            checked={local[id]}
                            onChange={() => toggle(id)}
                        />
                    ))}
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 8, lineHeight: 1.6 }}>
                        Al usar nuestro sitio aceptas nuestra{" "}
                        <a href="#" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline" }}>Política de Privacidad</a>.
                        Puedes retirar tu consentimiento en cualquier momento desde el pie de página.
                    </p>
                </div>

                {/* Footer */}
                <div style={{
                    display: "flex", gap: 10, padding: "20px 24px",
                    borderTop: "1px solid rgba(255,255,255,0.07)"
                }}>
                    <button
                        onClick={() => onSave(local)}
                        style={{
                            flex: 1, padding: "12px 0", borderRadius: 12,
                            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: 14, cursor: "pointer"
                        }}
                    >
                        Guardar preferencias
                    </button>
                    <button
                        onClick={onAcceptAll}
                        style={{
                            flex: 1, padding: "12px 0", borderRadius: 12,
                            background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                            border: "none", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer",
                            boxShadow: "0 0 20px rgba(124,58,237,0.35)"
                        }}
                    >
                        Aceptar todas
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
