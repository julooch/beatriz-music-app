"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function trackClick(eventName: string) {
    const sessionId = typeof window !== "undefined" ? localStorage.getItem("bf_session_id") : null;
    if (!sessionId) return;

    fetch("/api/metrics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType: eventName, sessionId })
    }).catch(err => console.error(err));
}

export function HeroAgendarButton() {
    return (
        <Button
            size="lg"
            className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1"
            asChild
            onClick={() => trackClick("CLICK_AGENDAR")}
        >
            <Link href="/agendamento">
                Agendar Aula <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
        </Button>
    )
}

export function CTAAgendarButton() {
    return (
        <Button
            size="lg"
            className="h-16 px-12 text-xl font-bold rounded-full bg-white text-primary hover:bg-gray-100 shadow-xl transition-transform hover:scale-105"
            asChild
            onClick={() => trackClick("CLICK_AGENDAR")}
        >
            <Link href="/agendamento">Marcar a minha primeira aula</Link>
        </Button>
    )
}
