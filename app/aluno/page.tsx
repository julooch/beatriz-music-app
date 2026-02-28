"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Header from "@/components/layout/Header"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar, Clock, AlertCircle } from "lucide-react"

export default function AreaDoAluno() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [schedules, setSchedules] = useState<any[]>([])
    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/student?email=${encodeURIComponent(email)}`)
            const data = await res.json()

            if (res.ok) {
                setSchedules(data.schedules)
            } else {
                alert(data.error || "Erro ao buscar agendamentos")
            }
        } catch {
            alert("Erro de conexão")
        } finally {
            setLoading(false)
            setHasSearched(true)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-orange-100 text-orange-800 border-orange-200"
            case "CONFIRMED": return "bg-green-100 text-green-800 border-green-200"
            case "REJECTED": return "bg-red-100 text-red-800 border-red-200"
            case "COMPLETED": return "bg-slate-100 text-slate-800 border-slate-200"
            default: return "bg-gray-100"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "PENDING": return "Aguardando Confirmação"
            case "CONFIRMED": return "Confirmado"
            case "REJECTED": return "Cancelado"
            case "COMPLETED": return "Concluído"
            default: return status
        }
    }

    return (
        <div className="min-h-screen bg-muted/20">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-8">

                    <div className="bg-background rounded-2xl border shadow-sm p-6 md:p-10">
                        <h1 className="text-2xl font-bold mb-2">Área do Aluno</h1>
                        <p className="text-muted-foreground mb-8">
                            Consulte o status dos seus agendamentos inserindo o e-mail cadastrado.
                        </p>

                        <form onSubmit={handleSearch} className="flex gap-4 items-end">
                            <div className="flex-1 space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button type="submit" disabled={loading || !email}>
                                {loading ? "Buscando..." : "Buscar Agendamentos"}
                            </Button>
                        </form>
                    </div>

                    {hasSearched && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Meus Agendamentos</h2>

                            {schedules.length === 0 ? (
                                <div className="bg-background border rounded-xl p-12 flex flex-col items-center justify-center text-center">
                                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium">Nenhum agendamento encontrado</h3>
                                    <p className="text-muted-foreground mt-1">Verifique se o e-mail digitado está correto ou faça um novo agendamento.</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-2">
                                    {schedules.map((schedule) => (
                                        <div key={schedule.id} className="bg-background rounded-xl border p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
                                                        {getStatusText(schedule.status)}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        ID: {schedule.id.substring(0, 8)}
                                                    </span>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center text-lg font-medium">
                                                        <Calendar className="mr-3 h-5 w-5 text-primary" />
                                                        {format(new Date(schedule.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                                    </div>
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Clock className="mr-3 h-5 w-5" />
                                                        {format(new Date(schedule.date), "HH:mm")}
                                                    </div>
                                                </div>

                                                {schedule.details && (
                                                    <div className="mt-6 pt-4 border-t space-y-2 text-sm">
                                                        <p><span className="font-medium">Objetivo:</span> {schedule.details.goal}</p>
                                                        <p><span className="font-medium">Foco:</span> {schedule.details.improvement}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>
        </div>
    )
}
