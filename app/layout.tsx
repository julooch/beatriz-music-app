import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Beatriz Faina | Aulas de Canto e Música',
    description: 'Descubra sua verdadeira voz. Aulas de canto online e presenciais com metodologia personalizada.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
            <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
                {children}
            </body>
        </html>
    )
}
