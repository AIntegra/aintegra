import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "aintegra_cookie_consent"
const VERSION = "1.0" // bump to re-ask on policy change

export const CATEGORIES = {
    necessary: { id: "necessary", label: "Necesarias", required: true },
    analytics: { id: "analytics", label: "Analíticas", required: false },
    marketing: { id: "marketing", label: "Marketing", required: false },
    preferences: { id: "preferences", label: "Preferencias", required: false },
}

const DEFAULT_STATE = {
    version: VERSION,
    decided: false,
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    timestamp: null,
}

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (parsed.version !== VERSION) return null // policy changed
        return parsed
    } catch {
        return null
    }
}

function writeStorage(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, timestamp: new Date().toISOString() }))
    } catch { }
}

export function useCookieConsent() {
    const [consent, setConsent] = useState(() => readStorage() ?? DEFAULT_STATE)
    const [showBanner, setShowBanner] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    // Show banner only after mount (avoids SSR flash)
    useEffect(() => {
        const stored = readStorage()
        if (!stored || !stored.decided) setShowBanner(true)
    }, [])

    const save = useCallback((updates) => {
        const next = { ...DEFAULT_STATE, ...updates, decided: true, necessary: true }
        setConsent(next)
        writeStorage(next)
        setShowBanner(false)
        setShowSettings(false)
        // Fire custom event so App can react (e.g. load GA)
        window.dispatchEvent(new CustomEvent("cookieConsentChange", { detail: next }))
    }, [])

    const acceptAll = useCallback(() => save({
        analytics: true, marketing: true, preferences: true
    }), [save])

    const rejectAll = useCallback(() => save({
        analytics: false, marketing: false, preferences: false
    }), [save])

    const saveCustom = useCallback((custom) => save(custom), [save])

    const openSettings = useCallback(() => setShowSettings(true), [])
    const closeSettings = useCallback(() => setShowSettings(false), [])
    const reopenBanner = useCallback(() => setShowBanner(true), [])

    return {
        consent,
        showBanner,
        showSettings,
        acceptAll,
        rejectAll,
        saveCustom,
        openSettings,
        closeSettings,
        reopenBanner,
    }
}
