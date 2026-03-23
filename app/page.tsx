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
                                        <img src="/profile.jpg" alt="Beatriz Faina - Cantora e Educadora Vocal" className="w-full h-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-700" />
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

                {/* Sobre / Trajetória */}
                <section id="sobre" className="py-24 bg-muted/30 relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 space-y-6">
                            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Sobre Mim</h2>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground">Cantora, arranjadora vocal e educadora musical.</h3>
                            <div className="max-w-3xl mx-auto space-y-4">
                                <p className="text-muted-foreground text-xl leading-relaxed">
                                    Apaixonada por investigar a potência do corpo-voz. Minha trajetória é pautada pelo encontro entre a 
                                    técnica acadêmica e a sensibilidade da música popular brasileira.
                                </p>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Com formação em Música e pós-graduação em Pedagogia Vocal pela Faculdade Santa Marcelina, 
                                    dedico minha carreira a entender a voz não apenas como um instrumento, 
                                    mas como uma forma de expressão profunda e autêntica.
                                </p>
                                <p className="text-muted-foreground text-lg leading-relaxed pt-2">
                                    Atualmente, levo essa pesquisa para os palcos com o quarteto vocal Mansa Fúria 
                                    e o Coral Harmonia, celebrando a força da música feminina e da afro-brasilidade.
                                </p>
                            </div>
                        </div>

                        {/* Experiência Profissional Cards */}
                        <div className="mt-20">
                            <h4 className="text-3xl font-bold text-center mb-4 text-foreground">Minha caminhada musical</h4>
                            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
                                Inclui passagens por palcos importantes em São Paulo e outros estados, e colaborações em diversos projetos fonográficos e teatrais:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    {
                                        icon: Star,
                                        title: "Palcos Institucionais",
                                        desc: "Como integrante do Coral Jovem do Estado de São Paulo, apresentei-me em espaços como Sala São Paulo, Theatro São Pedro, MASP e Teatro B32.",
                                        color: "bg-primary/10 text-primary border-primary/20",
                                        hoverColor: "hover:border-primary/50 hover:shadow-md"
                                    },
                                    {
                                        icon: Users,
                                        title: "Trabalho de Coro",
                                        desc: "Além do Coral Jovem, integrei o coro da turnê brasileira de Andrea Bocelli em 2024 e 2025.",
                                        color: "bg-secondary/20 text-secondary-foreground border-secondary/30",
                                        hoverColor: "hover:border-secondary/60 hover:shadow-md"
                                    },
                                    {
                                        icon: Mic2,
                                        title: "Colaborações e Trilhas",
                                        desc: "Participei de álbuns e espetáculos como Fim de Feira, Menino Brasil, Jamais Vai Derrubar, e na trilha de Eu Não Sou Só Isso.",
                                        color: "bg-accent/10 text-accent border-accent/20",
                                        hoverColor: "hover:border-accent/50 hover:shadow-md"
                                    },
                                    {
                                        icon: Heart,
                                        title: "Arte e Educação",
                                        desc: "Realizei oficinas em espaços como CEU Arthur Alvim, e sou educadora musical no projeto Musicou (Sustenidos).",
                                        color: "bg-[#A2A183]/20 text-[#686230] border-[#A2A183]/30",
                                        hoverColor: "hover:border-[#A2A183]/60 hover:shadow-md"
                                    }
                                ].map((exp, i) => (
                                    <div key={i} className={`bg-background p-8 rounded-[1.5rem] shadow-sm border ${exp.color.split(' ')[2] || 'border-border/50'} ${exp.hoverColor} transition-all duration-300 flex flex-col h-full group`}>
                                        <div className={`h-14 w-14 ${exp.color.split(' ').slice(0, 2).join(' ')} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <exp.icon className="h-7 w-7" />
                                        </div>
                                        <h5 className="font-bold text-xl mb-3 text-foreground">{exp.title}</h5>
                                        <p className="text-muted-foreground flex-1 leading-relaxed">
                                            {exp.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features / Metodologia */}
                <section id="metodologia" className="py-24 bg-white relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20 space-y-6">
                            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">Metodologia</h2>
                            <h3 className="text-4xl md:text-5xl font-extrabold text-foreground">Como são as aulas?</h3>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
                                Minha metodologia propõe a criação musical a partir da consciência corporal. As aulas são pensadas para quem busca:
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    icon: Star,
                                    title: "Pedagogia Vocal",
                                    desc: "Técnica com embasamento para o uso saudável e eficiente da voz.",
                                    color: "bg-primary/10 text-primary border-primary/20",
                                    hoverColor: "hover:border-primary/50"
                                },
                                {
                                    icon: Users,
                                    title: "Corpo-Voz",
                                    desc: "Explorar o corpo como o suporte principal da musicalidade.",
                                    color: "bg-secondary/20 text-secondary-foreground border-secondary/30",
                                    hoverColor: "hover:border-secondary/60"
                                },
                                {
                                    icon: Heart,
                                    title: "Identidade e Repertório",
                                    desc: "Desenvolvimento da interpretação dentro da música popular, respeitando o estilo de cada aluno.",
                                    color: "bg-accent/10 text-accent border-accent/20",
                                    hoverColor: "hover:border-accent/50"
                                },
                                {
                                    icon: PlayCircle,
                                    title: "Autonomia Musical",
                                    desc: "Noções de percepção e exercícios musicais para uma vivência artística completa.",
                                    color: "bg-[#A2A183]/20 text-[#686230] border-[#A2A183]/30",
                                    hoverColor: "hover:border-[#A2A183]/60"
                                }
                            ].map((feature, i) => (
                                <div key={i} className={`bg-background p-10 rounded-[2rem] border ${feature.color.split(' ')[2] || 'border-muted'} shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 ${feature.hoverColor} group`}>
                                    <div className={`h-16 w-16 ${feature.color.split(' ').slice(0, 2).join(' ')} rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform shadow-sm`}>
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h4>
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
                    <div className="flex items-center gap-4 text-sm">
                        <Link href="/privacidade" className="hover:text-primary transition-colors">
                            Política de Privacidade
                        </Link>
                    </div>
                    <p>© {new Date().getFullYear()} Beatriz Faina Studio de Música.</p>
                </div>
            </footer>
        </div>
    )
}
