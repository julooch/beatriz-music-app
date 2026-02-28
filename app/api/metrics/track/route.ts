import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { rateLimit } from "@/lib/rateLimit"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
        if (!rateLimit(ip, 30, 60000)) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 })
        }

        const body = await req.json()
        const { eventType, sessionId, duration } = body

        if (!eventType || !sessionId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        if (eventType === "SITE_VIEW") {
            // Check if we already logged this session view today to avoid spam
            const existing = await prisma.eventLog.findFirst({
                where: {
                    sessionId,
                    eventType: "SITE_VIEW",
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }
            })

            if (!existing) {
                await prisma.eventLog.create({
                    data: {
                        eventType: "SITE_VIEW",
                        sessionId
                    }
                })
            }
        }
        else if (eventType === "SESSION_DURATION") {
            // Create a dedicated log for session duration in metadata
            await prisma.eventLog.create({
                data: {
                    eventType: "SESSION_DURATION",
                    sessionId,
                    metadata: { durationMinutes: duration || 0 }
                }
            })
        }
        else {
            // Log any other generic events (e.g. clicks)
            await prisma.eventLog.create({
                data: {
                    eventType,
                    sessionId
                }
            })
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
