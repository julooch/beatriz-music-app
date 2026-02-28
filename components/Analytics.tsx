"use client"

import { useEffect } from "react"

export default function Analytics() {
    useEffect(() => {
        // Run only on client
        if (typeof window === "undefined") return;

        const sessionId = localStorage.getItem("bf_session_id") || crypto.randomUUID();
        localStorage.setItem("bf_session_id", sessionId);

        // 1. Log Site View on Mount
        fetch("/api/metrics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventType: "SITE_VIEW", sessionId })
        }).catch(err => console.error(err));

        // 2. Track Session Duration
        const startTime = Date.now();
        let sessionTracked = false;

        const logSession = () => {
            if (sessionTracked) return;
            const durationMinutes = (Date.now() - startTime) / 60000;

            // Using SendBeacon which is guaranteed to run even if tab is closing
            const blob = new Blob([JSON.stringify({
                eventType: "SESSION_DURATION",
                sessionId,
                duration: durationMinutes
            })], { type: 'application/json' });

            navigator.sendBeacon("/api/metrics/track", blob);
            sessionTracked = true;
        };

        // Track when user leaves page or hides tab
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") {
                logSession();
            }
        });

        window.addEventListener("beforeunload", logSession);

        return () => {
            window.removeEventListener("beforeunload", logSession);
            // Don't remove visibilitychange to keep it listening if component remounts
        }
    }, [])

    return null; // Invisible component
}
