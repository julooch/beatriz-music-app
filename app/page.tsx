import Header from "@/components/layout/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mic2, Star, Users, CalendarHeart, ArrowRight, PlayCircle, Heart } from "lucide-react"
import Analytics from "@/components/Analytics"
import { HeroAgendarButton, CTAAgendarButton } from "@/components/TrackingButtons"

export default function Home() {

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Analytics />
            <Header />

            <main className="flex-1">
                {/* Premium Hero Section */}
                <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 hero-gradient min-h-[90vh] flex flex-col justify-center">
                    {/* Decorative blobs */}
                    <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-[80px] -z-10 mix-blend-multiply" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="flex-1 space-y-8 text-center lg:text-left">
                                <div className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 px-4 py-2 text-sm font-semibold text-primary shadow-sm">
                                    <span className="relative flex h-3 w-3 mr-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                    </span>
                                    Vagas abertas para novos alunos!
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-foreground">
                                    Encontre a sua <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                        voz verdadeira.
                                    </span>
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                    Aulas particulares de canto e teoria musical adaptadas ao seu estilo. Uma jornada de expressão artística, saúde vocal e autoconfiança.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                                    <HeroAgendarButton />
                                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/50 backdrop-blur-sm hover:bg-white hover:text-primary transition-colors" asChild>
                                        <Link href="#metodologia">
                                            <PlayCircle className="mr-2 h-5 w-5" /> Conhecer o Método
                                        </Link>
                                    </Button>
                                </div>

                                <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-muted-foreground">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                                                <Star className="h-4 w-4 text-primary/40" />
                                            </div>
                                        ))}
                                    </div>
                                    <p>Junte-se a <strong className="text-foreground">+120 alunos</strong><br />satisfeitos hoje.</p>
                                </div>
                            </div>

                            <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                                <div className="aspect-[4/5] rounded-[2.5rem] bg-gradient-to-tr from-primary/10 via-white to-secondary/10 shadow-2xl relative border-4 border-white mb-8 lg:mb-0">
                                    {/* Image representing the Music/Teacher */}
                                    <div className="absolute inset-0 overflow-hidden rounded-[2.2rem] group">
                                        <img src="/hero.png" alt="Beatriz ensinando canto" className="w-full h-full object-cover object-top scale-[1.02] group-hover:scale-105 transition-transform duration-700" />
                                    </div>

                                    {/* Floating elements */}
                                    <div className="absolute bottom-8 left-[-1rem] md:left-[-2rem] glass-card px-6 py-4 rounded-xl flex items-center gap-3 animate-bounce shadow-xl z-20">
                                        <div className="bg-primary/10 p-2 rounded-full"><Heart className="h-5 w-5 text-secondary" fill="currentColor" /></div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Aulas presenciais</p>
                                            <p className="text-xs text-muted-foreground">e on-line</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features / Benefits */}
                <section id="metodologia" className="py-24 bg-white relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20 space-y-6">
                            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Metodologia Exclusiva</h2>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground">A sua voz no centro de tudo.</h3>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
                                Um método híbrido que integra técnica apurada e sensibilidade artística para resultados impressionantes em qualquer estilo.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                {
                                    icon: Star,
                                    title: "Fisiologia Vocal",
                                    desc: "Entenda o seu instrumento. Respiração, apoio e ressonância para cantar sem esforço e com longevidade.",
                                    color: "bg-blue-50 text-blue-600"
                                },
                                {
                                    icon: Users,
                                    title: "Reportório Guiado",
                                    desc: "Suas músicas favoritas como objeto de estudo! A prática focada naquilo que você genuinamente ama cantar.",
                                    color: "bg-purple-50 text-primary"
                                },
                                {
                                    icon: CalendarHeart,
                                    title: "Rotina Flexível",
                                    desc: "Não há pressão. Adaptamos a frequência das aulas à sua rotina para que o aprendizado seja prazeroso, não um fardo.",
                                    color: "bg-pink-50 text-secondary"
                                }
                            ].map((feature, i) => (
                                <div key={i} className="bg-background p-10 rounded-[2rem] border border-muted shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group">
                                    <div className={`h-16 w-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform shadow-sm`}>
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="depoimentos" className="py-24 bg-muted/20 relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Depoimentos</h2>
                            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground">O que dizem as vozes que treinei.</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: "Lucas M.", course: "Iniciante", quote: "A Beatriz conseguiu destravar a minha voz em menos de 1 mês. As aulas são leves, práticas e eu saio de cada uma me sentindo um artista!" },
                                { name: "Mariana S.", course: "Intermediário", quote: "O método de respiração fez toda a diferença pra mim. Hoje consigo alcançar notas altas sem sentir aquele esforço chato na garganta." },
                                { name: "Rafael T.", course: "Hobby", quote: "Nunca imaginei que faria aulas de canto depois de adulto. Transformou meu final de semana e aumentou muito minha autoconfiança de forma geral." }
                            ].map((dep, i) => (
                                <div key={i} className="bg-background p-8 rounded-[2rem] shadow-sm border flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1">
                                    <div className="text-primary/30 mb-6">
                                        <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                                    </div>
                                    <p className="font-medium text-lg leading-relaxed mb-8 italic text-muted-foreground flex-1">"{dep.quote}"</p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary text-xl shadow-sm">
                                            {dep.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">{dep.name}</p>
                                            <p className="text-sm text-muted-foreground">{dep.course}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 container mx-auto px-6">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-[3rem] p-10 md:p-20 text-center space-y-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-extrabold">A hora de começar é agora.</h2>
                            <p className="text-white/90 text-xl font-medium leading-relaxed">
                                Agende uma aula de avaliação para conversarmos sobre seus objetivos, avaliarmos seu nível atual e traçarmos um estúdio prático focado em resultados.
                            </p>
                            <CTAAgendarButton />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t bg-background py-12">
                <div className="container mx-auto px-6 text-center text-muted-foreground flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-2 font-bold text-lg text-foreground mb-4">
                        <Mic2 className="h-6 w-6 text-primary" /> Beatriz Faina
                    </div>
                    <p>© {new Date().getFullYear()} Beatriz Faina Studio de Música.</p>
                </div>
            </footer>
        </div>
    )
}
