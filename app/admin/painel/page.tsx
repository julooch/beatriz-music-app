"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Header from "@/components/layout/Header"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { LogOut, Info, AlertCircle, Users, Calendar, MessageCircle, BarChart, Check, X, Shield, Trash2 } from "lucide-react"
import { logoutAction } from "@/app/actions/auth"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

export default function AdminDashboard() {
    const [schedules, setSchedules] = useState<any[]>([])
    const [metrics, setMetrics] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [deletionRequests, setDeletionRequests] = useState<any[]>([])
    const [pendingDeletions, setPendingDeletions] = useState(0)
    const [processingDeletion, setProcessingDeletion] = useState<string | null>(null)

    // Date Filters
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    const todayStr = now.toISOString().split('T')[0]

    const [startDate, setStartDate] = useState(firstDayOfMonth)
    const [endDate, setEndDate] = useState(todayStr)

    const fetchData = async () => {
        setLoading(true)
        try {
            const queryParams = new URLSearchParams()
            if (startDate) queryParams.append("startDate", startDate)
            if (endDate) queryParams.append("endDate", endDate)

            const [schedRes, metricsRes, deletionRes] = await Promise.all([
                fetch(`/api/admin`),
                fetch(`/api/admin/metrics?${queryParams.toString()}`),
                fetch(`/api/admin/data-requests`)
            ])

            const schedData = await schedRes.json()
            const metricsData = await metricsRes.json()
            const deletionData = await deletionRes.json()

            setSchedules(schedData.schedules || [])
            setMetrics(metricsData.metrics)
            setDeletionRequests(deletionData.requests || [])
            setPendingDeletions(deletionData.pendingCount || 0)
        } catch (err) {
            console.error("Failed to load admin data", err)
        } finally {
            setLoading(false)
        }
    }

    // Trigger fetch on date change
    useEffect(() => {
        fetchData()
    }, [startDate, endDate])

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await fetch("/api/admin", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status })
            })
            fetchData() // refresh lists
        } catch (err) {
            alert("Erro ao atualizar status.")
        }
    }

    const handleDeleteUserData = async (requestId: string) => {
        if (!confirm("Tem certeza que deseja excluir todos os dados deste usuário? Esta ação é irreversível.")) return;
        setProcessingDeletion(requestId)
        try {
            await fetch("/api/admin/data-requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requestId })
            })
            fetchData()
        } catch (err) {
            alert("Erro ao processar exclusão de dados.")
        } finally {
            setProcessingDeletion(null)
        }
    }

    const handleWhatsAppClick = (name: string, phone: string, goal: string) => {
        const message = `Olá ${name}! Sou a Beatriz Faina, tudo bem? Vi que você agendou uma aula de avaliação para o objetivo de ${goal}. Poderia me enviar um áudio de 1 minuto cantando algo que você gosta para eu te conhecer melhor antes da nossa aula?`
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }

    const AnimatedNumber = ({ value, animKey }: { value: number, animKey?: string }) => {
        const count = useMotionValue<number>(0)
        const rounded = useTransform(count, (latest) => {
            if (value % 1 !== 0) {
                return parseFloat(latest.toFixed(1))
            }
            return Math.floor(latest)
        })

        useEffect(() => {
            count.set(0)
            const controls = animate(count, value, { duration: 1.5, ease: "easeOut" })
            return controls.stop
        }, [value, count, animKey])

        return <motion.span>{rounded}</motion.span>
    }

    const animKey = `${startDate}-${endDate}`

    const MetricCard = ({ title, value, colorClass, tooltip, suffix = "" }: { title: string, value: string | number, colorClass: string, tooltip: string, suffix?: string }) => {
        const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;

        return (
            <TooltipProvider delayDuration={200}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="bg-background cursor-help p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center text-center transition-all hover:bg-muted/10 relative overflow-hidden">
                            <Info className="absolute top-3 right-3 h-4 w-4 text-muted-foreground opacity-50 hover:opacity-100 transition-opacity" />
                            <p className="text-sm text-muted-foreground font-medium mb-2">{title}</p>
                            <p className={`text-3xl font-bold ${colorClass} flex items-baseline gap-1`}>
                                <AnimatedNumber value={numValue} animKey={animKey} />
                                {suffix && <span className="text-lg">{suffix}</span>}
                            </p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-center border shadow-lg text-sm bg-background text-foreground z-[100] relative">
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    // Data mapped for the chart
    const chartData = [
        { name: 'Visualizações no Site', Visitas: metrics?.siteViews || 0 },
        { name: 'Entraram no Agendamento', Entraram: metrics?.totalVisits || 0 },
        { name: 'Aulas Solicitadas', Confirmadas: metrics?.totalCompleted || 0 },
    ];

    return (
        <div className="min-h-screen bg-muted/10 pb-20 font-sans">
            <Header />
            <div className="bg-primary text-primary-foreground py-12 mb-8 relative">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between md:items-end gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Painel de Gestão - Beatriz Faina</h1>
                        <p className="text-primary-foreground/80">Acompanhe suas métricas e gerencie seus alunos.</p>
                    </div>
                    <form action={logoutAction}>
                        <Button variant="outline" size="sm" type="submit" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary font-bold">
                            <LogOut className="h-4 w-4 mr-2" /> Sair
                        </Button>
                    </form>
                </div>
            </div>

            {/* Snackbar for Pending Schedules */}
            {metrics?.pendingSchedules > 0 && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="container mx-auto px-4 -mt-4 mb-4 relative z-10"
                >
                    <div className="bg-orange-500 text-white p-4 rounded-xl shadow-lg border border-orange-600 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-6 w-6" />
                            <p className="font-bold text-lg">Você tem {metrics.pendingSchedules} agendamento{metrics.pendingSchedules > 1 ? "s" : ""} pendente{metrics.pendingSchedules > 1 ? "s" : ""}</p>
                        </div>
                        <Button variant="secondary" size="sm" className="bg-white text-orange-600 hover:bg-orange-50" onClick={() => {
                            window.scrollBy({ top: 800, behavior: 'smooth' });
                        }}>
                            Revisar agora
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Snackbar for Pending Data Deletion Requests */}
            {pendingDeletions > 0 && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="container mx-auto px-4 mb-8 relative z-10"
                >
                    <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg border border-red-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield className="h-6 w-6" />
                            <p className="font-bold text-lg">Você tem {pendingDeletions} solicitação{pendingDeletions > 1 ? "ões" : ""} de exclusão de dados (LGPD)</p>
                        </div>
                        <Button variant="secondary" size="sm" className="bg-white text-red-600 hover:bg-red-50" onClick={() => {
                            document.getElementById('lgpd-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Gerenciar
                        </Button>
                    </div>
                </motion.div>
            )}

            <main className="container mx-auto px-4 space-y-12">

                {/* Metrics Section */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <BarChart className="h-6 w-6 text-primary" />
                            <h2 className="text-2xl font-bold">Visão Geral</h2>
                        </div>

                        {/* Generic Date Filter */}
                        <div className="flex items-center gap-2 bg-background p-2 rounded-lg border shadow-sm text-sm">
                            <div className="flex flex-col">
                                <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Data Inicial</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent outline-none p-1 font-medium text-foreground cursor-pointer" />
                            </div>
                            <span className="text-muted-foreground font-medium px-2">até</span>
                            <div className="flex flex-col">
                                <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Data Final</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent outline-none p-1 font-medium text-primary cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    {loading && !metrics ? (
                        <div className="h-48 flex items-center justify-center border rounded-xl bg-muted/20 animate-pulse text-muted-foreground font-medium">Extraindo inteligência de dados...</div>
                    ) : (
                        <div className="space-y-6">
                            {/* KPI Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <MetricCard
                                    title="Visitas no Site"
                                    value={metrics?.siteViews || 0} colorClass="text-zinc-800"
                                    tooltip="Número total de visitantes únicos que abriram a página principal do seu site no navegador."
                                />
                                <MetricCard
                                    title="Sessão Média"
                                    value={metrics?.avgSessionMinutes || 0} suffix="min" colorClass="text-purple-600"
                                    tooltip="Calcula quanto tempo em média (minutos) cada visitante gasta lendo e conhecendo sua metodologia."
                                />
                                <MetricCard
                                    title="Leads Capturados"
                                    value={metrics?.totalLeads || 0} colorClass="text-zinc-800"
                                    tooltip="Número de e-mails contatáveis coletados (pessoas que iniciaram o formulário)."
                                />
                                <MetricCard
                                    title="Tentaram Agendar"
                                    value={metrics?.totalVisits || 0} colorClass="text-blue-600"
                                    tooltip="Número de pessoas que de fato clicaram em 'Agendar Aula' e abriram o formulário de etapas."
                                />
                                <MetricCard
                                    title="Aulas Solicitadas"
                                    value={metrics?.totalCompleted || 0} colorClass="text-green-600"
                                    tooltip="A quantidade final de interessados que chegaram até o fim das perguntas e submeteram a solicitação para avaliação."
                                />
                                <MetricCard
                                    title="Agendamentos Cancelados"
                                    value={metrics?.rejectedSchedules || 0} colorClass="text-red-500"
                                    tooltip="Quantidade de vezes que você recusou ou bloqueou solicitações de agendamento na plataforma."
                                />
                                <MetricCard
                                    title="Taxa de Abandono (Site)"
                                    value={metrics?.abandonmentRate || 0} suffix="%" colorClass="text-orange-500"
                                    tooltip="A porcentagem de pessoas em que o marketing deu certo (visitaram a página principal) mas não se converteram em nenhuma aula solicitada."
                                />

                                {/* New Tracking Metrics */}
                                <MetricCard
                                    title="Cliques em 'Sobre'"
                                    value={metrics?.clicksSobre || 0} colorClass="text-indigo-500"
                                    tooltip="Número de vezes que visitantes clicaram para ler sobre a sua trajetória e currículo."
                                />
                                <MetricCard
                                    title="Cliques 'Metodologia'"
                                    value={metrics?.clicksMetodologia || 0} colorClass="text-indigo-500"
                                    tooltip="Número de interesses gerados sobre como funciona as suas aulas teóricas e práticas."
                                />
                                <MetricCard
                                    title="Cliques 'Depoimentos'"
                                    value={metrics?.clicksDepoimentos || 0} colorClass="text-indigo-500"
                                    tooltip="Quantidade de pessoas que buscaram prova social e referências lendo os depoimentos."
                                />
                                <MetricCard
                                    title="Botões de Agendar"
                                    value={metrics?.clicksAgendar || 0} colorClass="text-indigo-600"
                                    tooltip="A soma total de todos os cliques em botões de 'Agendar Aula' e CTAs espalhados pela landing page."
                                />
                            </div>

                            {/* Chart Area */}
                            <div className="bg-background rounded-xl border p-6 shadow-sm h-[400px]">
                                <h3 className="text-lg font-bold mb-6 text-center text-muted-foreground">Conversão de aulas agendadas (Total: {metrics?.siteViews ? ((metrics.totalCompleted / metrics.siteViews) * 100).toFixed(1) : "0.0"}%)</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsBarChart
                                        data={chartData}
                                        margin={{ top: 5, right: 30, left: 10, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 13, fontWeight: "500" }} dy={10} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#6b7280', fontWeight: "bold" }} axisLine={false} tickLine={false} />
                                        <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', fontWeight: "bold" }} />
                                        <Bar dataKey="Visitas" radius={[6, 6, 0, 0]} barSize={50} fill="#cbd5e1" />
                                        <Bar dataKey="Entraram" radius={[6, 6, 0, 0]} barSize={50} fill="#8b5cf6" />
                                        <Bar dataKey="Confirmadas" radius={[6, 6, 0, 0]} barSize={50} fill="#22c55e" />
                                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                    </RechartsBarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}
                </section>

                {/* Schedules Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">Solicitações de Agendamento</h2>
                    </div>

                    <div className="bg-background rounded-xl border shadow-sm divide-y">
                        {loading && !metrics ? (
                            <div className="p-12 text-center text-muted-foreground animate-pulse font-medium">Lendo banco de dados com suas solicitações...</div>
                        ) : schedules.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                Você não possui nenhum agendamento na base do sistema.
                            </div>
                        ) : (
                            schedules.map((schedule) => (
                                <div key={schedule.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/5 transition-colors">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold">{schedule.user?.name || "Aluno sem nome"}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                                                ${schedule.status === 'PENDING' ? 'bg-orange-100 text-orange-800' : ''}
                                                ${schedule.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : ''}
                                                ${schedule.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}
                                            `}>
                                                {schedule.status === "PENDING" ? "Pendente" : schedule.status === "CONFIRMED" ? "Agendado" : "Cancelado"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{schedule.user?.email || "Email não informado"}</p>

                                        <div className="flex items-center text-sm font-medium mt-3 bg-muted w-fit px-3 py-1.5 rounded-md text-primary">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            {format(new Date(schedule.date), "dd 'de' MMM 'às' HH:mm", { locale: ptBR })}
                                        </div>

                                        {schedule.details && (
                                            <div className="text-sm text-muted-foreground mt-4 space-y-2 bg-primary/5 p-4 rounded-lg border border-primary/10">
                                                <p><strong className="text-foreground">Nível Vocal:</strong> {schedule.details.isBeginner ? "Iniciante" : "Experiente"}</p>
                                                <p><strong className="text-foreground">Objetivo Principal:</strong> {schedule.details.goal}</p>
                                                <p><strong className="text-foreground">O que quer melhorar:</strong> {schedule.details.improvement}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col md:w-56 gap-2 shrink-0">
                                        {schedule.status === "PENDING" && (
                                            <>
                                                <Button
                                                    onClick={() => handleStatusUpdate(schedule.id, "CONFIRMED")}
                                                    className="w-full bg-green-600 hover:bg-green-700 font-bold"
                                                >
                                                    <Check className="mr-2 h-4 w-4" /> Aprovar Aula
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleStatusUpdate(schedule.id, "REJECTED")}
                                                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                                                >
                                                    <X className="mr-2 h-4 w-4" /> Mover para Cancelados
                                                </Button>
                                            </>
                                        )}

                                        <Button
                                            variant="secondary"
                                            onClick={() => handleWhatsAppClick(schedule.user?.name || "", "", schedule.details?.goal || "")}
                                            className="w-full text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 mt-2 font-bold shadow-sm"
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" /> Bate-papo (WhatsApp)
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* LGPD Data Deletion Section */}
                <section id="lgpd-section">
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="h-6 w-6 text-red-600" />
                        <h2 className="text-2xl font-bold">Exclusão de Dados (LGPD)</h2>
                    </div>

                    <div className="bg-background rounded-xl border shadow-sm divide-y">
                        {deletionRequests.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                Nenhuma solicitação de exclusão de dados recebida.
                            </div>
                        ) : (
                            deletionRequests.map((request: any) => (
                                <div key={request.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/5 transition-colors">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold">{request.email}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                                                ${request.status === 'PENDING' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
                                            `}>
                                                {request.status === 'PENDING' ? 'Pendente' : 'Concluído'}
                                            </span>
                                        </div>
                                        {request.name && (
                                            <p className="text-sm text-muted-foreground">Nome: {request.name}</p>
                                        )}
                                        {request.reason && (
                                            <p className="text-sm text-muted-foreground">Motivo: {request.reason}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Solicitado em: {format(new Date(request.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                        </p>
                                    </div>

                                    <div className="shrink-0">
                                        {request.status === 'PENDING' && (
                                            <Button
                                                onClick={() => handleDeleteUserData(request.id)}
                                                disabled={processingDeletion === request.id}
                                                className="bg-red-600 hover:bg-red-700 font-bold text-white"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                {processingDeletion === request.id ? 'Excluindo...' : 'Excluir Dados'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div >
    )
}
