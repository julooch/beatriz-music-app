import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { rateLimit } from "@/lib/rateLimit"

const prisma = new PrismaClient()

// POST: User submits a data deletion request  
export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
        if (!rateLimit(ip, 5, 60000)) {
            return NextResponse.json({ error: "Muitas solicitações. Tente novamente em 1 minuto." }, { status: 429 })
        }

        const { email, name, reason } = await req.json()

        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "E-mail é obrigatório." }, { status: 400 })
        }

        await prisma.dataDeletionRequest.create({
            data: {
                email: email.trim().toLowerCase(),
                name: name || null,
                reason: reason || null
            }
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
