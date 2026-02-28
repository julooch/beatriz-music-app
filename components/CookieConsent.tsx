"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("bf_consent")
        if (!consent) {
            setVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("bf_consent", "accepted")
        setVisible(false)
    }

    const handleReject = () => {
        localStorage.setItem("bf_consent", "rejected")
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up">
            <div className="bg-zinc-900 text-white border-t border-zinc-700 shadow-2xl">
                <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex-1 text-sm text-zinc-300 text-center sm:text-left">
                        <p>
                            Utilizamos cookies e rastreamento anônimo para melhorar sua experiência.
                            Ao aceitar, você concorda com nossa{" "}
                            <Link href="/privacidade" className="underline text-purple-400 hover:text-purple-300 font-medium">
                                Política de Privacidade
                            </Link>.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={handleReject}
                            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white border border-zinc-600 rounded-lg hover:border-zinc-400 transition-colors"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={handleAccept}
                            className="px-6 py-2 text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-lg"
                        >
                            Aceitar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
