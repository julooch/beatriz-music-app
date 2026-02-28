"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

import { usePathname } from "next/navigation"

export default function Header() {
    const pathname = usePathname()

    const handleTrackClick = (eventName: string) => {
        // Do not track clicks if viewing from the admin restricted area
        if (pathname?.startsWith("/admin")) return;

        // Respect user consent
        const consent = typeof window !== "undefined" ? localStorage.getItem("bf_consent") : null;
        if (consent !== "accepted") return;

        const sessionId = typeof window !== "undefined" ? localStorage.getItem("bf_session_id") : null;
        if (!sessionId) return;

        fetch("/api/metrics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ eventType: eventName, sessionId })
        }).catch(err => console.error(err));
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight">Beatriz Faina</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/#sobre" onClick={() => handleTrackClick("CLICK_SOBRE")} className="text-sm font-medium hover:text-primary transition-colors">
                        Sobre
                    </Link>
                    <Link href="/#metodologia" onClick={() => handleTrackClick("CLICK_METODOLOGIA")} className="text-sm font-medium hover:text-primary transition-colors">
                        Metodologia
                    </Link>
                    <Link href="/#depoimentos" onClick={() => handleTrackClick("CLICK_DEPOIMENTOS")} className="text-sm font-medium hover:text-primary transition-colors">
                        Depoimentos
                    </Link>
                    <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Área da Professora
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button asChild className="hidden md:inline-flex" onClick={() => handleTrackClick("CLICK_AGENDAR")}>
                        <Link href="/agendamento">Agendar Aula</Link>
                    </Button>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col gap-6 pt-12">
                                <Link href="/" className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl font-bold tracking-tight">Beatriz Faina</span>
                                </Link>
                                <nav className="flex flex-col gap-6 mt-4">
                                    <Link href="/#sobre" onClick={() => handleTrackClick("CLICK_SOBRE")} className="text-lg font-medium hover:text-primary transition-colors">
                                        Sobre a Professora
                                    </Link>
                                    <Link href="/#metodologia" onClick={() => handleTrackClick("CLICK_METODOLOGIA")} className="text-lg font-medium hover:text-primary transition-colors">
                                        Metodologia
                                    </Link>
                                    <Link href="/#depoimentos" onClick={() => handleTrackClick("CLICK_DEPOIMENTOS")} className="text-lg font-medium hover:text-primary transition-colors">
                                        Depoimentos
                                    </Link>
                                    <Link href="/admin" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                                        Área da Professora
                                    </Link>
                                </nav>
                                <div className="mt-8">
                                    <Button asChild className="w-full text-lg h-12" onClick={() => handleTrackClick("CLICK_AGENDAR")}>
                                        <Link href="/agendamento">Agendar Avaliação</Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
