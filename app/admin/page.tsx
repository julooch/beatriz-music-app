"use client"

import { useState } from "react"
import { loginAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Lock, ArrowRight } from "lucide-react"
import Header from "@/components/layout/Header"

export default function AdminLogin() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData()
        formData.append("password", password)

        const result = await loginAction(formData)

        // loginAction redirects on success. If we get here it's an error.
        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-muted/10 font-sans">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4">
                <div className="w-full max-w-md bg-background rounded-3xl shadow-xl overflow-hidden glass-card border border-muted relative z-10">
                    <div className="p-8 pb-6 border-b border-muted bg-primary/5">
                        <div className="w-16 h-16 bg-primary/10 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-inner mx-auto ring-4 ring-background">
                            <Lock className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-center text-foreground tracking-tight">
                            Acesso Restrito
                        </h1>
                        <p className="text-muted-foreground text-center mt-2 text-sm leading-relaxed">
                            Informe sua senha mestra para visualizar o painel da professora Beatriz Faina.
                        </p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">
                                    Senha de Acesso
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 rounded-xl border border-input bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="••••••••••••"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center font-medium animate-in fade-in slide-in-from-top-1">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-14 rounded-xl text-base shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                                disabled={loading}
                            >
                                {loading ? "Acessando..." : (
                                    <>Entrar no Painel <ArrowRight className="ml-2 h-4 w-4" /></>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                <p className="mt-8 text-xs text-muted-foreground font-medium flex items-center justify-center opacity-60">
                    Área Exclusiva
                </p>
            </main>
        </div>
    )
}
