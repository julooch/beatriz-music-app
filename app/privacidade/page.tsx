"use client"

import Header from "@/components/layout/Header"
import { useState } from "react"
import { Shield, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PrivacidadePage() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [reason, setReason] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)

        try {
            const res = await fetch("/api/data-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, reason })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Erro ao enviar solicitação.")
            }

            setSubmitted(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <main className="container mx-auto px-4 py-16 max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-extrabold text-foreground">Política de Privacidade</h1>
                </div>

                <div className="prose prose-zinc max-w-none space-y-8">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        A <strong>Beatriz Faina Studio de Música</strong> valoriza a sua privacidade. Esta política descreve como coletamos, utilizamos e protegemos os seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-3">1. Dados Coletados</h2>
                        <div className="bg-muted/30 rounded-xl p-6 border space-y-4">
                            <div>
                                <h3 className="font-bold text-foreground mb-1">Dados pessoais (fornecidos por você)</h3>
                                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Nome completo</li>
                                    <li>Endereço de e-mail</li>
                                    <li>Número de telefone (opcional)</li>
                                    <li>Objetivo musical e nível vocal</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground mb-1">Dados de navegação (coletados automaticamente, com consentimento)</h3>
                                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Visualizações de página (anônimas)</li>
                                    <li>Tempo de sessão</li>
                                    <li>Cliques em seções do site (anônimos)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-3">2. Finalidade dos Dados</h2>
                        <div className="bg-muted/30 rounded-xl p-6 border">
                            <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                                <li><strong>Dados pessoais:</strong> utilizados exclusivamente para agendamento de aulas, contato via WhatsApp e gestão pedagógica.</li>
                                <li><strong>Dados de navegação:</strong> utilizados para análise estatística interna, melhorias no site e otimização da experiência do usuário.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-3">3. Armazenamento e Segurança</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Os dados são armazenados em servidores seguros da <strong>Supabase</strong> (PostgreSQL), com criptografia em repouso e em trânsito (HTTPS/TLS). O acesso administrativo é protegido por autenticação. Não compartilhamos seus dados com terceiros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-3">4. Cookies e Rastreamento</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Utilizamos <strong>localStorage</strong> para armazenar um identificador de sessão anônimo e sua preferência de consentimento. Nenhum cookie de terceiros é utilizado. O rastreamento de navegação <strong>só é ativado após seu consentimento explícito</strong> no banner exibido ao acessar o site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-3">5. Seus Direitos (LGPD)</h2>
                        <div className="bg-muted/30 rounded-xl p-6 border">
                            <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                                <li>Solicitar a <strong>exclusão</strong> dos seus dados pessoais a qualquer momento</li>
                                <li>Revogar o <strong>consentimento</strong> de rastreamento (limpar cookies do navegador)</li>
                                <li>Solicitar <strong>acesso</strong> aos dados que possuímos sobre você</li>
                                <li>Solicitar <strong>correção</strong> de dados imprecisos</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-3">6. Contato da Controladora</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Beatriz Faina</strong> — Professora de Canto e Música<br />
                            Para questões relacionadas à privacidade, utilize o formulário abaixo ou entre em contato diretamente.
                        </p>
                    </section>

                    {/* Data Deletion Request Form */}
                    <section className="pt-4">
                        <h2 className="text-xl font-bold text-foreground mb-3">7. Solicitar Exclusão dos Meus Dados</h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-green-800">Solicitação enviada com sucesso!</p>
                                    <p className="text-green-700 text-sm mt-1">
                                        Sua solicitação de exclusão de dados foi registrada. A professora Beatriz processará sua solicitação em breve.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-muted/30 rounded-xl p-6 border space-y-4">
                                <p className="text-muted-foreground text-sm mb-4">
                                    Preencha o formulário abaixo para solicitar a exclusão dos seus dados pessoais. Sua solicitação será processada pela professora Beatriz.
                                </p>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-1">E-mail *</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="seu@email.com"
                                        className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-1">Nome (opcional)</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Seu nome"
                                        className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-1">Motivo (opcional)</label>
                                    <textarea
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Descreva brevemente o motivo da solicitação"
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? "Enviando..." : "Solicitar Exclusão dos Meus Dados"}
                                </button>
                            </form>
                        )}
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>Última atualização: Fevereiro de 2026</p>
                    <Link href="/" className="text-primary hover:underline mt-2 inline-block font-medium">
                        ← Voltar para o site
                    </Link>
                </div>
            </main>
        </div>
    )
}
