"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/layout/Header"
import { Music } from "lucide-react"

export default function Agendamento() {
    const [step, setStep] = useState(1)
    const [sessionId, setSessionId] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        isBeginner: "true",
        goal: "",
        improvement: ""
    })

    // Generate a random session ID on load and track entrance
    useEffect(() => {
        const id = Math.random().toString(36).substring(2, 15)
        setSessionId(id)

        fetch("/api/schedule", {
            method: "POST",
            body: JSON.stringify({
                action: "TRACK_EVENT",
                payload: { eventType: "STARTED_SCHEDULING", sessionId: id }
            })
        })

        // Track abandonment if user leaves the page before success
        const handleBeforeUnload = () => {
            if (!success) {
                navigator.sendBeacon("/api/schedule", JSON.stringify({
                    action: "TRACK_EVENT",
                    payload: { eventType: "ABANDONED_SCHEDULING", sessionId: id, metadata: { step } }
                }))
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [success]) // eslint-disable-line

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNext = () => setStep(step + 1)
    const handlePrev = () => setStep(step - 1)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch("/api/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "CREATE_SCHEDULE",
                    payload: { ...formData, isBeginner: formData.isBeginner === "true", sessionId }
                })
            })

            if (response.ok) {
                setSuccess(true)
            } else {
                alert("Ocorreu um erro ao agendar. Tente novamente.")
            }
        } catch (error) {
            alert("Erro de conexão.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-muted/20">
            <Header />
            <main className="container mx-auto px-4 py-12 md:py-20 flex justify-center">
                <div className="bg-background rounded-2xl border shadow-sm p-6 md:p-10 w-full max-w-2xl relative">

                    {success ? (
                        <div className="text-center space-y-6 py-10">
                            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <Music className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl font-bold">Solicitação enviada!</h2>
                            <p className="text-muted-foreground text-lg max-w-[400px] mx-auto">
                                A professora Beatriz analisará as suas respostas e entrará em contato em breve para confirmar a aula de avaliação.
                            </p>
                            <Button asChild className="mt-4">
                                <a href="/">Voltar ao Início</a>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                                    <span>Passo {step} de 2</span>
                                </div>
                                <h1 className="text-2xl font-bold shadow-sm">Agende sua primeira aula</h1>
                                <p className="text-muted-foreground">Conte um pouco sobre você e seus objetivos.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col min-h-[300px]">
                                {step === 1 && (
                                    <div className="space-y-4 animate-in fade-in flex-1">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
                                            <Input required id="name" name="name" value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                                            <Input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium">Celular / WhatsApp</label>
                                            <Input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <Button type="button" onClick={handleNext} disabled={!formData.name || !formData.email || !formData.phone}>
                                                Próximo passo
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-4 animate-in fade-in flex-1">
                                        <div className="space-y-2">
                                            <label htmlFor="date" className="text-sm font-medium">Data e Hora Preferida</label>
                                            <Input required type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="isBeginner" className="text-sm font-medium">Você é iniciante no canto?</label>
                                            <select id="isBeginner" name="isBeginner" value={formData.isBeginner} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                                <option value="true">Sim, estou começando agora</option>
                                                <option value="false">Não, já tenho experiência</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="goal" className="text-sm font-medium">Qual seu objetivo com a aula?</label>
                                            <Input required id="goal" name="goal" placeholder="Ex: Hobby, Profissional, Cantar na Igreja..." value={formData.goal} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="improvement" className="text-sm font-medium">O que você gostaria de aprimorar?</label>
                                            <Input required id="improvement" name="improvement" placeholder="Ex: Alcance Vocal, Respiração, Afinação" value={formData.improvement} onChange={handleChange} />
                                        </div>

                                        <div className="pt-4 flex justify-between">
                                            <Button type="button" variant="outline" onClick={handlePrev}>
                                                Voltar
                                            </Button>
                                            <Button type="submit" disabled={loading || !formData.date || !formData.goal || !formData.improvement}>
                                                {loading ? "Processando..." : "Confirmar Agendamento"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}
